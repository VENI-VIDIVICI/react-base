import ResizeObserve from ".";

export default function App() {
  return (
    <ResizeObserve>
      {
        () => {
            return (
                <div>ResizeObserve</div>
            )
        }
      }
    </ResizeObserve>
  );
}
