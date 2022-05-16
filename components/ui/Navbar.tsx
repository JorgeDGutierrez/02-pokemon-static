import { Link, Spacer, Text, useTheme } from "@nextui-org/react"
import Image from "next/image"
import NextLink from 'next/link'
import { useState } from 'react';

export const Navbar = () => {


    const { theme } = useTheme()

    // console.log(theme);

    {/* busqueda por nombre de pokemon */ }

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0x 50px',
            backgroundColor: theme?.colors.gray900.value,
        }}>
            <Image
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/25.gif"
                alt="icono de la app"
                width={70}
                height={70}
            />
            <NextLink href="/" passHref >
                <Link>
                    <Text color="white" h2>P</Text>
                    <Text color="white" h3>okémon</Text>
                </Link>

            </NextLink>

            {/* busqueda por nombre */}



            <Spacer css={{ flex: 1 }} />

            <NextLink href="/favorites" passHref >
                <Link css={{ marginRight: '10px' }} >
                    <Text color="white">Favoritos</Text>
                </Link>
            </NextLink>

        </div>
    )
}
