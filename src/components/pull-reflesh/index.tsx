import { FC, useEffect, useMemo, useState } from "react";

type PullRefleshProps = {
  children: React.ReactNode;
};
const PullReflesh: FC<PullRefleshProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [headStyle, setHeadStyle] = useState({ top: 0, height: 0 });
  const [dragState, setDragState] = useState({
    isDragging: false,
    startY: 0,
  });
  const pullContent = useMemo(() => {
    if (loading) {
      return <div>loading...</div>;
    }
    return <div>pull to reflesh</div>;
  }, [loading]);
  const handleTouchStart = (e: React.TouchEvent) => {
    // console.log("touch start");
    // 判断是否在顶部
    if (e.currentTarget.scrollTop !== 0) {
      return;
    }
    setLoading(true);
    setDragState({
      isDragging: true,
      startY: e.touches[0].pageY,
    });
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragState.isDragging) {
      return;
    }
    const distance = e.touches[0].pageY - dragState.startY;
    if (distance < 0) {
      return;
    }
    setHeadStyle({
      top: distance,
      height: distance,
    });
  };
  const handleTouchEnd = () => {
    console.log("touch end");
    if (!dragState.isDragging) {
      return;
    }
    setHeadStyle({
      top: 0,
      height: 0,
    });
    setLoading(false);
  };
  useEffect(() => {
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("touchend", handleTouchEnd);
    };
  });
  return (
    <div>
      <div
        onTouchCancel={handleTouchEnd}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div style={headStyle}>{pullContent}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PullReflesh;
