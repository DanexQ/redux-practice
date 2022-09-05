import React from "react";
import DataContext from "../context/DataContext";
import { useContext } from "react";

const Counter = () => {
  const { count, setCount } = useContext(DataContext);
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount((prevValue) => prevValue + 1)}>
        Increment
      </button>
      <button onClick={() => setCount((prevValue) => prevValue - 1)}>
        Decrement
      </button>
    </div>
  );
};

export default Counter;
