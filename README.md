# degrade

## Installation

```bash
$ npm i -g degrade
```

## How to Use

### Refactor files

If the filename matches a glob pattern or "before", replace "before" with "after".

command: `degrade rf <before> <after> '<glob>'`

```bash
$ tree
.
└── src
    ├── baz.ts
    └── foo.ts
$ degrade rf foo bar './src/**.ts'
./src/foo.ts
$ tree
.
└── src
    ├── bar.ts
    └── baz.ts
```

### Refactor text

Replace the string "before" in the file targeted by the glob pattern with "after".

```bash
$ cat ./src/bar.ts
console.log('ABC')
$ cat ./src/baz.ts
console.log('ABC')
$ degrade rt ABC DEF './src/bar.ts'
./src/bar.ts
$ cat ./src/bar.ts
console.log('DEF')
$ cat ./src/baz.ts
console.log('ABC')⏎
```

## LICENCE

MIT
