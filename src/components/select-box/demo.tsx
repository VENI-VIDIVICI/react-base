import { useState } from "react";
import SelectBox from ".";

export default function SelectBoxDemo() {
    const inintialOptions = Array.from({ length: 6 }, () =>{
        return Array.from({ length: 10 }, () => {
            return false;
        })
    })
  const [options, setOptions] = useState<boolean[][]>(inintialOptions);
  return <SelectBox options={options} onChange={setOptions} />;
}
