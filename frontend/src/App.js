import React, { useState } from 'react';
import ItemSelector from './components/ItemSelector';
import ItemPriceChart from './components/ItemPriceChart';
import ItemAnalysisTable from './components/ItemAnalysisTable';
import './App.css';

function App() {
  const [selectedItem, setSelectedItem] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎮 Game Item Viewer</h1>
        <p>로스트아크 아이템 가격 분석 도구</p>
      </header>
      
      <main className="App-main">
        <div className="container">
          <div className="controls-section">
            <ItemSelector 
              onItemSelect={handleItemSelect}
              onDateChange={handleDateChange}
            />
          </div>
          
          <div className="content-grid">
            <div className="chart-section">
              <h2>📈 가격 추이</h2>
              <ItemPriceChart 
                itemName={selectedItem}
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            
            <div className="analysis-section">
              <h2>📊 가격 분석</h2>
              <ItemAnalysisTable selectedItem={selectedItem} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
