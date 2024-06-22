import { ReactNode, useMemo, useRef } from "react";
import "./styles.css";

type Directions = "left" | "right" | "top" | "bottom";
interface DrawerProps {
  open: boolean;
  onClose: () => void;
  direction?: Directions;
  children: React.ReactNode | (() => React.ReactNode);
  preRender?: boolean;
}
const getStyleByDirection = (direction: Directions): React.CSSProperties => {
  switch (direction) {
    case "left":
      return {
        left: 0,
        top: 0,
        height: "100vh",
        transform: "translate3d(-100%, 0, 0)",
      };
    case "right":
      return {
        right: 0,
        top: 0,
        height: "100vh",
        width: "100px",
        transform: "translate3d(100%, 0, 0)",
      };
    case "top":
      return {
        left: 0,
        top: 0,
        width: "100vw",
        transform: "translate3d(0, -100%, 0)",
      };
    case "bottom":
      return {
        left: 0,
        bottom: 0,
        width: "100vw",
        transform: "translate3d(0, 100%, 0)",
      };
  }
};

const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  direction = "right",
  children,
  preRender = false,
}) => {
  const dirctionStyle = getStyleByDirection(direction);
  const cache = useRef<ReactNode>();
  const content = useMemo(() => {
    const isFn = typeof children === "function";
    // 我有缓存
    if (cache.current) {
      console.log("cache", cache.current);
      return cache.current;
    }
    if (open) {
      cache.current = isFn ? children() : children;
    }
    if (preRender) {
        return isFn ? children() : children;
      }
    return cache.current;
  }, [preRender, children, open]);
  return (
    <div className={`${open ? "checked EZDrawer" : "EZDrawer"} `}>
      <div className={`EZDrawer__container`} style={dirctionStyle}>
        {content}
      </div>
      <div className="EZDrawer__overlay" onClick={onClose}></div>
    </div>
  );
};

export default Drawer;
