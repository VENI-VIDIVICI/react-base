import { FC, useCallback, useEffect, useReducer, useRef } from "react";
import "./index.css";
type TypewriterProps = {
  words: string[];
};
interface State {
  speed: number;
  text: string;
  count: number;
}
export type Action =
  | { type: "DELAY"; payload: number }
  | { type: "TYPE"; payload: string; speed: number }
  | { type: "DELETE"; payload: string; speed: number }
  | { type: "COUNT" };
function reduce(state: State, action: Action): State {
  switch (action.type) {
    case "DELAY":
      return { ...state, speed: action.payload };
    case "TYPE":
      // 增加
      return {
        ...state,
        text: action.payload.substring(0, state.text.length + 1),
        speed: action.speed,
      };
    case "DELETE":
      // 减少
      return { ...state, text: state.text.slice(0, -1), speed: action.speed };
    case "COUNT":
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
function Cursor() {
  return <span className="blinkingCursor blinking">|</span>;
}
function useTypewriter(words: string[], typeSpeed = 80, deleteSpeed = 50) {
  const [{ speed, text, count }, dispatch] = useReducer(reduce, {
    speed: typeSpeed,
    text: "",
    count: 0,
  });
  const isDelete = useRef(false);
  const updateText = useCallback(() => {
    const idx = count % words.length;
    const word = words[idx];
    if (!isDelete.current) {
      if (text === word) {
        isDelete.current = true;
        dispatch({ type: "DELAY", payload: 1000 });
      } else {
        dispatch({ type: "TYPE", payload: word, speed: typeSpeed });
      }
    } else {
      if (text === "") {
        isDelete.current = false;
        dispatch({ type: "COUNT" });
      } else {
        dispatch({ type: "DELETE", payload: word, speed: deleteSpeed });
      }
    }
  }, [words, typeSpeed, text, count, dispatch, deleteSpeed]);
  useEffect(() => {
    let start: number;
    let timeId: number;
    function tick(now: number) {
      console.log({ speed });
      if (!start) {
        start = now;
      }
      if (now - start > speed) {
        updateText();
        start = now;
      }
      timeId = requestAnimationFrame(tick);
    }
    timeId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(timeId);
    };
  }, [updateText, speed]);
  return text;
}
const Typewriter: FC<TypewriterProps> = ({ words }) => {
  const text = useTypewriter(words);
  return (
    <div>
      <span>{text}</span>
      <Cursor></Cursor>
    </div>
  );
};

export default Typewriter;
