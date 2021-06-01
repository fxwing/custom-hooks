import { useState, useRef, useEffect, useCallback } from "react";

export default function useStateCallback(state) {
  const [data, setData] = useState(state);
  const ref = useRef(null);

  useEffect(() => {
    ref.current && ref.current(data);
  }, [data]);

  const callback = useCallback((newData, callback) => {
    callback && (ref.current = callback);
    setData(newData);
  }, []);
  return [data, callback];
}
