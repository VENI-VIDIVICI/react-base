import { FC } from "react";
interface KeyWordsProps {
  value: string;
  children: React.ReactNode;
  render?: (value: string) => React.ReactNode;
}

interface HighlightProps extends KeyWordsProps {
  children: string;
}
const Highlight: FC<HighlightProps> = (props) => {
  //  value 为加亮的关键词 children 为其它文本
  const { value, children } = props;
  const content = props.render ? (
    props.render(value)
  ) : (
    <span style={{ backgroundColor: "yellow" }}>{value}</span>
  );
  return (
    <span>
      {children}

      {content}
    </span>
  );
};

const KeyWords: FC<KeyWordsProps> = (props) => {
  const { value, children, render } = props;
  if (typeof children !== "string") {
    return <>{children}</>;
  }
  const regex = new RegExp(value, "gi");
  const match = children.match(regex);
  if (!match) {
    return <>{children}</>;
  }
  const parts = children.split(regex);
  return (
    <>
      {parts.map((part, index) => (
        <Highlight render={render} key={index} value={match[index]}>
          {part}
        </Highlight>
      ))}
    </>
  );
};

export default KeyWords;
