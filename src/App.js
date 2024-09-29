import "./styles.css";
import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import { ThemeProvider, ThemeContext } from "./themecontext";

function App() {
  const [reType, setReType] = useState("posts");
  const [items, setItems] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const handleResize = () => setWindowWidth(window.innerWidth);
  const handleResize2 = () => setWindowHeight(window.innerHeight);
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);
  const renderCount = useRef(1);

  const slowFunction = (num) => {
    console.log("Calling slow function");
    return num * 2;
  };

  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]);

  const themeStyles = {
    backgroundColor: dark ? "black" : "yellow",
    color: dark ? "yellow" : "black",
  };
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${reType}`)
      .then((response) => response.json())
      .then((json) => setItems(json));
  }, [reType]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize2);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize2);
    };
  }, []);

  return (
    <>
      <div className="App">
        <button onClick={() => setReType("posts")}>Posts</button>
        <button onClick={() => setReType("users")}>Users</button>
        <button onClick={() => setReType("comments")}>Comments</button>
        <h2>{reType}</h2>

        <div>{windowWidth}</div>
        <div>{windowHeight}</div>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value))}
        />
        <button onClick={() => setDark((prevDark) => !prevDark)}>Theme</button>

        <div>i rendered {renderCount.current}</div>
        <div style={themeStyles}>{doubleNumber}</div>
        {items.map((item) => {
          return <pre key={item.id}>{JSON.stringify(item)}</pre>;
        })}
      </div>
    </>
  );
}

export default App;
