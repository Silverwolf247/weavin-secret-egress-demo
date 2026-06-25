# weavin-secret-egress-demo

A tiny zero-dependency Node CLI that calls an **authenticated** public API.

## Usage

```
node cli.js
```

## Declared network egress

This tool reaches exactly one host:

- `httpbin.org`

## Required secret

This tool requires one user-provided secret, supplied as an environment variable:

- `DEMO_API_KEY` — sent as an HTTP `Authorization: Bearer` token to authenticate the request to `httpbin.org`.

The secret is read from the environment at runtime; it is never committed to the repo.
