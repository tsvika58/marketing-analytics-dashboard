import React, { useState } from 'react'
import './App.css'
import ConfigScreen from './components/ConfigScreen'
import DisplayScreen from './components/DisplayScreen'

export interface MarketingConfig {
  leadGenChannel: string;
  searchAdsConfig: {
    impressions: number;
    clicks: number;
    websiteVisitors: number;
    leads: number;
    mqls: number;
  };
  vmConfigs: {
    vm06: string;
    vm07: string;
    vm08: string;
    vm09: string;
    vm010: string;
  };
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<'config' | 'display'>('config')
  const [marketingConfig, setMarketingConfig] = useState<MarketingConfig>({
    leadGenChannel: 'LeadGen Motion VM1',
    searchAdsConfig: {
      impressions: 10000,
      clicks: 500,
      websiteVisitors: 400,
      leads: 50,
      mqls: 20
    },
    vmConfigs: {
      vm06: 'Choose a VM06',
      vm07: 'Choose a VM07',
      vm08: 'Choose a VM08',
      vm09: 'Choose a VM09',
      vm010: 'Choose a VM010'
    }
  })

  return (
    <div className="app">
      <header className="app-header">
        <h1>Marketing Analytics Dashboard</h1>
        <nav className="nav-buttons">
          <button 
            className={currentScreen === 'config' ? 'active' : ''}
            onClick={() => setCurrentScreen('config')}
          >
            Configuration
          </button>
          <button 
            className={currentScreen === 'display' ? 'active' : ''}
            onClick={() => setCurrentScreen('display')}
          >
            Analytics Display
          </button>
        </nav>
      </header>

      <main className="main-content">
        {currentScreen === 'config' ? (
          <ConfigScreen 
            config={marketingConfig} 
            onConfigChange={setMarketingConfig}
            onViewAnalytics={() => setCurrentScreen('display')}
          />
        ) : (
          <DisplayScreen 
            config={marketingConfig}
            onBackToConfig={() => setCurrentScreen('config')}
          />
        )}
      </main>
    </div>
  )
}

export default App
