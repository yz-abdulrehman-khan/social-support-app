interface StorageData<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

const DATA_TTL = 24 * 60 * 60 * 1000; // 24 hours

export function setSecureItem<T>(key: string, value: T): void {
  const now = Date.now();
  const storageData: StorageData<T> = {
    data: value,
    timestamp: now,
    expiresAt: now + DATA_TTL,
  };

  sessionStorage.setItem(key, JSON.stringify(storageData));
}

export function getSecureItem<T>(key: string): T | null {
  try {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return null;
    }

    const storageData: StorageData<T> = JSON.parse(stored);

    if (Date.now() > storageData.expiresAt) {
      sessionStorage.removeItem(key);
      return null;
    }

    return storageData.data;
  } catch {
    sessionStorage.removeItem(key);
    return null;
  }
}

export function removeSecureItem(key: string): void {
  sessionStorage.removeItem(key);
}

export function clearSecureStorage(): void {
  sessionStorage.clear();
}
