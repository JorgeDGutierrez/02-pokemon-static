import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { Grid, Card, Image, Text, Button, Container } from '@nextui-org/react';
import { getPokemonInfo, localFavorites } from '../../utils';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'

interface Props {
    pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {



    const [isInFavorites, setIsInFavorites] = useState(false);

    useEffect(() => {
        setIsInFavorites(localFavorites.existInFavorites(pokemon.id));
    }, [pokemon.id])

    //console.log(pokemon);
    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInFavorites);

        if (!isInFavorites)
            return confetti({
                particleCount: 100,
                spread: 360,
                angle: -100,
                origin: {
                    x: 0.5,
                    y: 0.5
                }
            });


    }

    return (
        <Layout title={pokemon.name}>

            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{ padding: '30px' }} >
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={pokemon.name}
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }} >
                            <Text h1 transform='capitalize' >{pokemon.name}</Text>
                            <Button
                                color="gradient"
                                ghost={!isInFavorites}
                                onClick={onToggleFavorite}
                            >
                                {isInFavorites ? "En Favoritos" : "Guardar en Favoritos"}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites</Text>
                            <Container direction='row' display='flex' gap={0} >
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>

            </Grid.Container>


        </Layout>
    )
};



// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>(`pokemon?limit=300`);
    const pokemonNames: string[] = data.results.map(pokemon => pokemon.name);

    return {
        paths: pokemonNames.map((name) => ({ params: { name } })),
        //fallback: false
        fallback: 'blocking'
    }
}

//getStaticProps solo se ejecuta del lado del servidor
export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string };

    const namepokemon = await getPokemonInfo(name);

    if (!namepokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            pokemon: namepokemon
        }
    }
}



export default PokemonByNamePage;