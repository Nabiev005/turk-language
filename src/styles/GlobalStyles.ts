import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #f6f7fb;
    --surface: #ffffff;
    --surface-2: #eef7f2;
    --text: #172033;
    --muted: #64748b;
    --line: #e5e7eb;
    --brand: #16a34a;
    --brand-2: #ef4444;
    --brand-3: #2563eb;
    --warning: #f59e0b;
    --shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
    color-scheme: light;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    min-height: 100%;
    background: var(--bg);
    scroll-behavior: smooth;
  }

  body {
    background:
      radial-gradient(circle at top left, rgba(22, 163, 74, 0.10), transparent 34rem),
      linear-gradient(180deg, #fbfcff 0%, var(--bg) 55%);
    color: var(--text);
    line-height: 1.6;
    min-height: 100vh;
    min-height: 100dvh;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    min-height: 100dvh;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input, button {
    touch-action: manipulation;
  }

  img, video, iframe {
    max-width: 100%;
  }

  ::selection {
    background: rgba(22, 163, 74, 0.2);
  }

  @media (max-width: 760px) {
    body {
      padding-bottom: calc(76px + env(safe-area-inset-bottom));
    }
  }
`;

export default GlobalStyles;
