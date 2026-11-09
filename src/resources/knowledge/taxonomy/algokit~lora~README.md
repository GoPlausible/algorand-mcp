<div align="center">
<a href="https://github.com/algorandfoundation/algokit-lora"><img src="https://bafybeigi4s7alfr7fdir5mdi6xzmichoubnwndol4ts6ktz52y3qvd5soe.ipfs.nftstorage.link/" width=60%></a>
</div>

<p align="center">
    <a target="_blank" href="https://github.com/algorandfoundation/algokit-lora/blob/main/README.md"><img src="https://img.shields.io/badge/docs-repository-00dc94?logo=github&style=flat.svg" /></a>
    <a target="_blank" href="https://developer.algorand.org/algokit/"><img src="https://img.shields.io/badge/learn-AlgoKit-00dc94?logo=algorand&mac=flat.svg" /></a>
    <a target="_blank" href="https://github.com/algorandfoundation/algokit-lora"><img src="https://img.shields.io/github/stars/algorandfoundation/algokit-lora?color=00dc94&logo=star&style=flat" /></a>
    <a target="_blank" href="https://developer.algorand.org/algokit/"><img  src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Falgorandfoundation%2Falgokit-lora&countColor=%2300dc94&style=flat" /></a>
</p>

---

Algorand AlgoKit lora is a live on-chain resource analyzer, that enables developers to explore and interact with a configured Algorand network in a visual way.

## What is lora?

AlgoKit lora is a powerful visual tool designed to streamline the Algorand local development experience.
It acts as both a network explorer and a tool for building and testing your Algorand applications.

You can access lora by visiting [https://lora.algokit.io](https://lora.algokit.io) in your browser or by running `algokit explore` when you have the [AlgoKit CLI](https://github.com/algorandfoundation/algokit-cli) installed.

## Why did we build lora?

An explorer is an essential tool for making blockchain data accessible and enables users to inspect and understand on-chain activities. Without these tools, it's difficult to interpret data or gather the information and insights to fully harness the potential of the blockchain. Therefore it makes sense to have a high quality, officially supported and fully open-source tool available to the community.

Before developing lora, we evaluated the existing tools in the community, but none fully met our desires.

As part of this evaluation we came up with several design goals, which are:

- **Developer-Centric User Experience**: Offer a rich user experience tailored for developers, with support for LocalNet, TestNet, and MainNet.
- **Open Source**: Fully open source and actively maintained.
- **Operationally Simple**: Operate using algod and indexer directly, eliminating the need for additional setup, deployment, or maintenance.
- **Visualize Complexity**: Enable Algorand developers to understand complex transactions and transaction groups by visually representing them.
- **Contextual Linking**: Allow users to see live and historical transactions in the context of related accounts, assets, or applications.
- **Performant**: Ensure a fast and seamless experience by minimizing requests to upstream services and utilizing caching to prevent unnecessary data fetching. Whenever possible, ancillary data should be fetched just in time with minimal over-fetching.
- **Support the Learning Journey**: Assist developers in discovering and learning about the Algorand ecosystem.
- **Seamless Integration**: Use and integrate seamlessly with the existing AlgoKit tools and enhance their usefulness.
- **Local Installation**: Allow local installation alongside the AlgoKit CLI and your existing dev tools.

## Key features

- Explore blocks, transactions, transaction groups, assets, accounts and applications on LocalNet, TestNet or MainNet.
- Visualise and understand complex transactions and transaction groups with the visual transaction view.
- View blocks in real time as they are produced on the connected network.
- Monitor and inspect real-time transactions related to an asset, account, or application with the live transaction view.
- Review historical transactions related to an asset, account, or application through the historical transaction view.
- Access detailed asset information and metadata when the asset complies with one of the ASA ARCs.
- Connected to your Algorand wallet and perform context specific actions.
- Fund an account in LocalNet or TestNet.
- Visually deploy, populate, simulate and call an app by uploading an ARC-4, ARC-32 or ARC-56 app spec via App lab.
- Craft, simulate and send transaction groups using Transaction wizard.
- Seamless integration into the existing AlgoKit ecosystem.

## Roadmap

- Installable app with tighter AlgoKit tooling integration.

## Contributing

See the [contributing page](./CONTRIBUTING.md) to learn about making improvements to the CLI tool itself, including developer setup instructions.
