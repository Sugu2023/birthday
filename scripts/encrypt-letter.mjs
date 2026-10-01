// Encrypts letter.txt with a password into src/letter.enc.json (safe to commit).
// Usage: npm run encrypt-letter -- "your password"
import { readFileSync, writeFileSync } from 'node:fs'
import { webcrypto as crypto } from 'node:crypto'

const password = process.argv[2]
if (!password) {
  console.error('Usage: npm run encrypt-letter -- "your password"')
  process.exit(1)
}

const text = readFileSync(new URL('../letter.txt', import.meta.url), 'utf8')
const enc = new TextEncoder()
const salt = crypto.getRandomValues(new Uint8Array(16))
const iv = crypto.getRandomValues(new Uint8Array(12))
const base = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: 250000, hash: 'SHA-256' },
  base,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt']
)
const data = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(text))
const b64 = (b) => Buffer.from(b).toString('base64')

writeFileSync(
  new URL('../src/letter.enc.json', import.meta.url),
  JSON.stringify({ salt: b64(salt), iv: b64(iv), data: b64(data) }, null, 2) + '\n'
)
console.log('Letter encrypted → src/letter.enc.json')
