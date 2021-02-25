import React, {useState} from 'react';
import './App.scss';

function App() {
    const [output, setOutput] = useState("");
    const [response, setResponse] = useState("0");
    const [equal, setEqual] = useState(false);

    const subtractClick = (e) => {
        if (output === "/" || output === "+" || output === "*" || output === "-") {
            setOutput("-");
            setResponse("-");
        } else {
            if (equal) {
                setOutput(response + "-");
                setResponse("-");
                setEqual(false);
            } else {
                if (response === "*" || response === "/" || response === "+") {
                    setOutput((val) => val + "-");
                    setResponse("-");
                } else {
                    if (output[output.length -1] === "+") {
                        setOutput((val) => val.slice(0,-1) + "-");
                        setResponse("-");

                    } else if (output[output.length -1] !== "-") {
                        setOutput((val) => val + "-");
                        setResponse("-");
                    }
                }
            }
        }
    }

    const decimalClick = (e) => {
        if (response === "0" || equal) {
            setOutput("0.");
            setResponse("0.");
        }
        else {
            if (!response.includes(".")) {
                setOutput((value) => value + ".");
                setResponse((value) => value + ".");
            }
        }
    }

    const handleClick = (value) => {
        if(value === "/" || value === "*" || value === "+") {
            if (equal) {
                setOutput(response + value);
                setResponse(value);
                setEqual(false);
            }
            else {
                if (output[output.length-1] === "-") {
                    if (output[output.length-2] === "/" ||
                        output[output.length-2] === "*") {
                        setOutput((val) => val.slice(0,-2) + value);
                    } else {
                        setOutput((val) => val.slice(0,-1) + value);
                    }
                    setResponse(value);
                }
                else {
                    if (output[output.length-1] === "/" ||
                        output[output.length-1] === "*" ||
                        output[output.length-1] === "+") {
                        setOutput((val) => val.slice(0,-1) + value);
                    } else {
                        setOutput((val) => val + value);
                    }
                    setResponse(value);
                }
            }
        }
        else {
            if (equal) {
                setResponse(value);
                setOutput(value);
                setEqual(false);
            }
            else {
                (response === "0" || response === "/" || response === "*" || response === "+" || response === "-") ? setResponse(value) : setResponse((val)=> val + value);
                setOutput((val) => val + value);
            }
        }

        if (output[output.length - 1] === "=") {
            if (/[0-9.]/.test(value)) {
                setOutput(value);
            }
            else {
                setOutput(response + value);
            }
        }
    }
    const handleClear = (e) => {
        setOutput("");
        setResponse("0");
        setEqual(false);
    }
    const calculate = () => {
        if (!equal) {
            if ((response === "0" && output === "") || output === "/" || output === "+" || output === "-" || output === "*") {
                setOutput("=NAN");
                setResponse("NAN");
            } else {
                try {
                    setResponse(eval(output));
                    setOutput((val) => val + "=" + eval(output));
                } catch(e) {
                }

            }
            setEqual(true);
        }
    }


  return (
    <div className="container">
        <div className="grid">
            <div className="dis">
                <div className="output">{output}</div>
                <div id="display" className="total">{response}</div>
            </div>
            <div id="clear" onClick={handleClear} className="button AC red">AC</div>
            <div id="divide" onClick={() => handleClick("/")} className="button division">/</div>
            <div id="multiply" onClick={() => handleClick("*")} className="button times">*</div>
            <div id="seven" onClick={() => handleClick("7")} className="button seven number">7</div>
            <div id="eight" onClick={() => handleClick("8")} className="button eight number">8</div>
            <div id="nine" onClick={() => handleClick("9")} className="button nine number">9</div>
            <div id="subtract" onClick={subtractClick} className="button minus">-</div>
            <div id="four" onClick={() => handleClick("4")} className="button four number">4</div>
            <div id="five" onClick={() => handleClick("5")} className="button five number">5</div>
            <div id="six" onClick={() => handleClick("6")} className="button six number">6</div>
            <div id="add" onClick={() => handleClick("+")} className="button plus">+</div>
            <div id="one" onClick={() => handleClick("1")} className="button one number">1</div>
            <div id="two" onClick={() => handleClick("2")} className="button two number">2</div>
            <div id="three" onClick={() => handleClick("3")} className="button three number">3</div>
            <div id="equals" onClick={calculate} className="button equal blue">=</div>
            <div id="zero" onClick={() => handleClick("0")} className="button zero">0</div>
            <div id="decimal" onClick={decimalClick} className="button dot">.</div>
        </div>
    </div>
  );
}

export default App;
