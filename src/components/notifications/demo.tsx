import useNotification from "./hooks/useNotification";

function App() {
  const [ api, Holder] = useNotification();
  return (
    <>
      {Holder}
      <button
        onClick={() => {
          api.open({
            message: "Notification Title",
            type: "success",
            duration: 3,
          });
        }}
      >
        Open
      </button>
    </>
  );
}
export default App;
