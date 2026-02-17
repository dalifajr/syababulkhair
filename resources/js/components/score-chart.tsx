import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

type ScoreData = {
    label: string;
    value: number;
};

type ScoreChartProps = {
    title: string;
    data: ScoreData[];
    type?: 'line' | 'bar';
    color?: string;
    height?: number;
};

const CHART_COLORS = [
    'rgba(99, 102, 241, 1)',   // indigo
    'rgba(16, 185, 129, 1)',   // emerald
    'rgba(245, 158, 11, 1)',   // amber
    'rgba(239, 68, 68, 1)',    // red
    'rgba(59, 130, 246, 1)',   // blue
];

export function ScoreChart({ title, data, type = 'line', color, height = 220 }: ScoreChartProps) {
    const mainColor = color || CHART_COLORS[0];
    const bgColor = mainColor.replace(', 1)', ', 0.15)');

    const chartData = {
        labels: data.map((d) => d.label),
        datasets: [
            {
                label: title,
                data: data.map((d) => d.value),
                borderColor: mainColor,
                backgroundColor: type === 'line' ? bgColor : mainColor,
                fill: type === 'line',
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 2,
                borderRadius: type === 'bar' ? 8 : undefined,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: 12,
                cornerRadius: 8,
                titleFont: { size: 13 },
                bodyFont: { size: 12 },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: { color: 'rgba(0,0,0,0.06)' },
                ticks: { font: { size: 11 } },
            },
            x: {
                grid: { display: false },
                ticks: { font: { size: 11 }, maxRotation: 45 },
            },
        },
    };

    const ChartComponent = type === 'bar' ? Bar : Line;

    return (
        <div style={{ height: `${height}px` }}>
            <ChartComponent data={chartData} options={options} />
        </div>
    );
}

type MultiLineChartProps = {
    title: string;
    datasets: Array<{
        label: string;
        data: ScoreData[];
    }>;
    height?: number;
};

export function MultiLineChart({ title, datasets, height = 280 }: MultiLineChartProps) {
    const labels = datasets[0]?.data.map((d) => d.label) || [];

    const chartData = {
        labels,
        datasets: datasets.map((ds, i) => ({
            label: ds.label,
            data: ds.data.map((d) => d.value),
            borderColor: CHART_COLORS[i % CHART_COLORS.length],
            backgroundColor: CHART_COLORS[i % CHART_COLORS.length].replace(', 1)', ', 0.1)'),
            fill: false,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
        })),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: { usePointStyle: true, padding: 16, font: { size: 11 } },
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: 12,
                cornerRadius: 8,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: { color: 'rgba(0,0,0,0.06)' },
                ticks: { font: { size: 11 } },
            },
            x: {
                grid: { display: false },
                ticks: { font: { size: 11 } },
            },
        },
    };

    return (
        <div style={{ height: `${height}px` }}>
            <Line data={chartData} options={options} />
        </div>
    );
}
