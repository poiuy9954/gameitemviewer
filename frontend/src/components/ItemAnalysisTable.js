import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemAnalysisTable.css';

const ItemAnalysisTable = ({ selectedItem }) => {
  const [analysis, setAnalysis] = useState(null);
  const [allAnalysis, setAllAnalysis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('selected'); // 'selected' or 'all'

  useEffect(() => {
    if (selectedItem) {
      fetchItemAnalysis(selectedItem);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (viewMode === 'all') {
      fetchAllAnalysis();
    }
  }, [viewMode]);

  const fetchItemAnalysis = async (itemName) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/items/${encodeURIComponent(itemName)}/analysis`);
      setAnalysis(response.data);
    } catch (error) {
      console.error('아이템 분석 데이터 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAnalysis = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/items/analysis/all');
      setAllAnalysis(response.data);
    } catch (error) {
      console.error('전체 아이템 분석 데이터 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined) return '-';
    return Math.round(price).toLocaleString();
  };

  const renderSelectedAnalysis = () => {
    if (!selectedItem) {
      return (
        <div className="no-data">
          🎯 아이템을 선택해주세요
        </div>
      );
    }

    if (loading) {
      return <div className="loading">📊 분석 중...</div>;
    }

    if (!analysis) {
      return <div className="no-data">❌ 분석 데이터가 없습니다</div>;
    }

    return (
      <div className="analysis-card">
        <h3>{analysis.itemName}</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">💰 평균 가격</span>
            <span className="stat-value">{formatPrice(analysis.averagePrice)} 골드</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">📈 최고 가격</span>
            <span className="stat-value high">{formatPrice(analysis.maxPrice)} 골드</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">📉 최저 가격</span>
            <span className="stat-value low">{formatPrice(analysis.minPrice)} 골드</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">📊 총 거래 수</span>
            <span className="stat-value">{analysis.totalCount?.toLocaleString()} 건</span>
          </div>
        </div>
      </div>
    );
  };

  const renderAllAnalysis = () => {
    if (loading) {
      return <div className="loading">📊 전체 분석 로딩 중...</div>;
    }

    if (allAnalysis.length === 0) {
      return <div className="no-data">❌ 분석 데이터가 없습니다</div>;
    }

    return (
      <div className="analysis-table-container">
        <table className="analysis-table">
          <thead>
            <tr>
              <th>아이템명</th>
              <th>평균가격</th>
              <th>최고가격</th>
              <th>최저가격</th>
              <th>거래수</th>
            </tr>
          </thead>
          <tbody>
            {allAnalysis.map((item, index) => (
              <tr key={index}>
                <td className="item-name">{item.itemName}</td>
                <td>{formatPrice(item.averagePrice)}</td>
                <td className="high">{formatPrice(item.maxPrice)}</td>
                <td className="low">{formatPrice(item.minPrice)}</td>
                <td>{item.totalCount?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="item-analysis">
      <div className="view-toggle">
        <button 
          className={viewMode === 'selected' ? 'active' : ''}
          onClick={() => setViewMode('selected')}
        >
          선택된 아이템
        </button>
        <button 
          className={viewMode === 'all' ? 'active' : ''}
          onClick={() => setViewMode('all')}
        >
          전체 아이템
        </button>
      </div>

      <div className="analysis-content">
        {viewMode === 'selected' ? renderSelectedAnalysis() : renderAllAnalysis()}
      </div>
    </div>
  );
};

export default ItemAnalysisTable;
