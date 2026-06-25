# weavin-secret-egress-demo

A tiny zero-dependency Node CLI that requires a user-provided secret and reaches one public host.

## Usage

```
node cli.js
```

## Declared network egress

This tool reaches exactly one host:

- `httpbin.org`

## Required secret

This tool requires one user-provided secret, supplied as an environment variable:

- `DEMO_API_KEY` — required by the tool. It is validated locally at startup (the tool exits if it
  is missing). The secret is NEVER transmitted over the network; the request to `httpbin.org` is
  unauthenticated. (This is a safe demo of secret injection + declared-host egress.)

The secret is read from the environment at runtime; it is never committed to the repo.
