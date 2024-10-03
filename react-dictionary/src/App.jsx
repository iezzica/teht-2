import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getList, setItem } from "./services/list";

function App() {
  const [alert, setAlert] = useState(false);
  const [itemInput, setItemInput] = useState("");
  const [list, setList] = useState([]);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (list.length && !alert) {
      return;
    }
    getList().then((items) => {
      if (mounted.current) {
        setList(items);
      }
    });
    return () => (mounted.current = false);
  }, [alert, list]);
  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        if (mounted.current) {
          setAlert(false);
        }
      }, 1000);
    }
  }, [alert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setItem(itemInput).then(() => {
      if (mounted.current) {
        setItemInput("");
        setAlert(true);
      }
    });
  };

  return (
    <div className="wrapper">
      <h1>Sanalista</h1>
      <ul>
        {list.map((item) => (
          <li key={item.item}>{item.item}</li>
        ))}
      </ul>
      {alert && <h2> Sanasi lisätty listaan</h2>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Sana suomeksi ja englanniksi</p>
          <input
            type="text"
            onChange={(event) => setItemInput(event.target.value)}
            value={itemInput}
          />
        </label>
        <button type="submit">Lisää sana</button>
      </form>
    </div>
  );
}

export default App;
