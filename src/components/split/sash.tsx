import { FC, useState } from "react";

type SashProps = {
  style?: React.CSSProperties;
  onDragStart?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDragEnd?: (e: MouseEvent) => void;
  onDrag?: (e: MouseEvent) => void;
};
const Sash: FC<SashProps> = ({ style, onDrag, onDragEnd, onDragStart }) => {
  const [, setIsDragging] = useState(false);
  const handleMouseMove = (e: MouseEvent) => {
    onDrag && onDrag(e);
  };
  const handleMouseUp = (e: MouseEvent) => {
    setIsDragging(false);
    onDragEnd && onDragEnd(e);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };
  return (
    <div
      className="react-sash"
      style={style}
      role="Resizer"
      onMouseDown={(e) => {
        setIsDragging(true);
        onDragStart && onDragStart(e);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
      }}
    ></div>
  );
};

export default Sash;
