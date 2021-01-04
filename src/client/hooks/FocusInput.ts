import { useRef } from "react";

const useFocusInput = (): [
  React.RefObject<HTMLInputElement>,
  (select?: boolean) => void
] => {
  const htmlElRef = useRef<HTMLInputElement>(null);

  const setFocus = (select?: boolean) => {
    if (!htmlElRef.current) return;
    if (select) return htmlElRef.current.select();
    console.log("focus goes here");
    htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

export default useFocusInput;
