import React from "react";
import { toArray } from "../utils";
export interface ResizeObserveProps {
    children: React.ReactNode | ((ref: React.RefObject<any>) => React.ReactElement);
}

function ResizeObserve(props: ResizeObserveProps) {
  const childrenNodes =
    typeof props.children === "function"
      ? [props.children]
      : toArray(props.children);
  return  childrenNodes.map((child, index) => {
    return <div key={index}>{child}</div>;
  })
}

export default ResizeObserve;
