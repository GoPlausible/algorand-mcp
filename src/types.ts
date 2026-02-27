import { z } from 'zod';

export const CreateAccountResultSchema = z.object({
  address: z.string(),
  privateKey: z.string(),
});
export type CreateAccountResult = z.infer<typeof CreateAccountResultSchema>;

export const RekeyAccountParamsSchema = z.object({
  sourceAddress: z.string(),
  targetAddress: z.string(),
});
export type RekeyAccountParams = z.infer<typeof RekeyAccountParamsSchema>;

export const RekeyAccountResultSchema = z.object({
  txId: z.string(),
  signedTxn: z.string(), // Base64 encoded signed transaction
});
export type RekeyAccountResult = z.infer<typeof RekeyAccountResultSchema>;

export const AccountDetailsSchema = z.object({
  address: z.string(),
  amount: z.union([z.number(), z.bigint()]),
  assets: z.array(z.object({
    assetId: z.union([z.number(), z.bigint()]),
    amount: z.union([z.number(), z.bigint()]),
  })),
  authAddress: z.string().optional(),
});
export type AccountDetails = z.infer<typeof AccountDetailsSchema>;

export const TransactionInfoSchema = z.object({
  id: z.string(),
  type: z.string(),
  sender: z.string(),
  receiver: z.string().optional(),
  amount: z.union([z.number(), z.bigint()]).optional(),
  assetId: z.union([z.number(), z.bigint()]).optional(),
  timestamp: z.string(),
});
export type TransactionInfo = z.infer<typeof TransactionInfoSchema>;

export const AssetHoldingSchema = z.object({
  assetId: z.union([z.number(), z.bigint()]),
  amount: z.union([z.number(), z.bigint()]),
  creator: z.string(),
  frozen: z.boolean(),
});
export type AssetHolding = z.infer<typeof AssetHoldingSchema>;

export const ApplicationStateSchema = z.object({
  appId: z.union([z.number(), z.bigint()]),
  globalState: z.record(z.any()),
  localState: z.record(z.any()).optional(),
});
export type ApplicationState = z.infer<typeof ApplicationStateSchema>;
