import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { NodesProvider } from './contexts/NodesContext'
import App from './App'
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NodesProvider>
       <App />
     </NodesProvider>
  </StrictMode>,
)
