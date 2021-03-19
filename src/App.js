import React, { useState } from "react";
import "./App.css";

function Numboard({ value, res, setRes, arith }) {
  return (
    <div
      className="btn num"
      onClick={() => {
        if (res.length < 17) {
          let t = "0";
          if (Number(res) === 0 || arith === "=") {
            t = `${value}`;
          } else {
            t = `${res + value}`;
          }
          setRes(t);
        }
      }}
      style={value === 0 ? { gridColumn: "1 / span 2" } : null}
    >
      {value}
    </div>
  );
}

function App() {
  const [res, setRes] = useState("0");
  const [val, setVal] = useState(0);
  const [history, setHistory] = useState([]);
  const [hId, setHId] = useState(0)
  const [arith, setArith] = useState("");

  const numboard = [];
  for (let i = 9; i >= 0; --i) {
    numboard.push(
      <Numboard res={res} value={i} setRes={setRes} arith={arith} key={i} />
    );
  }

  const calc = (val1, val2) => {
    let result = res;
    if (arith === "+") {
      result = `${val1 + val2}`;
    } else if (arith === "-") {
      result = `${val1 - val2}`;
    } else if (arith === "x") {
      result = `${val1 * val2}`;
    } else if (arith === "/") {
      result = `${val1 / val2}`;
    } else if (arith === "%") {
      result = `${val1 % val2}`;
    }
    setRes(result);
    return +result;
  };

  const doMath = (op) => {
    if (res !== "0") {
      const result = calc(val, +res);
      setVal(result);
      setArith(op);
      setRes("0");
      if (op === "=") {
        setHId(hId + 1);
        setHistory([...history, result]);
      }
    }
  };

  return (
    <div className="calculator">
      <div className="calcHeader">
        <i className="fas fa-chevron-up" onClick={() => {
          if (hId >= 1) {
            setHId(hId - 1);
            setRes(`${history[hId - 1]}`);
            setArith("");
            if (hId >= 2) setVal(history[hId - 2]);
            else setVal(0);
          }
        }}></i>
        <i className="fas fa-chevron-down" onClick={() => {
          if (hId < history.length) {
            setHId(hId + 1);
            if (hId + 1 === history.length) setRes('0');
            else setRes(`${history[hId + 1]}`);
            setArith("");
            setVal(history[hId]);
          }
        }}></i>
        <div className="history">
          {`${val} ` + (arith === "=" ? "" : `${arith}`)}
        </div>
        <div className="result">{res}</div>
      </div>
      <div className="calcBody">
        <div
          className="btn"
          onClick={() => {
            setRes("0");
            setVal(0);
            setArith("");
          }}
        >
          AC
        </div>
        <div
          className="btn"
          onClick={() => {
            setRes(String(-+res));
            setVal(-+res);
          }}
        >
          +/-
        </div>
        <div className="btn" onClick={() => doMath("%")}>
          %
        </div>

        {numboard}
        <div className="btn">.</div>

        <div className="btn orange" onClick={() => doMath("/")}>
          ÷
        </div>
        <div className="btn orange" onClick={() => doMath("x")}>
          x
        </div>
        <div className="btn orange" onClick={() => doMath("-")}>
          -
        </div>
        <div className="btn orange" onClick={() => doMath("+")}>
          +
        </div>
        <div className="btn orange" onClick={() => doMath("=")}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;
