import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { store } from "./stores/store";
import { Provider } from "react-redux";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <Analytics />
  </Provider>
);
