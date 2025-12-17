import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

const Fallback = ({ error, resetErrorBoundary }) => {
  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>Something went wrong.</h2>
      <p>{error?.message || "Please try again later."}</p>
      <button
        onClick={resetErrorBoundary}
        style={{
          marginTop: "15px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Try Again
      </button>
    </div>
  );
};

const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={Fallback}
      onError={(error, info) => {
        console.error("ErrorBoundary caught an error:", error, info);
      }}
      onReset={() => {}}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
