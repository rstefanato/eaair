# Stack Detection & Domain-Specific Checks

## How to Detect the Stack

Analyze the diff and repository to identify the language(s) and framework(s):

1. **File extensions** in the diff: `.ts`, `.tsx`, `.py`, `.go`, `.rs`, `.java`, `.rb`, `.cs`, `.php`, etc.
2. **Import statements**: `import React`, `from fastapi`, `import "net/http"`, etc.
3. **Config files** present: `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `pom.xml`, etc.
4. **Framework markers**: `next.config`, `angular.json`, `vue.config`, `django settings`, etc.

Build a summary like: "TypeScript, React, Next.js" or "Python, FastAPI, SQLAlchemy" or "Go, standard library".

## Domain-Specific Checklist Injections

Inject the relevant checks into the `{STACK_SPECIFIC_CHECKS}` placeholder in each agent prompt.

---

### TypeScript / JavaScript

**Security:**
- `dangerouslySetInnerHTML` without sanitization
- `eval()`, `Function()`, `new Function()` usage
- Prototype pollution via unchecked object spread/merge
- Regex denial of service (ReDoS)
- `postMessage` without origin validation

**Concurrency & State:**
- Stale closures in React hooks (missing deps in useEffect/useCallback/useMemo)
- Unhandled promise rejections — missing `.catch()` or try/catch on await
- Floating promises — async calls without await
- Race conditions in React state updates (reading state after async gap)
- Event listener leaks — addEventListener without corresponding removeEventListener

**Architecture:**
- God components (React components doing too much)
- Business logic in UI components instead of hooks/services
- Prop drilling instead of context or state management
- Circular imports between modules
- Mixed concerns in API routes (validation, auth, business logic, data access all in one handler)

**Performance:**
- Missing `key` props or using array index as key in lists
- Missing `React.memo`, `useMemo`, `useCallback` where re-renders are expensive
- Importing entire libraries (`import _ from 'lodash'` instead of `import get from 'lodash/get'`)
- Synchronous operations blocking the event loop
- Large bundle imports in client-side code that could be lazy-loaded

**Logic:**
- Loose equality (`==`) instead of strict (`===`)
- Truthy/falsy bugs — `0`, `""`, `null`, `undefined` treated interchangeably
- Non-exhaustive switch on union types without TypeScript `never` check
- Optional chaining (`?.`) masking bugs by silently returning `undefined`
- `Array.sort()` without comparator (lexicographic, not numeric)

**Quality:**
- Testing implementation details (querying by class names, internal state)
- `any` type usage defeating TypeScript's value
- Missing return type annotations on exported functions
- `// @ts-ignore` or `// @ts-expect-error` without explanation
- Console.log left in production code

---

### Python

**Security:**
- `pickle.loads` on untrusted data
- `eval()` / `exec()` usage
- SQL via f-strings or string concatenation (SQLi)
- `subprocess` with `shell=True`
- `yaml.load()` without `Loader=SafeLoader`

**Concurrency & State:**
- GIL assumptions — CPU-bound threading won't parallelize
- `asyncio` mixed with synchronous blocking calls
- Shared mutable module-level state
- Missing locks on shared data structures in threaded code
- Database connection sharing across threads/coroutines

**Architecture:**
- Circular imports
- Business logic in view/route handlers (Django/FastAPI)
- God classes / god modules
- Missing dependency injection — hardcoded dependencies
- Pydantic models mixed with ORM models creating confusion

**Performance:**
- Loading entire QuerySets/tables into memory
- N+1 queries in Django ORM / SQLAlchemy (missing `select_related`/`prefetch_related`/`joinedload`)
- Synchronous I/O in async context
- Creating objects in loops that could be batch-created
- Missing database indexes for common query patterns

**Logic:**
- Mutable default arguments (`def f(x=[])`)
- Bare `except:` or `except Exception:` swallowing everything
- Late binding closures in loops
- `is` vs `==` for value comparison
- `datetime.now()` vs `datetime.utcnow()` vs timezone-aware datetimes

**Quality:**
- Missing type hints on public APIs
- Tests using `mock.patch` on implementation details
- Missing `__str__` / `__repr__` on domain objects
- Broad exception handling hiding specific failures
- Missing docstrings on public modules/classes

