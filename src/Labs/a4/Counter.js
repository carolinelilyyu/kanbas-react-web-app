import React, { useState } from "react";
function Counter() {
  let [count, setCount] = useState(7);
  console.log(count);
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button
        onClick={() => { setCount(count++); console.log(count); }}>
        Up
      </button>
      <button
        onClick={() => { setCount(count--); console.log(count); }}>
        Down
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
export default Counter;

