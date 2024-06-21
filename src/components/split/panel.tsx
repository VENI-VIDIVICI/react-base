import { FC } from "react";

type PanelProps = {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};
const Panel: FC<PanelProps> = ({ style, children }) => {
  return <div className="react-split-pane" style={{ display: "flex", ...style }}>
    {
        children
    }
  </div>;
};

export default Panel;