---

### Go

**Security:**
- SQL injection via string concatenation (use parameterized queries)
- Missing input validation on HTTP handlers
- Insecure TLS configuration
- Race conditions on shared state (missing mutex)
- Unchecked `defer` on resource cleanup

**Concurrency & State:**
- Goroutine leaks — goroutines that never terminate
- Missing `sync.WaitGroup` or channel-based coordination
- Data races — shared variables without mutex or channels (run `go vet -race`)
- Deadlocks from channel operations or mutex ordering
- Context cancellation not propagated

**Architecture:**
- Circular package dependencies
- Package doing too many things (low cohesion)
- Interface pollution — interfaces with too many methods
- Missing interfaces where concrete types create coupling
- `init()` functions with side effects

**Performance:**
- Excessive allocations in hot paths (use `sync.Pool`)
- String concatenation in loops (use `strings.Builder`)
- Missing buffered I/O (`bufio.Reader`/`bufio.Writer`)
- Unbounded goroutine spawning under load
- Large structs passed by value instead of pointer

**Logic:**
- Unchecked `err` returns (`val, _ := someFunc()`)
- `defer` in loops (defers until function exit, not loop iteration)
- Nil pointer dereference on interfaces
- Slice aliasing bugs (multiple slices sharing underlying array)
- `range` variable capture in goroutines (pre-Go 1.22)

**Quality:**
- Missing error wrapping (`fmt.Errorf("...: %w", err)`)
- Exported functions without doc comments
- Tests that only test the happy path
- Missing table-driven tests for functions with multiple cases
- `//nolint` directives without justification

---

### React (additional to TypeScript)

**Security:**
- XSS via `dangerouslySetInnerHTML`
- Storing sensitive data in localStorage/sessionStorage
- Missing CSRF tokens on form submissions

**Concurrency & State:**
- Stale closures in `useEffect` / `useCallback` — missing dependency array entries
- Race conditions in `useEffect` — component unmounts before async completes
- Missing cleanup in `useEffect` return function
- State updates on unmounted components

**Architecture:**
- God components — components over 200 lines doing multiple things
- Prop drilling more than 3 levels deep
- Business logic in components instead of custom hooks
- Missing error boundaries

**Performance:**
- Re-render cascades — parent re-renders causing unnecessary child re-renders
- Missing `useMemo` / `useCallback` for expensive computations or stable references
- Large lists without virtualization
- Images without `loading="lazy"` or proper sizing
- Missing `Suspense` boundaries for code splitting

**Logic:**
- Hook rules violations — hooks inside conditionals or loops
- Missing dependency array items causing stale state
- `useEffect` with wrong deps causing infinite loops
- Key prop issues — missing, duplicate, or unstable keys

**Quality:**
- Testing implementation details instead of behavior
- Snapshot tests without clear purpose
- Missing accessibility attributes (aria-labels, roles, alt text)
- Inline styles instead of CSS/styled-components where pattern is established

---

### Next.js (additional to React)

**Security:**
- Server actions exposed without authentication checks
- Sensitive data serialized from server to client components
- Missing middleware auth checks on protected routes

**Architecture:**
- Client components where server components would suffice (`"use client"` overuse)
- Data fetching in client components that could be server-side
- Missing loading/error boundaries
- Route handlers without proper HTTP method handling

**Performance:**
- Missing `Suspense` for streaming
- Unoptimized images (not using `next/image`)
- Missing static generation where data doesn't change often
- Client-side data fetching without caching strategy
- Large client bundles from server-only imports leaking to client

---

### General (always include)

**Security:**
- Hardcoded secrets, API keys, tokens, passwords
- Logging sensitive data (PII, credentials, tokens)
- Missing input validation at system boundaries

**Concurrency:**
- Shared mutable state without synchronization
- Operations assumed atomic that aren't

**Architecture:**
- Functions/classes doing too many things
- Tight coupling between unrelated modules

**Performance:**
- O(n^2) or worse algorithms on unbounded input
- Unbounded data loading into memory

**Logic:**
- Off-by-one errors in loops/pagination
- Missing null/empty checks at boundaries

**Quality:**
- Duplicated logic (3+ occurrences)
- New code without corresponding tests
