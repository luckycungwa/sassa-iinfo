"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "./ThemeProvider";

export default function ToastProvider() {
  const { theme } = useTheme();

  return (
    <ToastContainer
      key={theme}
      position="bottom-center"
      theme={theme}
      autoClose={3500}
      newestOnTop
      closeOnClick
      pauseOnHover
      pauseOnFocusLoss={false}
      hideProgressBar={false}
    />
  );
}
