import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store/store.ts";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={3500}
      theme="colored"
      newestOnTop
    />
  </Provider>
);
