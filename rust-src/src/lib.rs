mod utils;

use std::mem;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn fingerprint32(input: &[u8]) -> u32 {
    utils::set_panic_hook();
    farmhash::fingerprint32(&input)
}

#[wasm_bindgen]
pub fn fingerprint64(input: &[u8]) -> u64 {
    utils::set_panic_hook();
    farmhash::fingerprint64(&input)
}

#[wasm_bindgen]
pub fn bigquery_fingerprint(input: &[u8]) -> i64 {
    utils::set_panic_hook();
    let fingerprint = farmhash::fingerprint64(&input);
    unsafe { mem::transmute(fingerprint) }
}

#[wasm_bindgen]
pub fn hash32(input: &[u8]) -> u32 {
    utils::set_panic_hook();
    farmhash::hash32(&input)
}

#[wasm_bindgen]
pub fn hash32_with_seed(input: &[u8], seed: u32) -> u32 {
    utils::set_panic_hook();
    farmhash::hash32_with_seed(&input, seed)
}

#[wasm_bindgen]
pub fn hash64(input: &[u8]) -> u64 {
    utils::set_panic_hook();
    farmhash::hash64(&input)
}

#[wasm_bindgen]
pub fn hash64_with_seed(input: &[u8], seed: u64) -> u64 {
    utils::set_panic_hook();
    farmhash::hash64_with_seed(&input, seed)
}
