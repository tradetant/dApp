"use client";

import {useConnectWallet, usePrivy, useLogin as usePrivyLogin, type Wallet} from "@privy-io/react-auth";

import {useFundWallet, useSolanaWallets} from "@privy-io/react-auth/solana";

interface UseLoginProps {
    onComplete?: (wallet: Wallet) => void
}

export const useLogin = ({onComplete}: UseLoginProps = {}) => {
    const {user, ready, logout, authenticated} = usePrivy();
    const {wallets, createWallet} = useSolanaWallets();
    const {connectWallet} = useConnectWallet();
    const {fundWallet} = useFundWallet();

    const {login} = usePrivyLogin({
        onComplete: async ({user, isNewUser}) => {
            console.log("usePrivyLogin", isNewUser, user);

            if (!user.wallet) {
                const wallet = await createWallet();
                onComplete?.(wallet);
            } else {
                onComplete?.(user.wallet!);
            }
        },
        onError: (error) => {
            console.log(error);
            // Any logic you'd like to execute after a user exits the login flow or there is an error
        },
    });

    return {
        ready,

        user,
        authenticated,

        login,
        logout,

        wallets,
        connectWallet,

        fundWallet
    }
}