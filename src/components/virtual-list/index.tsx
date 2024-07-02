import React, { FC, useEffect, useMemo, useState } from "react";
import { Item } from "./item";
type Item = {
  item: number;
};
type VirtualListProps = {
  height: number;
  children: (item: Item) => React.ReactNode;
  data: Array<number>;
  itemHeight: number;
};
const VirtualList: FC<VirtualListProps> = (props) => {
  const { data, itemHeight, height } = props;
  const innerRef = React.useRef<HTMLDivElement>(null);
  const componentRef = React.useRef<HTMLDivElement>(null);
  const [heights] = useState(new Map<string, number>());
  const [offsetTop, setOffsetTop] = useState(0);
  // 总高度 顶部占位高度 开始索引 结束索引
  const { totalHeight, startIndex, endIndex, topHeight } = useMemo(() => {
    let startIndex = -1;
    let endIndex = 0;
    let totalHeight = 0;
    let topHeight = 0;
    const l = data.length;
    for (let i = 0; i <= l; i++) {
      const calcHeight = heights.get(`${i}`) || itemHeight;
      const total = totalHeight + calcHeight;
      if (total >= offsetTop && startIndex === -1) {
        startIndex = i;
        topHeight = totalHeight;
      }
      if (total >= offsetTop + height && endIndex === 0) {
        endIndex = Math.min(i + 5, l);
      }
      totalHeight = total;
    }
    return {
      totalHeight,
      startIndex,
      endIndex: endIndex,
      topHeight,
    };
  }, [offsetTop, data, itemHeight, heights, height]);
  useEffect(() => {
    if (!innerRef.current) return;
    function handleWheel(e: WheelEvent) {
      // 不能超过最大高度， 不能小于0
      let total = offsetTop + e.deltaY;
      if (total < 0) {
        total = 0;
      } else if (total > totalHeight - height) {
        total = totalHeight - height;
      }
      setOffsetTop(total);
    }
    innerRef.current.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      if(innerRef.current)
      innerRef.current.removeEventListener("wheel", handleWheel);
    };
  });
  useEffect(() => {
    if (!componentRef.current) return;
    componentRef.current.scrollTop = topHeight;
  }, [topHeight]);
  const filterData = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [startIndex, endIndex, data]);
  const style: React.CSSProperties = {
    height,
    overflow: "hidden",
    position: "relative",
    width: "100px",
  };
  const innerStyle: React.CSSProperties = {
    transform: `translateY(${topHeight}px)`,
    willChange: "transform",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
  };
  const regiserHeight = (index: number, height: number) => {
    heights.set(`${index}`, height);
  }
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div style={style} ref={componentRef}>
        <div
          ref={innerRef}
          style={{
            height: totalHeight,
            backgroundColor: "red",
            position: "relative",
          }}
        >
          <div style={innerStyle}>
            {filterData.map((item) => {
              return (
                <Item key={item} index={item} regiserHeight={regiserHeight}>
                  {props.children({ item })}
                </Item>
              );
            })}
          </div>
        </div>
      </div>
      <div
        style={{
          height: height,
          width: "5px",
          overflow: "hidden",
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            height: (height * height) / totalHeight,
            width: "5px",
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "absolute",
            top: (offsetTop * height) / totalHeight,
          }}
        ></div>
      </div>
    </div>
  );
};

export default VirtualList;
