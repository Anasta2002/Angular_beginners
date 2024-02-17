export class StorageItem<T> {
  constructor(private key: string) {}

  save(item: T) {
    sessionStorage.setItem(this.key, JSON.stringify(item));
  }

  get(): T | null {
    const item = sessionStorage.getItem(this.key);

    if (!item) {
      console.warn(`there is no item ${this.key} in storage`);

      return null;
    }

    return JSON.parse(item) as T;
  }
}
