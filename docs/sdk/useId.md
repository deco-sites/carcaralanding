### SDK: useId

Non-deterministic ID hook to avoid duplicate IDs across islands.

#### Import
```ts
import { useId } from "../../sdk/useId.ts";
```

#### Usage
```tsx
const id = useId();
return <label htmlFor={id}>Name<input id={id} /></label>
```

Note: May cause hydration mismatches; use when unique IDs are required.