import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  private getFromStorage(
    type: 'session' | 'local',
    key: string,
    defaultValue: any = null
  ): any {
    const value =
      type === 'session'
        ? sessionStorage.getItem(key)
        : localStorage.getItem(key);
    if (value === null) {
      return defaultValue;
    }
    try {
      return JSON.parse(value);
    } catch (err) {
      return defaultValue;
    }
  }

  getFromSessionStorage(key: string, defaultValue: any = null): any {
    return this.getFromStorage('session', key, defaultValue);
  }

  getFromLocalStorage(key: string, defaultValue: any = null): any {
    return this.getFromStorage('local', key, defaultValue);
  }

  storeInSessionStorage(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  storeInLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeFromSessionStorage(key: string): void {
    sessionStorage.removeItem(key);
  }

  removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  getFromSessionOrLocalStorage(key: string, defaultValue: any = null): any {
    return (
      this.getFromSessionStorage(key) ||
      this.getFromLocalStorage(key) ||
      defaultValue
    );
  }

  removeFromSessionAndLocalStorage(key: string): void {
    this.removeFromSessionStorage(key);
    this.removeFromLocalStorage(key);
  }
}
