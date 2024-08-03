### `README.md` 示例

````markdown
# execute-sequentially

'ExecuteSequentially' is a class for executing functions sequentially. It allows adding functions to a queue and ensures they are executed one by one. The class also supports pausing and stopping the execution of the queue.

## Features

- Execute callbacks sequentially

## Installation

To install the package, you can use npm:

```bash
npm install execute-sequentially
```
````

## Usage

### Importing the Library

```javascript
const { ExecuteSequentially } = require("execute-sequentially");
```

### Execute Callbacks Sequentially

Start execution immediately after adding

```javascript
const executeSequentially = new ExecuteSequentially();

executeSequentially.push(async () =>
  fs.promises.appendFile("./filePath", `${data}\n`)
);

executeSequentially.push(fn);

executeSequentially.executePause();

executeSequentially.executeStart();

executeSequentially.executeStop();
```
