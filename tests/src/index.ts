import * as farmhash from 'farmhash-modern';

export function fingerprint32(str: string) {
  return farmhash.fingerprint32(str);
}
