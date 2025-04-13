"use client";

import { type Dispatch, type Reducer, useEffect, useReducer } from "react";

export function useLocalStorage<T, U>(
  key: string,
  initialValue: T,
  reducer: Reducer<T, U>,
): [T, Dispatch<U>] {
  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        dispatch({
          type: "init",
          payload: JSON.parse(storedValue),
        } as U);
      }
    }
  }, [key]);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, dispatch];
}
