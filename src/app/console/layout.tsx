import '../globals.css'
import {ClusterProvider} from '@console/cluster/cluster-data-access'
import {SolanaProvider} from '@console/solana/solana-provider'
import {UiLayout} from '@console/ui/ui-layout'
import {ReactQueryProvider} from './react-query-provider'

const links: { label: string; path: string }[] = [
    {label: 'Account', path: '/account'},
    {label: 'Clusters', path: '/clusters'},
    {label: 'Tradetant Program', path: '/tradetant'},
].map(link => ({...link, path: `/console${link.path}`}));

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ReactQueryProvider>
            <ClusterProvider>
                <SolanaProvider>
                    <UiLayout links={links}>{children}</UiLayout>
                </SolanaProvider>
            </ClusterProvider>
        </ReactQueryProvider>
        </body>
        </html>
    )
}
