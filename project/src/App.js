import React from "react";
import { DataProvider } from "./context/DataContext";
import Counter from "./components/Counter";

function App() {
  return (
    <DataProvider>
      <Counter />
    </DataProvider>
  );
}

export default App;
