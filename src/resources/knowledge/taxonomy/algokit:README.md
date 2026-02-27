<div align="center">
<a href="https://github.com/algorandfoundation/algokit"><img src="https://bafybeickjkfl4mbrhmgr67kentvjr3meixppy2ziqyvpjpkvrlyjacjvua.ipfs.nftstorage.link/"></a>
</div>

<br/>
<div align="center">
Welcome to the AlgoKit Developer Universe repo, the one-stop shop for all <a href="https://github.com/algorandfoundation/algokit-cli#what-is-algokit"> AlgoKit</a> related repositories and information
</div>
<br/>
<p align="center">
    <a target="_blank" href="https://github.com/algorandfoundation/algokit-cli"><img src="https://img.shields.io/badge/algokit-cli-00dc94?logo=algorand&mac=flat.svg" /></a>
    <a target="_blank" href="https://github.com/algorandfoundation/algokit-utils-py#readme"><img src="https://img.shields.io/badge/algokit-utils-00dc94?logo=python&mac=flat.svg" /></a>
    <a target="_blank" href="https://github.com/algorandfoundation/algokit-utils-ts#algokit-typescript-utilities"><img src="https://img.shields.io/badge/algokit-utils-00dc94?logo=typescript&mac=flat.svg" /></a>
    <a target="_blank" href="https://github.com/algorandfoundation/algokit-client-generator-py"><img src="https://img.shields.io/badge/algokit-client generator-00dc94?logo=python&mac=flat.svg" /></a>
    <a target="_blank" href="https://github.com/algorandfoundation/algokit-client-generator-ts"><img src="https://img.shields.io/badge/algokit-client generator-00dc94?logo=typescript&mac=flat.svg" /></a>

</p>

### AlgoKit CLI  
<img alt="PyPI - Downloads" src="https://img.shields.io/pypi/dm/algokit?logo=pypi"> <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/algorandfoundation/algokit-cli?logo=github">

AlgoKit CLI is the one-stop shop tool for developers building on the [Algorand network](https://www.algorand.com/).

AlgoKit gets developers of all levels up and running with a familiar, fun and productive development environment in minutes. The goal of AlgoKit is to help developers build and launch secure, automated production-ready applications rapidly.

[Repo](https://github.com/algorandfoundation/algokit-cli) | [Quick Start Tutorial](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/tutorials/intro.md) | [Documentation](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/algokit.md)

>[!NOTE] 
> By using the AlgoKit cli you will use all the below listed packages, no need to install them separately

### Algorand Python
Algorand Python is a semantically and syntactically compatible, typed Python language that works with standard Python tooling and allows you to express smart contracts (apps) and smart signatures (logic signatures) for deployment on the Algorand Virtual Machine (AVM). [See how to get started](https://github.com/algorandfoundation/puya).

### AlgoKit Utils 
A set of core Algorand utilities available in both Python and TypeScript that make it easier to build solutions on Algorand.

The goal of this library is to provide intuitive, productive utility functions that make it easier, quicker and safer to build applications on Algorand. Largely these functions wrap the underlying Algorand SDK, but provide a higher level interface with sensible defaults and capabilities for common tasks.

##### Python 
<img alt="PyPI - Downloads" src="https://img.shields.io/pypi/dm/algokit-utils?logo=pypi">

[Repo](https://github.com/algorandfoundation/algokit-utils-py#readme) | [Documentation](https://algorandfoundation.github.io/algokit-utils-py/html/index.html) 


##### TypeScript 
<img alt="npm" src="https://img.shields.io/npm/dm/%40algorandfoundation/algokit-utils?logo=npm">

[Repo](https://github.com/algorandfoundation/algokit-utils-ts#algokit-typescript-utilities) | [Documentation](https://github.com/algorandfoundation/algokit-utils-ts/tree/main/docs)

### Client Generators
This project generates a type-safe smart contract client in both Python TypeScript for the Algorand Blockchain that wraps the [application client](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/docs/capabilities/app-client.md) in AlgoKit Utils. It does this by reading an [ARC-0032](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0032.md) application spec file.

##### Python 
<img alt="PyPI - Downloads" src="https://img.shields.io/pypi/dm/algokit-client-generator?logo=pypi">

[Repo](https://github.com/algorandfoundation/algokit-client-generator-py) | [Examples](https://github.com/algorandfoundation/algokit-client-generator-py/tree/main/examples) 


##### TypeScript 
<img alt="npm" src="https://img.shields.io/npm/dm/%40algorandfoundation/algokit-client-generator?logo=npm">

[Repo](https://github.com/algorandfoundation/algokit-client-generator-ts) | [Examples](https://github.com/algorandfoundation/algokit-client-generator-ts/tree/main/examples)

### AVM Debugger
The AlgoKit AVM VS Code debugger extension provides a convenient way to debug any Algorand Smart Contracts written in TEAL
[more info](https://marketplace.visualstudio.com/items?itemName=AlgorandFoundation.algokit-avm-vscode-debugger)

### TestNet Dispenser
The AlgoKit TestNet Dispenser API provides functionalities to interact with the Dispenser service. This service enables users to fund and refund assets, testnet Algos only for now.
[Documentation](./docs/testnet_api.md) 
