import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Overlay from './overlay'

import store from './state/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Provider store={store}>
        <App />
        <Overlay />
      </Provider>
    </div>
  </StrictMode>,
)
