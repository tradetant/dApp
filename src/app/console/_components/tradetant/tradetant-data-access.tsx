'use client'

import { getTradetantProgram, getTradetantProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useTradetantProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getTradetantProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getTradetantProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['tradetant', 'all', { cluster }],
    queryFn: () => program.account.tradetant.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['tradetant', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ tradetant: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useTradetantProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useTradetantProgram()

  const accountQuery = useQuery({
    queryKey: ['tradetant', 'fetch', { cluster, account }],
    queryFn: () => program.account.tradetant.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['tradetant', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ tradetant: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['tradetant', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ tradetant: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['tradetant', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ tradetant: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['tradetant', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ tradetant: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
