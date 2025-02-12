"use client";

import {PrivyProvider as PrivyProviderBase} from '@privy-io/react-auth';
import {toSolanaWalletConnectors} from '@privy-io/react-auth/solana';

interface Props {
    children: React.ReactNode;
}

const solanaConnectors = toSolanaWalletConnectors({
    shouldAutoConnect: true,
});

export const PrivyProvider: React.FC<Props> = ({children}) => {
    return (
        <PrivyProviderBase
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
            clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID!}
            config={{
                appearance: {
                    theme: 'dark',
                    accentColor: '#d19900',
                    logo: 'https://www.tradetant.com/logo-dark.png',
                    walletChainType: "solana-only"
                },
                externalWallets: {
                    solana: {
                        connectors: solanaConnectors
                    }
                },
                solanaClusters: [
                    {
                        name: 'devnet',
                        rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL!,
                    }
                ],
                embeddedWallets: {
                    showWalletUIs: true, // Request user
                }
            }}
        >
            {children}
        </PrivyProviderBase>
    )
}