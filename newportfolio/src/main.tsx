import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import { Provider } from 'react-redux';
import MainLayout from './components/MainLayout';
import { store } from '@/store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MainLayout />
    </Provider>
  </StrictMode>,
);
