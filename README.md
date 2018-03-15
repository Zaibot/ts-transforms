# @zaibot/ts-transforms

## Installation
```bash
npm install @zaibot/ts-transforms
```

## Usage
```ts
import { applyTransformations, addWildCardImport } from '@zaibot/ts-transforms';

const transform = applyTransformations([
    addWildCardImport('react-dom', 'ReactDOM')
]);

const input = `import * as React from "react";`;

console.log(transform(input));

// Output:
// import * as ReactDOM from "react-dom";
// import * as React from "react";
//
```

## Transformations:
 * addWildCardImport
