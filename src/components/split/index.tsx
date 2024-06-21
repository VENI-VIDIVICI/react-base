import React, { FC, useMemo, useRef, useState } from "react";
import Panel from "./panel";
import Sash from "./sash";
// TODO size 
interface HTMLAttributesProps {
  style?: React.CSSProperties;
  className?: string;
}
interface SplitProps extends HTMLAttributesProps {
  sizes: number[];
  children?: React.ReactNode;
  onSizeChange: (sizes: number[]) => void;
}
const Split: FC<SplitProps> = ({ sizes, children, style, onSizeChange }) => {
  const [warpWidth] = useState(500);
  const axis = useRef({ x: 0, y: 0 });
  // width of each panel
  const paneSize = useMemo(() => {
    // 改造为px
    return sizes.map((size) => {
      return (size / 100) * warpWidth + "px";
    });
  }, [sizes, warpWidth]);
  //   left
  const panePosition = useMemo(() => {
    return sizes.map((_size, index) => {
      if (index === 0) return "0px";
      return (
        (sizes.slice(0, index).reduce((acc, cur) => acc + cur, 0) / 100) *
          warpWidth +
        "px"
      );
    });
  }, [sizes, warpWidth]);
  const onDragStart = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    axis.current = { x: e.pageX, y: e.pageY };
  };
  const onDrag = (e:MouseEvent, idx: number) => {
    const { x } = axis.current;
    let dx = e.pageX - x;
    console.log({sizes});
    // 1 位置大小 - 最小值   2  位置最大 - 位置大小
    // 向左移动   限制位置
    // 向右移动   限制大小   右边 size - distance  > 0
    const leftBorder = -warpWidth * sizes[idx] / 100;
    const rightBorder = warpWidth * (sizes[idx]) / 100;
    if(dx < leftBorder) {
        dx = leftBorder;
    }
    if(dx > rightBorder) {
        dx = rightBorder;
    }
    const distance = (dx / warpWidth) * 100;
    const newSize = sizes.map((size, idx) => {
      if (idx == 0) return size + distance;
      return size - distance;
    });
    onSizeChange(newSize);
  };
  return (
    <div style={style} className="react-split">
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;
        const isPanel = child.type === Panel;
        const panelProps = isPanel ? child.props : {};
        return (
          <Panel
            key={index}
            style={{ width: paneSize[index], left: panePosition[index] }}
            {...panelProps}
          >
            {isPanel ? panelProps.children : child}
          </Panel>
        );
      })}
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;
        if (index == 0) return null;
        return (
          <Sash
            key={index}
            style={{ left: panePosition[index] }}
            onDrag={(e) => {
              onDrag(e, index);
            }}
            onDragStart={onDragStart}
          />
        );
      })}
    </div>
  );
};

export default Split;
