import React, { FC, useEffect, useMemo, useRef, useState } from "react";

interface SelectBoxProps {
  options: boolean[][];
  onChange: (value: boolean[][]) => void;
}
interface RowProps {
  row: boolean[];
  isInging: boolean[];
  setStartPositon?: (value: number) => void;
  setEndPosition?: (value: number) => void;
}
interface CellProps {
  value: boolean;
  itemKey: number;
  isInging: boolean;
  setStartPositon?: (value: number) => void;
  setEndPosition?: (value: number) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ options, onChange }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startPosition, setStartPositon] = useState([-1, -1]);
  const [endPosition, setEndPosition] = useState([-1, -1]);
  const selectInging = useMemo(() => {
    const newSelectState = options.map((row) => row.map(() => false));
    if (startPosition[0] === -1 || endPosition[0] === -1) return newSelectState;
    for (let i = startPosition[0]; i <= endPosition[0]; i++) {
      for (let j = startPosition[1]; j <= endPosition[1]; j++) {
        newSelectState[i][j] = true;
      }
    }
    return newSelectState;
  }, [startPosition, endPosition, options]);
  const changeState = () => {
    if (startPosition[0] === -1 || endPosition[0] === -1) return;
    for(let i = startPosition[0]; i <= endPosition[0]; i++) {
        for(let j = startPosition[1]; j <= endPosition[1]; j++) {
            options[i][j] = !options[i][j];
        }
    }
    onChange(options);    
    setEndPosition([-1, -1]);
    setStartPositon([-1, -1]);
    setIsMouseDown(false);
  }
  const handle = useRef(changeState)
  handle.current = changeState
  useEffect(() => {
    const eventListem = () => handle.current()
    window.addEventListener("mouseup", eventListem)
    return () => {
        window.removeEventListener("mouseup", eventListem)
    }
  }, [])
  if (!options) return null;
  return (
    <div>
      {options.map((row, index) => (
        <Row
          key={index}
          row={row}
          setStartPositon={(value) => {
            setIsMouseDown(true);
            setStartPositon([index, value]);
          }}
          isInging={selectInging[index]}
          setEndPosition={(value) => {
            if (!isMouseDown) return;
            setEndPosition([index, value]);
          }}
        />
      ))}
    </div>
  );
};
const Cell: FC<CellProps> = ({
  value,
  itemKey,
  setStartPositon,
  setEndPosition,
  isInging,
}) => {
  // mouseDown, and mouseMove are not used\
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const onMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    if (setStartPositon) {
      setStartPositon(itemKey);
    }
  };
  const onMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    if (setEndPosition) {
      setEndPosition(itemKey);
    }
  };
  const style: React.CSSProperties = {
    border: "1px solid black",
    width: "50px",
    height: "50px",
    display: "inline-block",
    textAlign: "center",
    lineHeight: "50px",
  };
  if (isInging) {
    style.backgroundColor = "gray";
  } else if (value) {
    style.backgroundColor = "blue";
  }
  return (
    <div
      ref={checkBoxRef}
      style={style}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    />
  );
};
const Row: FC<RowProps> = ({ row, isInging, ...rest }) => {
  return (
    <div>
      {row.map((value, index) => (
        <Cell
          key={index}
          value={value}
          itemKey={index}
          {...rest}
          isInging={isInging[index]}
        />
      ))}
    </div>
  );
};
export default SelectBox;
