import type { DefaultValue, Key } from './local-storage.types';

export class LocalStorage<Value = DefaultValue> {
  private readonly key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  public get = (): Value | undefined => {
    const value = localStorage.getItem(this.key);
    return value && value !== 'undefined'
      ? (JSON.parse(value) as Value)
      : undefined;
  };

  public set = (value: Value) =>
    localStorage.setItem(this.key, JSON.stringify(value));

  public clear = () => localStorage.removeItem(this.key);
}
