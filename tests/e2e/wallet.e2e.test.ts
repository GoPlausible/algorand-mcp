import { describeIf, testConfig } from '../helpers/testConfig.js';
import { getE2EAccount, invokeTool, parseToolResponse } from '../helpers/e2eSetup.js';

const WALLET_NICKNAME = `e2e-wallet-${Date.now()}`;

describeIf(testConfig.isCategoryEnabled('wallet'))('Wallet Tools (E2E)', () => {
  afterAll(async () => {
    // Cleanup: remove the test account
    try {
      await invokeTool('wallet_remove_account', { nickname: WALLET_NICKNAME });
    } catch {
      // Ignore if already removed
    }
  });

  it('wallet_add_account — creates account with nickname', async () => {
    const data = parseToolResponse(
      await invokeTool('wallet_add_account', {
        nickname: WALLET_NICKNAME,
        allowance: 5_000_000,
        dailyAllowance: 10_000_000,
      }),
    );
    expect(data.address).toHaveLength(58);
    expect(data.publicKey).toBeDefined();
    expect(data.nickname).toBe(WALLET_NICKNAME);
    expect(data.mnemonic).toBeUndefined();
  });

  it('wallet_list_accounts — includes the new account', async () => {
    const data = parseToolResponse(await invokeTool('wallet_list_accounts', {}));
    expect(data.count).toBeGreaterThanOrEqual(1);
    const found = data.accounts.find((a: any) => a.nickname === WALLET_NICKNAME);
    expect(found).toBeDefined();
  });

  it('wallet_switch_account — switches to the new account', async () => {
    const data = parseToolResponse(
      await invokeTool('wallet_switch_account', { nickname: WALLET_NICKNAME }),
    );
    expect(data.switched).toBe(true);
    expect(data.nickname).toBe(WALLET_NICKNAME);
  });

  it('wallet_get_info — returns active account info', async () => {
    const data = parseToolResponse(
      await invokeTool('wallet_get_info', { network: 'testnet' }),
    );
    expect(data.nickname).toBe(WALLET_NICKNAME);
    expect(data.address).toHaveLength(58);
    expect(data.allowance).toBe(5_000_000);
    expect(data.dailyAllowance).toBe(10_000_000);
  });

  it('wallet_get_assets — returns assets for active account', async () => {
    const data = parseToolResponse(
      await invokeTool('wallet_get_assets', { network: 'testnet' }),
    );
    expect(data.nickname).toBe(WALLET_NICKNAME);
    expect(data.assets).toBeDefined();
  });

  it('wallet_sign_data — signs hex data', async () => {
    const data = parseToolResponse(
      await invokeTool('wallet_sign_data', { data: '48656c6c6f' }),
    );
    expect(data.signature).toBeDefined();
    expect(data.publicKey).toBeDefined();
    expect(data.dataLength).toBe(5);
  });

  it('wallet_remove_account — removes the test account', async () => {
    const data = parseToolResponse(
      await invokeTool('wallet_remove_account', { nickname: WALLET_NICKNAME }),
    );
    expect(data.removed).toBe(true);
    expect(data.nickname).toBe(WALLET_NICKNAME);
  });
});
