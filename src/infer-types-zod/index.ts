import type z from 'zod';
import type {
  getContract200Schema,
  getContractNegotiationSummary200Schema,
  getNegotiation200Schema,
} from '../generated/zod';

export type GetNegotiation200InferType = z.infer<
  typeof getNegotiation200Schema
>;

export type GetNegotiationContractSummary200InferType = z.infer<
  typeof getContractNegotiationSummary200Schema
>;

export type GetContract200InferType = z.infer<typeof getContract200Schema>;

// import type { z } from 'zod';
// import type {
//   getContract200Schema,
//   getContractNegotiationSummary200Schema,
//   getNegotiation200Schema,
// } from '../generated/zod';

// export type GetNegotiation200InferType = z.infer<
//   typeof getNegotiation200Schema
// >;

// export type GetNegotiationPartialId = Omit<GetNegotiation200InferType, 'id'> & {
//   id?: string;
// };

// export type GetContract200InferType = z.infer<typeof getContract200Schema>;

// export type GetContractPartialId = Omit<GetContract200InferType, 'id'> & {
//   id?: string;
// };

// export type GetNegotiationContractSummary200InferType = z.infer<
//   typeof getContractNegotiationSummary200Schema
// >;
