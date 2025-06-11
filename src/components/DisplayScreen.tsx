import React from 'react'
import type { MarketingConfig } from '../App'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'
import './DisplayScreen.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

interface DisplayScreenProps {
  config: MarketingConfig
  onBackToConfig: () => void
}

const DisplayScreen: React.FC<DisplayScreenProps> = ({ config, onBackToConfig }) => {
  // Conversion funnel data
  const funnelData = {
    labels: ['Impressions', 'Clicks', 'Visitors', 'Leads', 'MQLs'],
    datasets: [
      {
        label: 'Marketing Funnel',
        data: [
          config.searchAdsConfig.impressions,
          config.searchAdsConfig.clicks,
          config.searchAdsConfig.websiteVisitors,
          config.searchAdsConfig.leads,
          config.searchAdsConfig.mqls,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
      },
    ],
  }

  // Conversion rates data
  const conversionData = {
    labels: ['Click Rate', 'Visit Rate', 'Lead Rate', 'MQL Rate'],
    datasets: [
      {
        label: 'Conversion Rates (%)',
        data: [
          ((config.searchAdsConfig.clicks / config.searchAdsConfig.impressions) * 100).toFixed(2),
          ((config.searchAdsConfig.websiteVisitors / config.searchAdsConfig.clicks) * 100).toFixed(2),
          ((config.searchAdsConfig.leads / config.searchAdsConfig.websiteVisitors) * 100).toFixed(2),
          ((config.searchAdsConfig.mqls / config.searchAdsConfig.leads) * 100).toFixed(2),
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  }

  // Distribution pie chart
  const distributionData = {
    labels: ['Clicks', 'Visitors', 'Leads', 'MQLs'],
    datasets: [
      {
        data: [
          config.searchAdsConfig.clicks,
          config.searchAdsConfig.websiteVisitors,
          config.searchAdsConfig.leads,
          config.searchAdsConfig.mqls,
        ],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
        ],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  }

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  }

  return (
    <div className="display-screen">
      <div className="display-header">
        <h2>Analytics Dashboard - {config.leadGenChannel}</h2>
        <button className="btn-back" onClick={onBackToConfig}>
          ← Back to Configuration
        </button>
      </div>

      <div className="metrics-summary">
        <div className="metric-card">
          <h3>Total Impressions</h3>
          <div className="metric-value">{config.searchAdsConfig.impressions.toLocaleString()}</div>
        </div>
        <div className="metric-card">
          <h3>Total Clicks</h3>
          <div className="metric-value">{config.searchAdsConfig.clicks.toLocaleString()}</div>
        </div>
        <div className="metric-card">
          <h3>Website Visitors</h3>
          <div className="metric-value">{config.searchAdsConfig.websiteVisitors.toLocaleString()}</div>
        </div>
        <div className="metric-card">
          <h3>Generated Leads</h3>
          <div className="metric-value">{config.searchAdsConfig.leads.toLocaleString()}</div>
        </div>
        <div className="metric-card">
          <h3>Qualified Leads (MQLs)</h3>
          <div className="metric-value">{config.searchAdsConfig.mqls.toLocaleString()}</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Marketing Funnel Volume</h3>
          <Bar data={funnelData} options={chartOptions} />
        </div>

        <div className="chart-container">
          <h3>Conversion Rates</h3>
          <Line data={conversionData} options={lineChartOptions} />
        </div>

        <div className="chart-container">
          <h3>Traffic Distribution</h3>
          <Doughnut data={distributionData} options={pieChartOptions} />
        </div>

        <div className="chart-container performance-metrics">
          <h3>Performance Metrics</h3>
          <div className="performance-grid">
            <div className="performance-item">
              <label>Click-Through Rate</label>
              <div className="performance-value">
                {((config.searchAdsConfig.clicks / config.searchAdsConfig.impressions) * 100).toFixed(2)}%
              </div>
            </div>
            <div className="performance-item">
              <label>Visitor Conversion</label>
              <div className="performance-value">
                {((config.searchAdsConfig.websiteVisitors / config.searchAdsConfig.clicks) * 100).toFixed(2)}%
              </div>
            </div>
            <div className="performance-item">
              <label>Lead Conversion</label>
              <div className="performance-value">
                {((config.searchAdsConfig.leads / config.searchAdsConfig.websiteVisitors) * 100).toFixed(2)}%
              </div>
            </div>
            <div className="performance-item">
              <label>MQL Conversion</label>
              <div className="performance-value">
                {((config.searchAdsConfig.mqls / config.searchAdsConfig.leads) * 100).toFixed(2)}%
              </div>
            </div>
            <div className="performance-item">
              <label>Overall Efficiency</label>
              <div className="performance-value">
                {((config.searchAdsConfig.mqls / config.searchAdsConfig.impressions) * 100).toFixed(4)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="config-summary">
        <h3>Current Configuration</h3>
        <div className="config-details">
          <div><strong>Lead Gen Channel:</strong> {config.leadGenChannel}</div>
          <div><strong>VM Configurations:</strong></div>
          <ul>
            {Object.entries(config.vmConfigs).map(([vm, value]) => (
              <li key={vm}>{vm.toUpperCase()}: {value}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DisplayScreen 