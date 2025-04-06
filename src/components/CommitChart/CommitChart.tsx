import { Line } from 'react-chartjs-2';
import { format, subDays, isValid } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import "./CommitChart.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CommitActivity {
  week: number;
  total: number;
  days: number[];
}

interface CommitChartProps {
  data: CommitActivity[];
}

export default function CommitChart({ data }: CommitChartProps) {
  const [processedData, setProcessedData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      tension: number;
    }[];
  }>({
    labels: [],
    datasets: [{
      label: 'Weekly Commits',
      data: [],
      borderColor: '#134074',
      backgroundColor: '#8DA9C4',
      tension: 0.1
    }]
  });

  // Process data when it changes
  useEffect(() => {
    if (!data || data.length === 0) {
      setProcessedData({
        labels: ['No data available'],
        datasets: [{
          label: 'Weekly Commits',
          data: [0],
          borderColor: '#134074',
          backgroundColor: '#8DA9C4',
          tension: 0.1
        }]
      });
      return;
    }

    try {
      const validWeeks = data.filter(week => 
        week && typeof week.total === 'number'
      );

      const chartData = {
        labels: validWeeks.map((_, i) => {
          const date = subDays(new Date(), (validWeeks.length - i - 1) * 7);
          return isValid(date) ? format(date, 'MMM d') : '';
        }),
        datasets: [{
          label: 'Weekly Commits',
          data: validWeeks.map(week => week.total),
          borderColor: '#134074',
          backgroundColor: '#8DA9C4',
          tension: 0.1
        }]
      };

      setProcessedData(chartData);
    } catch (error) {
      console.error('Error processing commit data:', error);
      setProcessedData({
        labels: ['Error processing data'],
        datasets: [{
          label: 'Weekly Commits',
          data: [0],
          borderColor: '#ff0000',
          backgroundColor: '#ffcccc',
          tension: 0.1
        }]
      });
    }
  }, [data]);

  return (
    <div className="chart-container">
      {processedData.datasets[0].data.length > 0 && (
        <Line
          data={processedData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.dataset.label}: ${context.raw} commits`
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Commits'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Week'
                }
              }
            }
          }}
        />
      )}
      {processedData.datasets[0].data.length === 0 && (
        <div className="chart-placeholder">
          No commit data available for this repository
        </div>
      )}
    </div>
  );
}