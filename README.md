## TODO

1. logtail is not configure

## CMDs

To generate better-auth tables schema

```bash
npx @better-auth/cli@latest generate --output src/lib/database/schemas/auth-schemas.ts --config src/lib/auth/index.ts --yes
```

## Configuration

1. Add this as snippet

```tsx
log.error(e instanceof Error ? e.message : String(e), {
  stack: e instanceof Error ? e.stack : undefined,
});
```
