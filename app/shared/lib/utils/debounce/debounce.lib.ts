export const debounce = <T extends unknown[]>(
  cb: (...args: T) => void,
  ms = 500,
) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, ms);
  };
};
