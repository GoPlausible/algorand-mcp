/**
 * E2E Global Setup — provisions the test account.
 *
 * If E2E_MNEMONIC is set, validates and checks funding.
 * If not, generates a new account and prints fund instructions.
 */
import algosdk from 'algosdk';

export default async function globalSetup() {
  const mnemonic = process.env.E2E_MNEMONIC;

  if (mnemonic) {
    try {
      const { addr } = algosdk.mnemonicToSecretKey(mnemonic);
      const address = addr.toString();
      console.log(`\n[E2E Setup] Using provided mnemonic. Address: ${address}`);

      const algod = new algosdk.Algodv2('', 'https://testnet-api.algonode.cloud', '');
      try {
        const info = await algod.accountInformation(address).do();
        const balance = info.amount ?? 0;
        if (balance < 1_000_000) {
          console.warn(
            `\n[E2E Setup] WARNING: Balance is ${balance} microAlgos (${balance / 1_000_000} Algos).` +
            `\n  Fund it here: https://lora.algokit.io/testnet/fund` +
            `\n  Address: ${address}\n`,
          );
        } else {
          console.log(`[E2E Setup] Balance: ${balance / 1_000_000} Algos — sufficient for testing.`);
        }
      } catch {
        console.warn('[E2E Setup] Could not check balance. Account may not be funded yet.');
        console.warn(`  Fund here: https://lora.algokit.io/testnet/fund`);
        console.warn(`  Address: ${address}`);
      }

      process.env.__E2E_MNEMONIC = mnemonic;
    } catch (e) {
      throw new Error(`Invalid E2E_MNEMONIC: ${e instanceof Error ? e.message : String(e)}`);
    }
  } else {
    const account = algosdk.generateAccount();
    const newMnemonic = algosdk.secretKeyToMnemonic(account.sk);
    const address = account.addr.toString();

    console.log(`\n${'='.repeat(70)}`);
    console.log('[E2E Setup] No E2E_MNEMONIC provided. Created new test account.');
    console.log(`  Address:  ${address}`);
    console.log(`  Mnemonic: ${newMnemonic}`);
    console.log(`\n  Fund this account before running funded E2E tests:`);
    console.log(`  https://lora.algokit.io/testnet/fund`);
    console.log(`\n  Then re-run with:`);
    console.log(`  E2E_MNEMONIC="${newMnemonic}" npm run test:e2e`);
    console.log(`${'='.repeat(70)}\n`);

    process.env.__E2E_MNEMONIC = newMnemonic;
  }
}
