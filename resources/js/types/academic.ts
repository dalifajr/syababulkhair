// Student types
export interface Student {
    id: number;
    nis: string;
    name: string;
    gender: 'L' | 'P' | null;
    birth_date: string | null;
    birth_place: string | null;
    religion: string | null;
    address: string | null;
    phone: string | null;
    photo: string | null;
    father_name: string | null;
    father_phone: string | null;
    father_occupation: string | null;
    mother_name: string | null;
    mother_phone: string | null;
    mother_occupation: string | null;
    guardian_name: string | null;
    guardian_phone: string | null;
    guardian_relationship: string | null;
    entry_year: string | null;
    previous_school: string | null;
    notes: string | null;
    status: 'active' | 'inactive' | 'graduated' | 'transferred';
    created_at: string;
    updated_at: string;
}

// Assessment types
export type AssessmentCategory = 'tugas' | 'quiz' | 'uts' | 'uas' | 'praktik';

export interface Assessment {
    id: number;
    teaching_assignment_id: number;
    name: string;
    category: AssessmentCategory;
    weight: number;
    description: string | null;
    max_score: number;
    is_published: boolean;
    date: string | null;
    created_at: string;
    updated_at: string;
    teaching_assignment?: TeachingAssignment;
    scores?: AssessmentScore[];
    scores_count?: number;
}

export interface AssessmentScore {
    id: number;
    assessment_id: number;
    student_id: number;
    score: number;
    note: string | null;
    recorded_by_user_id: number | null;
    created_at: string;
    updated_at: string;
    assessment?: Assessment;
    student?: Student;
}

// Class and Term types
export interface AcademicYear {
    id: number;
    name: string;
    starts_at: string;
    ends_at: string;
}

export interface Term {
    id: number;
    academic_year_id: number;
    name: string;
    starts_at: string;
    ends_at: string;
    is_active: boolean;
    academic_year?: AcademicYear;
}

export interface ClassGroup {
    id: number;
    term_id: number;
    name: string;
    level: string | null;
    stage: 'tk' | 'sd' | 'smp';
    homeroom_teacher_user_id: number | null;
    term?: Term;
    homeroom_teacher?: User;
    enrollments_count?: number;
}

export interface ClassEnrollment {
    id: number;
    class_group_id: number;
    student_id: number;
    class_group?: ClassGroup;
    student?: Student;
}

// Teaching and Subject types
export interface Subject {
    id: number;
    name: string;
    code: string | null;
    category: string | null;
}

export interface TeachingAssignment {
    id: number;
    term_id: number;
    class_group_id: number;
    subject_id: number;
    teacher_user_id: number;
    term?: Term;
    class_group?: ClassGroup;
    subject?: Subject;
    teacher?: User;
}

// Schedule types
export interface Schedule {
    id: number;
    teaching_assignment_id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
    room: string | null;
    notes: string | null;
    teaching_assignment?: TeachingAssignment;
    day_name?: string;
    time_range?: string;
}

// Attendance types
export type AttendanceStatus = 'present' | 'absent' | 'sick' | 'permit' | 'unmarked';

export interface AttendanceSession {
    id: number;
    teaching_assignment_id: number;
    meeting_date: string;
    topic: string | null;
    teaching_assignment?: TeachingAssignment;
    records?: AttendanceRecord[];
    records_count?: number;
    present_count?: number;
    absent_count?: number;
}

export interface AttendanceRecord {
    id: number;
    attendance_session_id: number;
    student_id: number;
    status: AttendanceStatus;
    note: string | null;
    attendance_session?: AttendanceSession;
    student?: Student;
}

// Report Card types
export interface ReportCard {
    id: number;
    class_enrollment_id: number;
    term_id: number;
    total_score: number | null;
    average_score: number | null;
    class_rank: number | null;
    total_students: number | null;
    sick_days: number;
    permit_days: number;
    absent_days: number;
    promotion_status: 'promoted' | 'retained' | 'pending' | 'graduated' | null;
    principal_note: string | null;
    is_locked: boolean;
    generated_by_user_id: number | null;
    generated_at: string | null;
    locked_at: string | null;
    class_enrollment?: ClassEnrollment;
    term?: Term;
    subjects?: ReportCardSubject[];
    generated_by?: User;
    promotion_status_label?: string;
    total_absence?: number;
}

