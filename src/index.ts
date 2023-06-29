import * as farmhash from '../bin/nodejs/farmhash_modern.js';

function asBuffer(input: Uint8Array | string): Uint8Array {
  if (typeof input === 'string') {
    return new TextEncoder().encode(input);
  }
  if (input instanceof Uint8Array) {
    return input;
  }
  throw new Error('Expected input to be a string or Uint8Array');
}
function asUnsigned32BitNumber(input: number) {
  if (input === input >>> 0) {
    return input;
  }
  throw new Error(
    `Expected input to be a 32-bit unsigned integer, got ${input}`,
  );
}
function asUnsigned64BitNumber(input: bigint) {
  if (
    typeof input === 'bigint' &&
    input >= 0 &&
    input <= 18446744073709551615n
  ) {
    return input;
  }
  throw new Error(
    `Expected input to be a 64-bit unsigned integer, got ${input}`,
  );
}

/**
 * Create a new farmhash based u32 for a string or an array of bytes.
 * Fingerprint value should be portable and stable across library versions
 * and platforms.
 */
export function fingerprint32(input: string | Uint8Array): number {
  return farmhash.fingerprint32(asBuffer(input));
}

/**
 * Create a new farmhash based u64 for a string or an array of bytes.
 * Fingerprint value should be portable and stable across library versions
 * and platforms.
 */
export function fingerprint64(input: string | Uint8Array): bigint {
  return farmhash.fingerprint64(asBuffer(input));
}

/**
 * Create a new farmhash based i64 for a string or an array of bytes.
 * Fingerprint value should be portable and stable across library versions
 * and platforms.
 *
 * This matches the format used by BigQuery's FARM_FINGERPRINT function.
 */
export function bigqueryFingerprint(input: string | Uint8Array): bigint {
  return farmhash.bigquery_fingerprint(asBuffer(input));
}

/**
 * Create a new farmhash based u32 for an array of bytes. Hash value may
 * vary with library version.
 */
export function hash32(input: string | Uint8Array): number {
  return farmhash.hash32(asBuffer(input));
}

/**
 * Create a new farmhash based u32 for an array of bytes with a given seed.
 * Hash value may vary with library version.
 */
export function hash32WithSeed(
  input: string | Uint8Array,
  seed: number,
): number {
  return farmhash.hash32_with_seed(
    asBuffer(input),
    asUnsigned32BitNumber(seed),
  );
}

/**
 * Create a new farmhash based u64 for an array of bytes. Hash value may
 * vary with library version.
 */
export function hash64(input: string | Uint8Array): bigint {
  return farmhash.hash64(asBuffer(input));
}

/**
 * Create a new farmhash based u64 for an array of bytes with a given seed.
 * Hash value may vary with library version.
 */
export function hash64WithSeed(
  input: string | Uint8Array,
  seed: bigint,
): bigint {
  return farmhash.hash64_with_seed(
    asBuffer(input),
    asUnsigned64BitNumber(seed),
  );
}
