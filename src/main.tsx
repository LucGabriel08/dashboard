import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { GlobalStyle } from "./styles/GlobalStyle";
import App from "./App.tsx";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </StrictMode>,
);
