import { createContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <DataContext.Provider value={{ count, setCount }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
