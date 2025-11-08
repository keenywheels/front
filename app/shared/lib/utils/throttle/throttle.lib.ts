import type { MapKey, Timer } from './throttle.types';

export const throttle = <T extends unknown[]>(
  cb: (...args: T) => void,
  ms = 500,
) => {
  let timer: Timer;

  return (...args: T) => {
    if (!timer) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = undefined;
        cb(...args);
      }, ms);
    }
  };
};

export const throttleMap = <T extends unknown[]>(
  cb: (...args: T) => void,
  ms = 500,
) => {
  const timers = new Map<MapKey, Timer>();

  return (key: MapKey, ...args: T) => {
    if (!timers.has(key)) {
      timers.set(key, undefined);
    }

    if (!timers.get(key)) {
      const timer = setTimeout(() => {
        clearTimeout(timers.get(key));
        timers.delete(key);
        cb(...args);
      }, ms);

      timers.set(key, timer);
    }
  };
};
