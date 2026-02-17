<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BackupController extends Controller
{
    public function index(): Response
    {
        $backups = [];
        $backupDir = storage_path('app/backups');

        if (is_dir($backupDir)) {
            $files = array_diff(scandir($backupDir, SCANDIR_SORT_DESCENDING), ['.', '..']);
            foreach ($files as $file) {
                if (str_ends_with($file, '.sql')) {
                    $path = $backupDir . '/' . $file;
                    $backups[] = [
                        'name' => $file,
                        'size' => $this->formatSize(filesize($path)),
                        'date' => date('Y-m-d H:i:s', filemtime($path)),
                    ];
                }
            }
        }

        return Inertia::render('admin/backup/index', [
            'backups' => $backups,
        ]);
    }

    public function create()
    {
        $backupDir = storage_path('app/backups');
        if (!is_dir($backupDir)) {
            mkdir($backupDir, 0755, true);
        }

        $filename = 'backup_' . date('Y-m-d_His') . '.sql';
        $path = $backupDir . '/' . $filename;

        try {
            $tables = DB::select('SHOW TABLES');
            $dbName = config('database.connections.mysql.database');
            $key = 'Tables_in_' . $dbName;

            $sql = "-- E-Rapor Database Backup\n";
            $sql .= "-- Date: " . date('Y-m-d H:i:s') . "\n";
            $sql .= "-- Database: " . $dbName . "\n\n";
            $sql .= "SET FOREIGN_KEY_CHECKS=0;\n\n";

            foreach ($tables as $table) {
                $tableName = $table->$key;

                // Get CREATE TABLE statement
                $createTable = DB::select("SHOW CREATE TABLE `{$tableName}`");
                $createSql = $createTable[0]->{'Create Table'} ?? '';
                $sql .= "DROP TABLE IF EXISTS `{$tableName}`;\n";
                $sql .= $createSql . ";\n\n";

                // Get data
                $rows = DB::table($tableName)->get();
                if ($rows->count() > 0) {
                    foreach ($rows as $row) {
                        $values = array_map(function ($val) {
                            if ($val === null) return 'NULL';
                            return "'" . addslashes((string) $val) . "'";
                        }, (array) $row);
                        $sql .= "INSERT INTO `{$tableName}` VALUES (" . implode(', ', $values) . ");\n";
                    }
                    $sql .= "\n";
                }
            }

            $sql .= "SET FOREIGN_KEY_CHECKS=1;\n";

            file_put_contents($path, $sql);

            return redirect()->route('admin.backup.index')
                ->with('success', "Backup berhasil dibuat: {$filename}");
        } catch (\Exception $e) {
            return redirect()->route('admin.backup.index')
                ->with('error', 'Gagal membuat backup: ' . $e->getMessage());
        }
    }

    public function download(string $filename)
    {
        $path = storage_path('app/backups/' . $filename);
        if (!file_exists($path) || !str_ends_with($filename, '.sql')) {
            abort(404);
        }

        return response()->download($path);
    }

    public function restore(Request $request)
    {
        $request->validate([
            'backup_file' => 'required|file|max:51200', // 50MB max
        ]);

        $file = $request->file('backup_file');
        $sql = file_get_contents($file->getPathname());

        if (empty($sql)) {
            return back()->with('error', 'File backup kosong');
        }

        try {
            DB::unprepared($sql);

            return redirect()->route('admin.backup.index')
                ->with('success', 'Database berhasil di-restore dari backup');
        } catch (\Exception $e) {
            return redirect()->route('admin.backup.index')
                ->with('error', 'Gagal restore: ' . $e->getMessage());
        }
    }

    public function destroy(string $filename)
    {
        $path = storage_path('app/backups/' . $filename);
        if (file_exists($path) && str_ends_with($filename, '.sql')) {
            unlink($path);
            return redirect()->route('admin.backup.index')
                ->with('success', 'Backup berhasil dihapus');
        }

        return redirect()->route('admin.backup.index')
            ->with('error', 'File backup tidak ditemukan');
    }

    private function formatSize(int $bytes): string
    {
        if ($bytes >= 1048576) return round($bytes / 1048576, 1) . ' MB';
        if ($bytes >= 1024) return round($bytes / 1024, 1) . ' KB';
        return $bytes . ' B';
    }
}
