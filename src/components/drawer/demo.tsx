import { useCallback, useState } from "react";
import Drawer from "./index";

function App() {
  const [visible, setVisible] = useState(false);
  const renderContent = useCallback(() => {
      return (
        <div>
          <h1>Drawer Content</h1>
          <p>Some content here</p>
        </div>
      );
    
  }, [])
  return (
    <>
      <Drawer
        direction={"bottom"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        {
          renderContent
        }
      </Drawer>
      <button onClick={() => setVisible(true)}>Open Drawer</button>
    </>
  );
}

export default App;
