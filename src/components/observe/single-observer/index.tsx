import React, { useEffect } from "react";
import { ResizeObserveProps } from "..";


interface SingleObserver  extends ResizeObserveProps {
    children: React.ReactNode | ((ref: React.RefObject<any>) => React.ReactElement);
}

function SingleObserver(props: SingleObserver) {
    const { children } = props
    const elementRef = React.useRef<Element>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    // Children
    const isRenderProps = typeof children === "function";
    // 类似于插槽的实现
    const mergedChildren = isRenderProps ? children(elementRef) : children;
    const sizeRef = React.useRef({ width: -1, height: -1, offsetWidth: -1, offsetHeight: -1 });
    useEffect(() => {
        const currentElement = elementRef.current;
        if(!currentElement) return;
        observe
    }, [elementRef.current])
    return (
        <div ref={wrapperRef}>
            {mergedChildren}
        </div>
    )

}

export default SingleObserver;