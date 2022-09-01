import React, {
  useEffect,
  useReducer,
  useState,
  useRef,
  createContext,
} from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { FaStar } from "react-icons/fa";
import App from "./App.js";
import Account from "./pages/account.js";
import Login from "./pages/login.js";
import Tokens from "./pages/tokens.js";
import Register from "./pages/register.js";
import { useInput } from "./hooks/useInput.js";
import { configureStore } from "./redux/store.js";

export const TreesContext = createContext();
const trees = [
  { id: "1", value: "T1" },
  { id: "2", value: "T2" },
  { id: "3", value: "T3" },
  { id: "4", value: "T4" },
];

const initialValue = {
  message: "Hello!",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "YELL":
      return {
        message: `Hey!, I just said ${state.message}`,
      };
    case "WHISPERING":
      return {
        message: "Execuse me!",
      };
  }
};

function Reducer() {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <>
      <p>{state.message}</p>
      <button
        onClick={() => {
          dispatch({ type: "YELL" });
        }}
      >
        YELL
      </button>
      <button
        onClick={() => {
          dispatch({ type: "WHISPERING" });
        }}
      >
        WHISPERING
      </button>
    </>
  );
}

function UseRef() {
  const sound = useRef();
  const color = useRef();

  const submit = (e) => {
    e.preventDefault();
    const soundValue = sound.current.value;
    const colorValue = color.current.value;
    alert(`${soundValue} Sounds like ${colorValue}`);

    sound.current.value = "";
    color.current.value = "";
  };

  return (
    <form onSubmit={submit}>
      <input ref={sound} type="text" placeholder="Enter Sound ..." />
      <input ref={color} type="color" />
      <button>Add Color</button>
    </form>
  );
}

function Controlled() {
  const [sound, resetSound] = useInput("");
  const [color, resetColor] = useInput("#000000");

  const submit = (e) => {
    e.preventDefault();
    alert(`${sound.value} Sounds like ${color.value}`);
    resetSound();
    resetColor();
  };

  return (
    <form onSubmit={submit}>
      <input {...sound} type="text" placeholder="Enter Sound ..." />
      <input {...color} type="color" />
      <button>Add Color</button>
    </form>
  );
}

function AppNew() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users")
      .then((response) => response.json())
      .then((users) => setData(users));
  }, []);

  if (data) {
    return (
      <ul>
        {data.map((value, index) => {
          return <li key={index}>{value.login}</li>;
        })}
      </ul>
    );
  }

  return <p>No user found !</p>;
}

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />,
  </Provider>
);
