---
arc: 48
title: Targeted DeFi Rewards
description: Targeted DeFi Rewards, Terms and Conditions
author: Stéphane BARROSO (@SudoWeezy)
discussions-to: https://github.com/algorandfoundation/ARCs/issues/227
status: Deprecated
type: Informational
created: 2023-07-19
---

## Abstract
The Targeted DeFi Rewards is a temporary incentive program that distributes Algo to be deployed in targeted activities to attract new DeFi users from within and outside the ecosystem.
The goal is to give DeFi projects more flexibility in how these rewards are structured and distributed among their user base, targeting rapid growth, deeper DEX liquidity, and incentives for users who come to Algorand in the middle of a governance period.

## Specification
The key words "**MUST**", "**MUST NOT**", "**REQUIRED**", "**SHALL**", "**SHALL NOT**", "**SHOULD**", "**SHOULD NOT**", "**RECOMMENDED**", "**MAY**", and "**OPTIONAL**" in this document are to be interpreted as described in <a href="https://www.ietf.org/rfc/rfc2119.txt" target=_blank>RFC-2119</a>.

### Eligibility Criteria

To be eligible to apply to this program, projects must abide by the <a href="https://www.algorand.foundation/disclaimers">Disclaimers</a> (in particular the “Excluded Jurisdictions” section) and be willing to enter into a binding contract in the form of the template provided by the Algorand Foundation.

> The Algorand Foundation is temporarily allowing US-based entities to apply for this program. Approved projects will have their rewards swapped to USDCa on the day of the payment. This exception will be reviewed periodically.

Projects must have at least 500K Algo equivalent in TVL of white-listed assets, at the time of the quarterly snapshot block, which happens on the 15th day of the last month of each calendar quarter. All related wallet addresses will be provided in advance for peer scrutiny.

The DeFi Advisory Committee will review applications to verify each TVL claim, thus ensuring that claims are valid prior to application approval.

For AMMs we will leverage the Eligible Liquidity Pool list that is currently adopted to allow the governors commitment of LP tokens in the DeFi Rewards program, with extension to the assets defined below.

For Lending/Borrowing protocols, each project will provide a list of their assets and their holding wallet address(es).

For Bridges, each project will provide a list of the bridged assets and their holding wallet address(es).

### Assets Selection

The metrics used to select eligible assets to be used for Eligibility TVL Calculation (as per Eligibility Criteria above) were chosen to ensure that the selected tokens have a strong reputation, are difficult to manipulate, and are valuable to the ecosystem. This reputation is built on a combination of factors, including Total Value Locked (TVL), Market Cap, and listings.

>Assets are expected to meet at least two of the three criteria below to be included in the white-list.

|Criteria||
|:-|-:|
|TVL|The total value locked in different Algorand protocols plays a key role. It's a good indicator of the token's popularity. Minimum TVL requirement: $100K across all the protocols.|
|Market Cap|Market cap is a measure of a crypto token’s total circulating supply multiplied by its current market price. This parameter can be used to consider the positioning of the tokens on the entire crypto market. Minimum Market Cap requirement: USD 1MM.|
|Listing|Tokens listed on multiple stable and respected exchanges are often seen as more established and trustworthy. This can also contribute to increased demand for the token and further the growth of its reputation within the ecosystem.|

The following assets are qualified and meet the above criteria:
- ALGO
- gALGO - ASA ID 793124631
- USDC - ASA ID 31566704
- USDT - ASA ID 312769
- goBTC - ASA ID 386192725
- goETH - ASA ID 386195940
- PLANETS - ASA ID 27165954
- OPUL - ASA ID 287867876
- VESTIGE - ASA ID 700965019
- CHIPS - ASA ID 388592191
- DEFLY - ASA ID 470842789
- goUSD - ASA 672913181
- WBTC - ASA 1058926737
- WETH - ASA 887406851
- GOLD$ - ASA 246516580
- SILVER$ - ASA 246519683
- PEPE - ASA 1096015467
- COOP - ASA 796425061
- GORA - ASA 1138500612

> Applications for the above list can be submitted at any time <a href="https://forms.gle/kpEpZ8sih69M5xa39">using this form</a>. Cut off for the applications review is the 7th day of the last month of each calendar quarter, or one week before the quarterly snapshot date.

### Rewards Distribution

Projects will receive 11250 Algo for each 500K Algo TVL as defined above, rounded down. In the event that the available Algo are not sufficient for all the projects, Algo rewards will be distributed to each protocol based on their weighted contribution of TVL to Algorand DeFi.

Rewards per project are capped at 25% of the total rewards distributed under this program for that period.  In the event of partial distribution of the allocated 7.5MM, the remaining funds will be distributed as regular DeFi governance rewards. For Governance Period 8, the AMM TVL count has doubled, when compared to lending/borrow and bridge projects, in recognition of their strategic role in providing liquidity for the ecosystem. This modification was approved by the DeFi Committee.

Rewards under this program will be distributed to projects within 4 weeks of the scheduled start date of the new governance period and the project(s). The usage of these rewards will be made public, and they will be entirely dedicated to protocol provision, user rewards, and user engagement. The use of rewards and methodology for payment must be made public and approved by the Algorand DeFi advisory committee prior to distribution.

## Rationale
This document was versioned using google doc, it made more sense to move it on github.

## Security Considerations
Disclaimer: This document may be revised until the day before the voting session opens, as we are still collecting community feedback.

## Copyright
Copyright and related rights waived via <a href="https://creativecommons.org/publicdomain/zero/1.0/">CCO</a>.
