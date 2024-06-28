import React, { FC } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};
type PagarProps = {
  children: React.ReactNode;
  onChange: (page: number) => void;
  active: boolean;
  page: number;
  style?: React.CSSProperties;
  disabled?: boolean;
};
const pageWrapStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
// "not-allowed";
const PagarStyle: React.CSSProperties = {
  padding: "5px",
  margin: "5px",
  cursor: "pointer",
  backgroundColor: "lightgray",
  borderRadius: "5px",
  userSelect: "none",
};
const Pagar: FC<PagarProps> = ({
  children,
  onChange,
  page,
  active,
  disabled = false,
  style = {},
}) => {
  const changePage = () => {
    if (disabled) return;
    onChange(page);
  };
  Object.assign(style, PagarStyle, {
    backgroundColor: active ? "blue" : "lightgray",
    color: active ? "white" : "black",
    cursor: disabled ? "not-allowed" : "pointer",
  });
  return (
    <div style={style} onClick={changePage}>
      {children}
    </div>
  );
};
const Pagination: FC<PaginationProps> = (props) => {
  const { currentPage, totalPages, setCurrentPage } = props;
  const pages: React.ReactElement<PagarProps>[] = [];
  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  const nextClick = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevClick = () => {
    setCurrentPage(currentPage - 1);
  };
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagar
          page={i}
          onChange={changePage}
          key={i}
          active={currentPage === i}
        >
          {i}
        </Pagar>
      );
    }
  } else {
    // [1, ...., 5, 6, 7, 8, 9, 10, ...., 20]
    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...., 20]
    // [1, ...., 15, 16, 17, 18, 19, 20]
    const cacheNum = 2;
    let left = currentPage - cacheNum;
    let right = currentPage + cacheNum;
    left = Math.max(1, left);
    right = Math.min(totalPages, right);
    // 正常需要满足 2 * cacheNum + 1
    if (currentPage - 1 <= cacheNum) {
      right = 1 + 2 * cacheNum;
    }
    if (totalPages - currentPage <= cacheNum) {
      left = totalPages - 2 * cacheNum;
    }
    for (let i = left; i <= right; i++) {
      pages.push(
        <Pagar
          page={i}
          onChange={changePage}
          key={i}
          active={currentPage === i}
        >
          {i}
        </Pagar>
      );
    }
    // 左边大于
    if (currentPage >= 2 * cacheNum + 1 && currentPage !== 3) {
      pages[0] = React.cloneElement<any>(pages[0], {
        style: {
          display: cacheNum === 2 ? "block" : "none",
        },
      });
      pages.unshift(
        <Pagar
          page={1}
          onChange={changePage}
          key={1111}
          active={currentPage === 1}
        >
          ...
        </Pagar>
      );
    }
    // 右边大于
    if (
      currentPage <= totalPages - 2 * cacheNum &&
      totalPages - currentPage !== 2
    ) {
      React.cloneElement(pages[pages.length - 1], {
        style: {
          display: cacheNum === 2 ? "block" : "none",
        },
      });
      pages.push(
        <Pagar
          page={totalPages}
          onChange={changePage}
          key={3333}
          active={currentPage === totalPages}
        >
          ...
        </Pagar>
      );
    }
    if (left !== 1) {
      pages.unshift(
        <Pagar
          page={1}
          onChange={changePage}
          key={1}
          active={currentPage === 1}
        >
          1
        </Pagar>
      );
    }
    if (right !== totalPages) {
      pages.push(
        <Pagar
          page={totalPages}
          onChange={changePage}
          key={totalPages}
          active={currentPage === totalPages}
        >
          {totalPages}
        </Pagar>
      );
    }
  }
  console.log(pages);
  pages.unshift(
    <Pagar
      page={currentPage - 1}
      onChange={prevClick}
      key="prev"
      active={false}
      disabled={currentPage === 1}
    >
      {"<"}
    </Pagar>
  );
  pages.push(
    <Pagar
      page={currentPage + 1}
      onChange={nextClick}
      key="next"
      active={false}
      disabled={currentPage === totalPages}
    >
      {">"}
    </Pagar>
  );
  return <div style={pageWrapStyle}>{pages}</div>;
};

export default Pagination;
