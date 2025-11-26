interface SecureStorageData<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

const DATA_TTL = 24 * 60 * 60 * 1000; // 24 hours

async function getSessionKey(): Promise<CryptoKey> {
  const keyData = sessionStorage.getItem('__enc_key__');

  if (keyData) {
    try {
      const jwk = JSON.parse(keyData);
      return await crypto.subtle.importKey(
        'jwk',
        jwk,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );
    } catch {
      // Generate new key if import fails
    }
  }

  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const jwk = await crypto.subtle.exportKey('jwk', key);
  sessionStorage.setItem('__enc_key__', JSON.stringify(jwk));

  return key;
}

async function encryptData(data: string): Promise<string> {
  const key = await getSessionKey();
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for AES-GCM
  const encodedData = new TextEncoder().encode(data);

  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encodedData
  );

  // IV + encrypted data as base64
  const combined = new Uint8Array(iv.length + encryptedData.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encryptedData), iv.length);

  return btoa(String.fromCharCode(...combined));
}

async function decryptData(encryptedStr: string): Promise<string> {
  const key = await getSessionKey();
  const combined = Uint8Array.from(atob(encryptedStr), c => c.charCodeAt(0));

  const iv = combined.slice(0, 12);
  const encryptedData = combined.slice(12);

  const decryptedData = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encryptedData
  );

  return new TextDecoder().decode(decryptedData);
}

export async function setSecureItem<T>(key: string, value: T): Promise<void> {
  try {
    const now = Date.now();
    const storageData: SecureStorageData<T> = {
      data: value,
      timestamp: now,
      expiresAt: now + DATA_TTL,
    };

    const jsonString = JSON.stringify(storageData);
    const encrypted = await encryptData(jsonString);

    sessionStorage.setItem(key, encrypted);
  } catch (error) {
    console.error('Failed to securely store data:', error);
    throw new Error('Storage encryption failed');
  }
}

export async function getSecureItem<T>(key: string): Promise<T | null> {
  try {
    const encrypted = sessionStorage.getItem(key);
    if (!encrypted) {
      return null;
    }

    const decrypted = await decryptData(encrypted);
    const storageData: SecureStorageData<T> = JSON.parse(decrypted);

    if (Date.now() > storageData.expiresAt) {
      sessionStorage.removeItem(key);
      return null;
    }

    return storageData.data;
  } catch (error) {
    console.error('Failed to retrieve secure data:', error);
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

