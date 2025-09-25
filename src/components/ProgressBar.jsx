import React, { useState } from "react";

function ProgressBar({ current, total }) {  
  const progress = (current / total) * 100;

  return (
    <div style={{ width: "100%", background: "#ffff", borderRadius: "8px", height: "15px" }}>
      <div
        style={{
          width: `${progress}%`,
          background: "green",
          height: "100%",
          borderRadius: "8px",
          transition: "width 0.3s ease"
        }}
      ></div>
    </div>
  );
}
export default ProgressBar