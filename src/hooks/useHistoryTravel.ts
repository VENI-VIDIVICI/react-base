import { useRef, useState } from "react";

interface IData<T> {
    current?: T;
    list: T[];
    feature: T[];
  }
function split<T>(step:number, list: T[]) {
    const l = list.length
    let index = step < 0 ? step + l : step - 1
    if(index >= l - 1) {
        index = l - 1
    }
    if(index < 0) {
        index = 0
    }
    return {
        before: list.slice(0, index),
        current: list[index],
        after: list.slice(index + 1)
    }
}
function useHistoryTravel<T>(initialValue?: T,) {
  const [history, setHistory] = useState<IData<T | undefined>>({
    current: initialValue,
    list: [],
    feature: [],
  });
  const initialValueRef = useRef(initialValue)
  initialValueRef.current = initialValue
  const { list, current, feature } = history;
  function reset(...params:any[]) {
    const _initValue = params.length > 0 ? params[0] : initialValueRef.current
    initialValueRef.current = _initValue
    useState({
        current: _initValue,
        list: [],
        feature: [],
      })
  }
  function updateValue(val: T) {
    const _list = [...list, current]
    // 需要设置最大值
    setHistory({
      list: _list,
      current: val,
      feature: [],
    });
  }
  function backward(step:number = 1) {
    if(list.length == 0) return
    const { after, current, before} = split<T | undefined>(step, list)
    setHistory({
        current,
        list:before,
        feature: [...after, current, ...feature]
    } )
  }
  function forward(step:number = 1) {
    if(feature.length == 0) return
    const { after, current, before} = split<T | undefined>(step, feature)
    setHistory({
        current,
        list:[...list, current, ...before],
        feature: after
    })
  }
  function go(step:number) {
    if(step > 0) {
        forward(step)
    }
    backward(Math.abs(step))
  }
  return {
    value: current,
    backLength: list.length,
    forwardLength: feature.length,
    setValue: updateValue,
    go: go,
    back: (() => {
      go(-1);
    }),
    forward: () => {
      go(1);
    },
    reset: reset,
  }
}

export default useHistoryTravel;
