# Vendored: @tinymanorg/tinyman-js-sdk 5.1.5

This folder holds the unmodified compiled SDK (`dist/`) and `LICENSE` (MIT, Copyright (c) 2022 Tinyman) from the npm package `@tinymanorg/tinyman-js-sdk@5.1.5`.

- Source: https://registry.npmjs.org/@tinymanorg/tinyman-js-sdk/-/tinyman-js-sdk-5.1.5.tgz
- Integrity: `sha512-` value published for 5.1.5 on the npm registry (checked when copied)
- Upstream: https://github.com/tinymanorg/tinyman-js-sdk

## Why it is vendored

The npm package lists `uuid@^10.0.0` as a runtime dependency. `uuid@10` is deprecated and falls in the range of GHSA-w5hq-g745-h8pq / CVE-2026-41907, so Socket blocks installs of any package that depends on it. The SDK never loads that package: `dist/index.js` is a single bundle with uuid's v4 code compiled in, and the vulnerable v3/v5/v6 functions are not part of it.

Shipping the bundle here removes `uuid` (and the unused `multiformats`) from this package's install tree. The bundle loads only `algosdk`, `base64-js` and Node's `crypto` at runtime; `algosdk` and `base64-js` are dependencies of this package.

`package.json` here only marks the folder as CommonJS (this package is ESM) and points to the entry file and types.

## Updating

1. Check a new release for its runtime requires and its `uuid` range. If upstream has dropped `uuid@10`, go back to the npm dependency instead.
2. Download it with `socket npm pack @tinymanorg/tinyman-js-sdk@<version>` and compare its `sha512` with the registry's `dist.integrity`.
3. Replace `dist/` and `LICENSE`, set `version` in `package.json` and in this file, and add any new runtime require to this package's dependencies.
4. Typecheck, run the unit tests, and call a Tinyman tool against testnet.
