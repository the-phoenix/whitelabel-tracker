import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import logo from "./logo.svg";
import "./Home.css";
import { selectCount, increment } from '../../stores/counter'
import { sum } from "../../../core/math";

export default function Home() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const [serverResult, setServerResult] = useState<number | null>(null);
  useEffect(() => {
    (async () => {
      const result = await fetch("/api/sum");
      const newServerResult = await result.json();
      setServerResult(newServerResult);
    })();
  }, []);

  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <p>Client result {sum(1, 3)}</p>
        <p>Server result {serverResult}</p>
        <p>Count {count}</p>
        <button onClick={() => dispatch(increment())}>Do increment</button>
      </header>
    </div>
  );
}