import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/root.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

window.addEventListener("error", (event) => {
  console.error("[main.tsx] 全局错误:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("[main.tsx] 未处理的Promise拒绝:", event.reason);
});