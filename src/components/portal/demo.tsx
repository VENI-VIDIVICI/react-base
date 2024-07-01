import { useRef, useState } from "react";
import Portal from ".";

function App() {
  const [show, setShow] = useState(false);
  const [isSetTarget, setIsSetTarget] = useState(false);
  const target = useRef<HTMLDivElement>(null);
  const targetContainer = isSetTarget ? null : target.current;
  return (
    <div>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        changeShow
      </button>
      <button onClick={() => {
        setIsSetTarget(!isSetTarget);
      }}>changeTarget</button>
      <div ref={target}></div>
      <Portal show={show} target={targetContainer}>
        <p>Portal content</p>
      </Portal>
    </div>
  );
}
export default App;
