import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Item from "./item";
type OverflowProps = {
  datas: string[];
  renderRawItem?: (item: string, index: number) => React.ReactNode;
};

const Overflow: FC<OverflowProps> = ({ datas, renderRawItem }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const chunkData = useMemo(() => {
    return datas;
  }, [datas]);
  const [wrapWidth, setWrapWidth] = useState(0);
  // 获取总width
  const [widthMap, setWidthMap] = useState(new Map());
  const displayCount = useMemo(() => {
    if (wrapRef.current) {
      let totalWidth = 0;
      let count = 0;
      for (const [, value] of widthMap) {
        totalWidth += value;
        if (totalWidth > wrapWidth) {
          break;
        }
        count++;
      }
      return count;
    }
    return 0;
  }, [widthMap, wrapRef, wrapWidth]);
  useEffect(() => {
    if (!wrapRef.current) return;
    setWrapWidth(wrapRef.current?.getBoundingClientRect().width || 0);
    const observer = new ResizeObserver(() => {
      setWrapWidth(wrapRef.current?.getBoundingClientRect().width || 0);
    });
    observer.observe(wrapRef.current);
    return () => {
      observer.disconnect();
    };
  }, [wrapRef]);
  const registerSize = useCallback((key: string, width: number) => {
    setWidthMap((prev) => {
      prev.set(key, width);
      return new Map(prev);
    });
  }, []);
  return (
    <div
      ref={wrapRef}
      style={{
        display: "flex",
        border: "1px solid red",
        maxWidth: "100%",
        position: "relative",
      }}
    >
      {chunkData.map((data, index) => (
        <Item
          registerSize={registerSize}
          key={index}
          itemKey={index + "item"}
          display={displayCount > index}
        >
          {renderRawItem ? renderRawItem(data, index) : data}
        </Item>
      ))}
    </div>
  );
};
export default Overflow;
