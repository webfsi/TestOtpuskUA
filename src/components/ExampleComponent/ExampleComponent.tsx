import { useState } from "react";

function ExampleComponent() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "1rem",
        border: "1px solid var(--color-border)",
        borderRadius: "4px",
      }}
    >
      <h2>Example Component</h2>
      <p>This is an example component template.</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "var(--color-primary)",
          color: "var(--color-white)",
          borderRadius: "4px",
        }}
      >
        Count: {count}
      </button>
    </div>
  );
}

export default ExampleComponent;
