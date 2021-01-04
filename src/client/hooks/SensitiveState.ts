import { useState, useEffect, Dispatch, SetStateAction } from "react";

const useSensitiveState = <T>(
  baseValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(baseValue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setValue(baseValue), [JSON.stringify(baseValue)]);

  return [value, setValue];
};

export default useSensitiveState;
