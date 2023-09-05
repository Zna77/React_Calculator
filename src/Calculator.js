import React, { useState, useEffect, useCallback } from "react";
import * as math from "mathjs";
import "./styles.css";

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
        if ("+-*/×÷%".includes(lastChar) && "+-*/×÷%".includes(value)) {
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
      let expression = input.includes("√")
        ? input.replace(/√/g, "sqrt(") + ")"
        : input.replace(/×/g, "*").replace(/÷/g, "/");
      const result = math.evaluate(expression);
      if (result === Infinity || result === -Infinity) {
        setInput("Cannot divide by zero");
      } else if (isNaN(result)) {
        setInput("Result is undefined");
      } else {
        const isWholeNumber = result % 1 === 0;
        setInput(isWholeNumber ? result.toString() : result.toFixed(2));
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
        case "%":
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
  }, [handleButtonClick, handleCalculate, handleClear, handleBackspace]);

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
      <div className="w-80 sm:w-96 md:w-96 mx-auto mt-14 text-center p-5 bg-gray-100/[0.03] backdrop-blur-md border border-slate-200/20 rounded-xl shadow-md">
        <div className="min-h-15 mt-2.5 font-digital text-xl text-orange-400 text-right leading-3 break-all">
          {input}
        </div>
        <input
          className="w-full bg-transparent font-digital text-white p-2.5 pr-0 text-3xl text-right leading-9 border-none"
          type="text"
          value={input || "0"}
          readOnly
        />
        <div className="grid grid-cols-4 grid-rows-5 gap-1.5 p-2.5 rounded-2xl">
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-2xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="AC"
            onClick={handleClear}
          >
            AC
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-2xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="/"
            onClick={() => handleButtonClick("/")}
          >
            ÷
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="*"
            onClick={() => handleButtonClick("*")}
          >
            ×
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="Backspace"
            onClick={handleBackspace}
          >
            &larr;
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="7"
            onClick={() => handleButtonClick("7")}
          >
            7
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="8"
            onClick={() => handleButtonClick("8")}
          >
            8
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="9"
            onClick={() => handleButtonClick("9")}
          >
            9
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="+"
            onClick={() => handleButtonClick("+")}
          >
            +
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="4"
            onClick={() => handleButtonClick("4")}
          >
            4
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="5"
            onClick={() => handleButtonClick("5")}
          >
            5
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="6"
            onClick={() => handleButtonClick("6")}
          >
            6
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="-"
            onClick={() => handleButtonClick("-")}
          >
            -
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="1"
            onClick={() => handleButtonClick("1")}
          >
            1
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="2"
            onClick={() => handleButtonClick("2")}
          >
            2
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="3"
            onClick={() => handleButtonClick("3")}
          >
            3
          </button>
          <button
            className="col-[1_/_2] bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="0"
            onClick={() => handleButtonClick("0")}
          >
            0
          </button>
          <button
            className="bg-slate-50/[0.1] font-roboto text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="."
            onClick={() => handleButtonClick(".")}
          >
            .
          </button>
          <button
            className="font-roboto bg-slate-50/[0.1] text-center h-16 text-white border-none rounded-xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="%"
            onClick={() => handleButtonClick("%")}
          >
            %
          </button>
          <button
            className="font-roboto col-[4_/_5] row-[5_/_4] bg-slate-50/[0.1] h-auto text-center text-white border-none rounded-2xl p-2.5 text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            onClick={() => handleButtonClick("√")}
          >
            &#8730;
          </button>
          <button
            className="col-[4_/_5] row-[6_/_5] font-roboto bg-slate-50/[0.1] h-auto text-center text-white border-none rounded-2xl text-xl cursor-pointer transition-all duration 300ms hover:bg-slate-50/[0.2] hover:scale-105 active:bg-slate-50/[0.3] active:scale-95"
            data-key="="
            onClick={handleCalculate}
          >
            =
          </button>
        </div>
      </div>
      <div className="text-slate-100 text-center mt-8 font-share-tech-mono">
        Designed and Coded By
        <br />
        <span className="text-purple-400 leading-8 uppercase decoration-none font-bold">
          Mohamed Bouye
        </span>
      </div>
    </>
  );
};

export default Calculator;
