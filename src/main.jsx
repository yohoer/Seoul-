import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Persist the app's useState values in localStorage without changing App.jsx.
// Each custom-hook instance gets a stable slot based on its hook order.
const realUseState = React.useState;
let nextHookId = 0;

function persistentUseState(initialValue) {
  const idRef = React.useRef(null);
  if (idRef.current === null) {
    idRef.current = nextHookId++;
  }

  const key = `seoul-trip-state-v1:${idRef.current}`;
  const [state, setState] = realUseState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved === null ? initialValue : JSON.parse(saved);
    } catch {
      return initialValue;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save travel-app data', e);
    }
  }, [key, state]);

  return [state, setState];
}

// App.jsx imports useState from React. Patch it before App is evaluated.
React.useState = persistentUseState;

const mount = async () => {
  const { default: App } = await import('./App.jsx');

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

mount();
