import React from 'react';
// import { isFragment } from 'react-is';

export interface Option {
  keepEmpty?: boolean;
}
function isFragment(child: any) {
    return child && child.type && child.type.$$typeof === Symbol.for('react.fragment');
}
export  function toArray(
  children: React.ReactNode,
  option: Option = {},
): React.ReactElement[] {
  let ret: React.ReactElement[] = [];

  React.Children.forEach(children, (child: any | any[]) => {
    if ((child == undefined) && !option.keepEmpty) {
      return;
    }

    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    } else if (isFragment(child) && child.props) {
      ret = ret.concat(toArray(child.props.children, option));
    } else {
      ret.push(child);
    }
  });

  return ret;
}