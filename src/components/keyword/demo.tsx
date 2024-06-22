import { useState } from "react";
import KeyWord from ".";

function App() {
  const [value, setValue] = useState(
    "React is a JavaScript library for building user interfaces"
  );
  return (
    <div>
      <input
        type="text"
        value={value}
        onInput={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
      <KeyWord value="react">{value}</KeyWord>
    </div>
  );
}

export default App;
