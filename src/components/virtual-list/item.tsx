import { useEffect, useRef } from "react";

interface ItemProps {
  index: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
  regiserHeight: (index: number, height: number) => void;
}

export const Item: React.FC<ItemProps> = ({ index, style, children, regiserHeight }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  // 抛出当前 ref
  useEffect(() => {
    if(!itemRef.current) return
    const {height} = itemRef.current.getBoundingClientRect()
    regiserHeight(index, height)
  }, [index, regiserHeight]);
  return (
    <div ref={itemRef} style={style}>
      {children}
    </div>
  );
};
