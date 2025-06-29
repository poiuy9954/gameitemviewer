import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ItemSelector.css';

const ItemSelector = ({ onItemSelect, onDateChange }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
    setDefaultDates();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/items/names');
      setItems(response.data);
    } catch (error) {
      console.error('아이템 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const setDefaultDates = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 7); // 7일 전부터

    const endStr = end.toISOString().split('T')[0];
    const startStr = start.toISOString().split('T')[0];
    
    setEndDate(endStr);
    setStartDate(startStr);
    onDateChange(startStr + 'T00:00:00', endStr + 'T23:59:59');
  };

  const handleItemChange = (e) => {
    const item = e.target.value;
    setSelectedItem(item);
    onItemSelect(item);
  };

  const handleDateChange = () => {
    const start = startDate + 'T00:00:00';
    const end = endDate + 'T23:59:59';
    onDateChange(start, end);
  };

  return (
    <div className="item-selector">
      <div className="selector-row">
        <div className="selector-group">
          <label>🎯 아이템 선택</label>
          <select 
            value={selectedItem} 
            onChange={handleItemChange}
            disabled={loading}
          >
            <option value="">
              {loading ? '로딩 중...' : '아이템을 선택하세요'}
            </option>
            {items.map(item => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="date-group">
          <div className="date-input">
            <label>📅 시작일</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          
          <div className="date-input">
            <label>📅 종료일</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          
          <button 
            className="search-btn" 
            onClick={handleDateChange}
            disabled={!selectedItem}
          >
            🔍 조회
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemSelector;
