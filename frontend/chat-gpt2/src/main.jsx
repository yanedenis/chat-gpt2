import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
    <StrictMode>
      <App />
    </StrictMode>
  </ConfigProvider>
)
