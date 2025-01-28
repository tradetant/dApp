import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Tradetant} from '../target/types/tradetant'

describe('tradetant', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Tradetant as Program<Tradetant>

  const tradetantKeypair = Keypair.generate()

  it('Initialize Tradetant', async () => {
    await program.methods
      .initialize()
      .accounts({
        tradetant: tradetantKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([tradetantKeypair])
      .rpc()

    const currentCount = await program.account.tradetant.fetch(tradetantKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Tradetant', async () => {
    await program.methods.increment().accounts({ tradetant: tradetantKeypair.publicKey }).rpc()

    const currentCount = await program.account.tradetant.fetch(tradetantKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Tradetant Again', async () => {
    await program.methods.increment().accounts({ tradetant: tradetantKeypair.publicKey }).rpc()

    const currentCount = await program.account.tradetant.fetch(tradetantKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Tradetant', async () => {
    await program.methods.decrement().accounts({ tradetant: tradetantKeypair.publicKey }).rpc()

    const currentCount = await program.account.tradetant.fetch(tradetantKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set tradetant value', async () => {
    await program.methods.set(42).accounts({ tradetant: tradetantKeypair.publicKey }).rpc()

    const currentCount = await program.account.tradetant.fetch(tradetantKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the tradetant account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        tradetant: tradetantKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.tradetant.fetchNullable(tradetantKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
