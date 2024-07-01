import { FC, ReactNode, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import OrderContext from "./content";
type contailType = HTMLElement | string | null | undefined;
interface PortalProps {
  target?: contailType;
  children: ReactNode;
  show: boolean;
}
const Portal: FC<PortalProps> = ({ children, target, show }) => {
  const getContainer = (container: contailType) => {
    if (container == null) {
      return document.body;
    }
    if (typeof container === "string") {
      return document.querySelector(container) ?? document.body;
    }
    return container;
  };
  const [container, setContainer] = useState<Element>(getContainer(target));
  useLayoutEffect(() => {
    setContainer(getContainer(target));
  });
  if (show) {
    return null;
  }
  return (
    <>
      <OrderContext.Provider value={null}>
        {createPortal(children, container)}
      </OrderContext.Provider>
    </>
  );
};

export default Portal;
