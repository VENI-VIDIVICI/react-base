import React, { FC, useCallback, useEffect, useRef } from "react";
type ItemProps = {
  children: React.ReactNode;
  itemKey: string;
  registerSize: (key: string, width: number) => void;
  display?: boolean;
};
const Item: FC<ItemProps> = ({
  itemKey,
  children,
  registerSize,
  display = true,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const handleResize = useCallback(() => {
    if (wrapRef.current) {
      const width = wrapRef.current?.getBoundingClientRect().width;
      registerSize(itemKey, width || 0);
    }
  }, [wrapRef, itemKey, registerSize]);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
  const style: React.CSSProperties = {
    height: display ? "auto" : 0,
    opacity: display ? 1 : 0,
    position: display ? "relative" : "absolute",
  };
  return (
    <div ref={wrapRef} style={style} key={itemKey}>
      {children}
    </div>
  );
};
export default Item;
