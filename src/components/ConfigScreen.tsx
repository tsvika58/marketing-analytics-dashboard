import React from 'react'
import type { MarketingConfig } from '../App'
import './ConfigScreen.css'

interface ConfigScreenProps {
  config: MarketingConfig
  onConfigChange: (config: MarketingConfig) => void
  onViewAnalytics: () => void
}

const ConfigScreen: React.FC<ConfigScreenProps> = ({ 
  config, 
  onConfigChange, 
  onViewAnalytics 
}) => {
  const leadGenOptions = [
    'LeadGen Motion VM1',
    'LeadGen Motion VM2',
    'LeadGen Motion VM3',
    'LeadGen Motion VM4',
    'LeadGen Motion VM5',
    'LeadGen Motion VM6',
    'LeadGen Motion VM7',
    'LeadGen Motion VM8',
    'LeadGen Motion VM9',
    'LeadGen Motion VM10'
  ]

  const vmOptions = [
    'Choose a VM06',
    'Choose a VM07', 
    'Choose a VM08',
    'Choose a VM09',
    'Choose a VM010',
    'Option A',
    'Option B',
    'Option C'
  ]

  const handleConfigUpdate = (updates: Partial<MarketingConfig>) => {
    onConfigChange({ ...config, ...updates })
  }

  const handleSearchAdsUpdate = (field: keyof MarketingConfig['searchAdsConfig'], value: number) => {
    handleConfigUpdate({
      searchAdsConfig: {
        ...config.searchAdsConfig,
        [field]: value
      }
    })
  }

  const handleVMUpdate = (vm: keyof MarketingConfig['vmConfigs'], value: string) => {
    handleConfigUpdate({
      vmConfigs: {
        ...config.vmConfigs,
        [vm]: value
      }
    })
  }

  return (
    <div className="config-screen">
      <div className="config-container">
        <div className="config-header">
          <h2>Define Paid Marketing Channel: Edit Paid Lead Generation</h2>
        </div>

        <div className="config-layout">
          <div className="left-panel">
            <div className="leadgen-section">
              <h3>Choose a Paid LeadGen Channel</h3>
              <select 
                value={config.leadGenChannel}
                onChange={(e) => handleConfigUpdate({ leadGenChannel: e.target.value })}
                className="leadgen-select"
              >
                {leadGenOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="vm-configs">
              {Object.entries(config.vmConfigs).map(([vm, value]) => (
                <div key={vm} className="vm-config-item">
                  <label>{vm.toUpperCase()}</label>
                  <select
                    value={value}
                    onChange={(e) => handleVMUpdate(vm as keyof MarketingConfig['vmConfigs'], e.target.value)}
                    className="vm-select"
                  >
                    {vmOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="right-panel">
            <div className="search-ads-section">
              <div className="tab-header">
                <button className="tab active">Search Ads</button>
              </div>

              <div className="metrics-grid">
                <div className="metric-item">
                  <label>Impressions</label>
                  <input
                    type="number"
                    value={config.searchAdsConfig.impressions}
                    onChange={(e) => handleSearchAdsUpdate('impressions', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="metric-item">
                  <label>Clicks</label>
                  <input
                    type="number"
                    value={config.searchAdsConfig.clicks}
                    onChange={(e) => handleSearchAdsUpdate('clicks', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="metric-item">
                  <label>Website Visitors</label>
                  <input
                    type="number"
                    value={config.searchAdsConfig.websiteVisitors}
                    onChange={(e) => handleSearchAdsUpdate('websiteVisitors', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="metric-item">
                  <label>Leads</label>
                  <input
                    type="number"
                    value={config.searchAdsConfig.leads}
                    onChange={(e) => handleSearchAdsUpdate('leads', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="metric-item">
                  <label>MQLs</label>
                  <input
                    type="number"
                    value={config.searchAdsConfig.mqls}
                    onChange={(e) => handleSearchAdsUpdate('mqls', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            <div className="funnel-diagram">
              <h4>Conversion Funnel</h4>
              <div className="funnel-flow">
                <div className="funnel-step">
                  <div className="step-box">Clicks</div>
                  <div className="step-value">{config.searchAdsConfig.clicks.toLocaleString()}</div>
                </div>
                <div className="arrow">→</div>
                <div className="funnel-step">
                  <div className="step-box">Visitors</div>
                  <div className="step-value">{config.searchAdsConfig.websiteVisitors.toLocaleString()}</div>
                </div>
                <div className="arrow">→</div>
                <div className="funnel-step">
                  <div className="step-box">Leads</div>
                  <div className="step-value">{config.searchAdsConfig.leads.toLocaleString()}</div>
                </div>
                <div className="arrow">→</div>
                <div className="funnel-step">
                  <div className="step-box">MQLs</div>
                  <div className="step-value">{config.searchAdsConfig.mqls.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="config-actions">
          <button className="btn-primary" onClick={onViewAnalytics}>
            View Analytics Dashboard
          </button>
          <button className="btn-secondary">Save Configuration</button>
        </div>
      </div>
    </div>
  )
}

export default ConfigScreen 