export interface ReportCardSubject {
    id: number;
    report_card_id: number;
    subject_id: number;
    knowledge_score: number | null;
    skill_score: number | null;
    final_score: number | null;
    knowledge_grade: string | null;
    skill_grade: string | null;
    grade: string | null;
    description: string | null;
    kkm: number | null;
    is_passing: boolean;
    subject?: Subject;
}

// Homeroom Note types
export interface HomeroomNote {
    id: number;
    class_enrollment_id: number;
    term_id: number;
    created_by_user_id: number | null;
    academic_note: string | null;
    personality_note: string | null;
    attendance_note: string | null;
    recommendation: string | null;
    parent_note: string | null;
    created_at: string;
    updated_at: string;
    class_enrollment?: ClassEnrollment;
    term?: Term;
    created_by?: User;
}

// Announcement types
export type AnnouncementType = 'general' | 'academic' | 'event' | 'urgent';
export type AnnouncementAudience = 'all' | 'teachers' | 'parents' | 'students';

export interface Announcement {
    id: number;
    title: string;
    content: string;
    type: AnnouncementType;
    target_audience: AnnouncementAudience;
    created_by_user_id: number | null;
    is_published: boolean;
    is_pinned: boolean;
    published_at: string | null;
    expires_at: string | null;
    created_at: string;
    updated_at: string;
    created_by?: User;
    author?: User;
    type_label?: string;
    audience_label?: string;
}

// Class Promotion types
export type PromotionStatus = 'promoted' | 'retained' | 'graduated' | 'transferred';

export interface ClassPromotion {
    id: number;
    student_id: number;
    from_class_group_id: number;
    to_class_group_id: number | null;
    from_term_id: number;
    to_term_id: number | null;
    status: PromotionStatus;
    notes: string | null;
    processed_by_user_id: number | null;
    processed_at: string | null;
    student?: Student;
    from_class_group?: ClassGroup;
    to_class_group?: ClassGroup;
    status_label?: string;
}

// User types (extended)
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'teacher' | 'parent' | 'student';
    phone: string | null;
    student_id: number | null;
    email_verified_at: string | null;
    student?: Student;
    role_label?: string;
}

// Pagination type
export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links?: PaginationLink[];
}

// Filter types
export interface BaseFilters {
    [key: string]: string | number | boolean | null | undefined;
}

// Constants
export const ASSESSMENT_CATEGORIES: Record<AssessmentCategory, string> = {
    tugas: 'Tugas',
    quiz: 'Quiz',
    uts: 'UTS',
    uas: 'UAS',
    praktik: 'Praktik',
};

export const ATTENDANCE_STATUSES: Record<AttendanceStatus, string> = {
    present: 'Hadir',
    absent: 'Alfa',
    sick: 'Sakit',
    permit: 'Izin',
    unmarked: 'Belum Diisi',
};

export const DAYS_OF_WEEK: Record<number, string> = {
    1: 'Senin',
    2: 'Selasa',
    3: 'Rabu',
    4: 'Kamis',
    5: 'Jumat',
    6: 'Sabtu',
    7: 'Minggu',
};

export const PROMOTION_STATUSES: Record<PromotionStatus, string> = {
    promoted: 'Naik Kelas',
    retained: 'Tinggal Kelas',
    graduated: 'Lulus',
    transferred: 'Pindah',
};

export const ANNOUNCEMENT_TYPES: Record<AnnouncementType, string> = {
    general: 'Umum',
    academic: 'Akademik',
    event: 'Acara',
    urgent: 'Mendesak',
};

export const ANNOUNCEMENT_AUDIENCES: Record<AnnouncementAudience, string> = {
    all: 'Semua',
    teachers: 'Guru',
    parents: 'Orang Tua',
    students: 'Siswa',
};

export const DAYS: Record<string, string> = {
    monday: 'Senin',
    tuesday: 'Selasa',
    wednesday: 'Rabu',
    thursday: 'Kamis',
    friday: 'Jumat',
    saturday: 'Sabtu',
    sunday: 'Minggu',
};
