import React, { useState, useEffect, useCallback } from "react";
import * as math from "mathjs";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [clearDisplay, setClearDisplay] = useState(true);

  const handleButtonClick = useCallback(
    (value) => {
      if (clearDisplay || input === "Undefined") {
        setInput(value);
        setClearDisplay(false);
      } else {
        const lastChar = input.slice(-1);
        const displayValue = value === "*" ? "×" : value === "/" ? "÷" : value;
        if ("+-*/×÷".includes(lastChar) && "+-*/×÷".includes(value)) {
          setInput(input.slice(0, -1) + displayValue);
        } else {
          setInput(input + displayValue);
        }
      }
    },
    [input, clearDisplay]
  );

  const handleCalculate = useCallback(() => {
    try {
      const result = math.evaluate(
        `${input.replace(/×/g, "*").replace(/÷/g, "/")}`
      );
      if (result === Infinity || result === -Infinity) {
        setInput("Cannot divide by zero");
      } else if (isNaN(result)) {
        setInput("Result is undefined");
      } else {
        setInput(result.toString());
      }
    } catch (error) {
      setInput("Undefined");
    } finally {
      setClearDisplay(false);
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput("0");
    setClearDisplay(true);
  }, []);

  const handleBackspace = useCallback(() => {
    setInput((prevInput) => {
      if (prevInput.length === 1) {
        return "0";
      } else {
        return prevInput.slice(0, -1);
      }
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      switch (key) {
        case "Escape":
          event.preventDefault();
          handleClear();
          highlightKey("AC");
          break;
        case "Backspace":
          event.preventDefault();
          handleBackspace();
          highlightKey("Backspace");
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          handleButtonClick(key);
          highlightKey(key);
          break;
        case "=":
        case "Enter":
          event.preventDefault();
          handleCalculate();
          highlightKey("=");
          break;
        case ".":
          handleButtonClick(key);
          highlightKey(key);
          break;
        default:
          if (/[\d]/.test(key)) {
            handleButtonClick(key);
            highlightKey(key);
          }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleButtonClick, handleCalculate, handleClear]);

  const highlightKey = (value) => {
    const button = document.querySelector(`button[data-key="${value}"]`);
    if (button) {
      button.classList.add("key-pressed");
      setTimeout(() => {
        button.classList.remove("key-pressed");
      }, 100);
    }
  };

  return (
    <>
      <div className="calculator">
        <div className="formula-screen">{input}</div>
        <input type="text" value={input || "0"} readOnly />
        <div className="buttons">
          <button data-key="AC" onClick={handleClear}>
            AC
          </button>
          <button data-key="/" onClick={() => handleButtonClick("/")}>
            ÷
          </button>
          <button data-key="*" onClick={() => handleButtonClick("*")}>
            ×
          </button>
          <button data-key="Backspace" onClick={handleBackspace}>
            &#9003;
          </button>
          <button data-key="7" onClick={() => handleButtonClick("7")}>
            7
          </button>
          <button data-key="8" onClick={() => handleButtonClick("8")}>
            8
          </button>
          <button data-key="9" onClick={() => handleButtonClick("9")}>
            9
          </button>
          <button data-key="+" onClick={() => handleButtonClick("+")}>
            +
          </button>
          <button data-key="4" onClick={() => handleButtonClick("4")}>
            4
          </button>
          <button data-key="5" onClick={() => handleButtonClick("5")}>
            5
          </button>
          <button data-key="6" onClick={() => handleButtonClick("6")}>
            6
          </button>
          <button data-key="-" onClick={() => handleButtonClick("-")}>
            -
          </button>
          <button data-key="1" onClick={() => handleButtonClick("1")}>
            1
          </button>
          <button data-key="2" onClick={() => handleButtonClick("2")}>
            2
          </button>
          <button data-key="3" onClick={() => handleButtonClick("3")}>
            3
          </button>
          <button
            data-key="0"
            className="span-two"
            onClick={() => handleButtonClick("0")}
          >
            0
          </button>
          <button data-key="." onClick={() => handleButtonClick(".")}>
            .
          </button>
          <button data-key="=" className="row-span" onClick={handleCalculate}>
            =
          </button>
        </div>
      </div>
      <div className="author">
        Designed and Coded By
        <br />
        <span>Mohamed Bouye</span>
      </div>
    </>
  );
};

export default Calculator;
