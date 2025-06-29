import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
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
import './ItemPriceChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ItemPriceChart = ({ itemName, startDate, endDate }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (itemName && startDate && endDate) {
      fetchPriceTrend();
    }
  }, [itemName, startDate, endDate]);

  const fetchPriceTrend = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/items/${encodeURIComponent(itemName)}/trend`, {
        params: {
          startDate: startDate,
          endDate: endDate
        }
      });

      const data = response.data;
      
      if (data.length === 0) {
        setError('선택한 기간에 데이터가 없습니다.');
        setChartData(null);
        return;
      }

      const labels = data.map(item => 
        new Date(item.date).toLocaleDateString('ko-KR', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit'
        })
      );
      const prices = data.map(item => item.price);

      setChartData({
        labels,
        datasets: [
          {
            label: `${itemName} 가격`,
            data: prices,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
            pointBackgroundColor: 'rgb(75, 192, 192)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
          }
        ]
      });
    } catch (error) {
      console.error('가격 추이 데이터 조회 실패:', error);
      setError('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: itemName ? `${itemName} 가격 추이` : '아이템을 선택해주세요',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `가격: ${context.parsed.y?.toLocaleString()} 골드`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: '가격 (골드)',
          font: {
            weight: 'bold'
          }
        },
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      },
      x: {
        title: {
          display: true,
          text: '날짜',
          font: {
            weight: 'bold'
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  if (loading) {
    return (
      <div className="chart-container">
        <div className="loading">📊 차트 로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-container">
        <div className="error">⚠️ {error}</div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="chart-container">
        <div className="placeholder">
          📈 아이템과 날짜를 선택하고 조회 버튼을 눌러주세요
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ItemPriceChart;
