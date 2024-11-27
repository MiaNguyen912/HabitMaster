// components/GoogleChart.js
import { useEffect, useRef } from 'react';

const Chart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const loadGoogleCharts = () => {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.async = true;
      script.onload = drawChart;
      document.body.appendChild(script);
    };

    const drawChart = () => {
      if (!window.google) return;
      window.google.charts.load('current', { packages: ['corechart'] });
      window.google.charts.setOnLoadCallback(() => {
        const data = window.google.visualization.arrayToDataTable([
          ['Month', 'Sales'],
          ['Jan', 1000],
          ['Feb', 1170],
          ['Mar', 660],
          ['Apr', 1030],
        ]);

        const options = {
            // width: 600,  // Set the chart width
            // height: 400, // Set the chart height
            chartArea: {
                width: '80%',  // Chart's internal width percentage
                height: '70%', // Chart's internal height percentage
            },
            
            title: 'Monthly Sales Report',
            titleTextStyle: {
                fontSize: 24,
                bold: true,
                color: '#333',
            },
            legend: {
                position: 'bottom',
                textStyle: { fontSize: 14, color: '#555' },
            },
            backgroundColor: '#f8f9fa',
            chartArea: { width: '80%', height: '70%' },
            colors: ['#1b9e77'], // Custom chart colors
            hAxis: {
                title: 'Month',
                titleTextStyle: { color: '#333', fontSize: 16 },
            },
            vAxis: {
                title: 'Sales',
                titleTextStyle: { color: '#333', fontSize: 16 },
                gridlines: { color: '#ddd' },
            },
        };

        const chart = new window.google.visualization.BarChart(chartRef.current);
        chart.draw(data, options);
      });
    };

    loadGoogleCharts();
  }, []);

  return <div ref={chartRef} className="w-[60%] h-auto p-4" />;
};

export default Chart;
