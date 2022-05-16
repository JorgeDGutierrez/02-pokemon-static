import { FC, PropsWithChildren } from 'react';

import Head from 'next/head';
import { Navbar } from '../ui';

interface Props {
    children: JSX.Element;
    title?: string;
}

const origin = (typeof window === 'undefined' ? '' : window.location.origin)
// FC<PropsWithChildren<{ Props }>>

export const Layout: FC<Props> = ({ children, title }) => {




    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Jorge Gutierrez" />
                <meta name="description" content={`Informacion sobre el pokemon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />
                <meta property="og:title" content={`Informacion sobre${title}`} />
                <meta property="og:description" content={`Esta es la pagina sobre ${title}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head>
            <Navbar />

            <main style={{
                padding: '0px 20px',
            }}>
                {children}
            </main>
        </>
    )
}
