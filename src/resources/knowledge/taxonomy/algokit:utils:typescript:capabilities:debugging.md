# Debugger

The AlgoKit TypeScript Utilities package provides a set of debugging tools that can be used to simulate and trace transactions on the Algorand blockchain. These tools and methods are optimized for developers who are building applications on Algorand and need to test and debug their smart contracts via [AlgoKit AVM Debugger extension](https://github.com/algorandfoundation/algokit-avm-vscode-debugger).

## Configuration

The `config.ts` file contains the `UpdatableConfig` class which manages and updates configuration settings for the AlgoKit project.

To enable debug mode in your project you can configure it as follows:

```ts
import { Config } from '@algorandfoundation/algokit-utils'
Config.configure({
  debug: true,
})
```

## Debugging in `node` environment (recommended)

Refer to the [algokit-utils-ts-debug](https://github.com/algorandfoundation/algokit-utils-ts-debug) for more details on how to activate the addon package with `algokit-utils` in your project.

> Note: Config also contains a set of flags that affect behaviour of [algokit-utils-ts-debug](https://github.com/algorandfoundation/algokit-utils-ts-debug). Those include `projectRoot`, `traceAll`, `traceBufferSizeMb`, and `maxSearchDepth`. Refer to addon package documentation for details.

### Why are the debug utilities in a separate package?

To keep the `algokit-utils-ts` package lean and isomporphic, the debugging utilities are located in a separate package. This eliminates various error cases with bundlers (e.g. `webpack`, `esbuild`) when building for the browser.

## Debugging in `browser` environment

Note: `algokit-utils-ts-debug` cannot be used in browser environments. However, you can still obtain and persist simulation traces from the browser's `Console` tab when submitting transactions using the algokit-utils-ts package. To enable this functionality, activate debug mode in the algokit-utils-ts config as described in the [getting started](./docs/code/getting-started.md) guide.

### Subscribe to the `simulate` response event

After setting the `debug` flag to true in the [configuration](#configuration) section, subscribe to the `TxnGroupSimulated` event as follows:

```ts
import { AVMTracesEventData, Config, EventType } from '@algorandfoundation/algokit-utils'

Config.events.on(EventType.TxnGroupSimulated, (eventData: AVMTracesEventData) => {
  Config.logger.info(JSON.stringify(eventData.simulateResponse.get_obj_for_encoding(), null, 2))
})
```

This will output any simulation traces that have been emitted whilst calling your app. Place this code immediately after the `Config.configure` call to ensure it executes before any transactions are submitted for simulation.

### Save simulation trace responses from the browser

With the event handler configured, follow these steps to save simulation trace responses:

1. Open your browser's `Console` tab
2. Submit the transaction
3. Copy the simulation request `JSON` and save it to a file with the extension `.trace.avm.json`
4. Place the file in the `debug_traces` folder of your AlgoKit contract project
   - Note: If you're not using an AlgoKit project structure, the extension will present a file picker as long as the trace file is within your VSCode workspace
