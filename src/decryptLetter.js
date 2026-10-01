import encrypted from './letter.enc.json'

const fromB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0))

// Resolves to the letter text, or rejects if the password is wrong.
export async function decryptLetter(password) {
  const enc = new TextEncoder()
  const base = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: fromB64(encrypted.salt), iterations: 250000, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  )
  const data = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(encrypted.iv) }, key, fromB64(encrypted.data))
  return new TextDecoder().decode(data)
}
