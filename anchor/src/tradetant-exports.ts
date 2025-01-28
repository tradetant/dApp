// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import TradetantIDL from '../target/idl/tradetant.json'
import type { Tradetant } from '../target/types/tradetant'

// Re-export the generated IDL and type
export { Tradetant, TradetantIDL }

// The programId is imported from the program IDL.
export const TRADETANT_PROGRAM_ID = new PublicKey(TradetantIDL.address)

// This is a helper function to get the Tradetant Anchor program.
export function getTradetantProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...TradetantIDL, address: address ? address.toBase58() : TradetantIDL.address } as Tradetant, provider)
}

// This is a helper function to get the program ID for the Tradetant program depending on the cluster.
export function getTradetantProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Tradetant program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return TRADETANT_PROGRAM_ID
  }
}
