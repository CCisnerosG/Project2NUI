import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePokemonContext, Pokemon } from "../../context/pokemon-context";
import NotFound from "../product-not-found";
import './product-details.scss'
import { Divider } from "@nextui-org/divider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const typeColors: { [key: string]: string } = {
    Normal: "#A8A878",
    Fire: "#F08030",
    Water: "#6890F0",
    Electric: "#F8D030",
    Grass: "#78C850",
    Poison: "#A040A0",
    Ground: "#E0C068",
    Bug: "#A8B820",
    Psychic: "#F85888",
    Rock: "#B8A038",
    Ghost: "#705898",
    Dragon: "#7038F8",
    Dark: "#705848",
    Steel: "#B8B8D0",
    Ice: "#52B0C5"
};

const PokemonDetails = () => {
    const { id } = useParams();
    const pokemonData = usePokemonContext();
    console.log(pokemonData);
    const [bgColor, setBgColor] = useState("");
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    useEffect(() => {
        if (pokemonData && id) {
            const foundPokemon = pokemonData.find(p => p.id === parseInt(id));
            if (foundPokemon) {
                const type = foundPokemon.type;
                if (type && typeColors[type]) {
                    setBgColor(typeColors[type]);
                }
                setPokemon(foundPokemon);
            }
        }
    }, [id, pokemonData]);

    if (!pokemonData) {
        return <p>Loading...</p>;
    }

    if (!pokemon) {
        return <NotFound />;
    }

    // const renderEvolution = (evolution) => {
    //     return (
    //         <>
    //             <div className="pokemon__evolution">
    //                 <p className="pokemon__evolution-name">{evolution.name}</p>
    //                 <div className="pokemon__evolution-img-container">
    //                     <img className="pokemon__evolution-img" src={evolution.sprite} alt={`Image of ${evolution.name}`} />
    //                 </div>
    //             </div>

    //             {evolution.evolution && evolution.evolution.map(renderEvolution)}
    //         </>
    //     );
    // };

    return (
        < div className="pokemon__product" >
            <div className="pokemon__header">
                <div className="pokemon__other_sprites">
                    <img className="pokemon__other_sprites-img" src={pokemon.icon_sprite} alt={`${pokemon.name} icon`} />
                </div>
                <p className="pokemon__header-title">{pokemon.name}</p>
                <p className="pokemon__header-price">${pokemon.price}</p>
            </div>
            <div className="pokemon__img-container" style={{ backgroundColor: bgColor }}>
                <img className="pokemon__image" src={pokemon.sprite} alt={`Image of ${pokemon.name}`} />
            </div>
            <div className="pokemon__info">
                <div className="pokemon__header-info">
                    <div className="pokemon__header-icon-info-text">
                        <div className="pokemon__header-icon-title">
                            <p className="pokemon__header-title">{pokemon.name}</p>
                            <div className="pokemon__other_sprites">
                                <img className="pokemon__other_sprites-img" src={pokemon.icon_sprite} alt={`${pokemon.name} icon`} />
                            </div>
                        </div>
                        <p className="pokemon__header-price">${pokemon.price}</p>
                    </div>
                </div>
                <div className="pokemon__description">
                    <p className="pokemon__info-type">{pokemon.type}</p>
                    <p className="pokemon__info-description">{pokemon.description}</p>
                </div>
                <div className="pokemon__details">
                    <div className="pokemon__stats">
                        <p className="pokemon__stats-title">Weight</p>
                        <div className="pokemon__stats-info">
                            <img src="/weight.svg" alt="Weight icon" />
                            <p className="pokemon__stats-text">{pokemon.weight} lbs</p>
                        </div>
                    </div>
                    <Divider className='h-[100px]' orientation="vertical" />
                    <div className="pokemon__stats">
                        <p className="pokemon__stats-title">Height</p>
                        <div className="pokemon__stats-info">
                            <img src="/height.svg" alt="Height icon" />
                            <p className="pokemon__stats-text">{pokemon.height} inch</p>
                        </div>
                    </div>
                </div>
                <div className="pokemon__audio">
                    <audio controls>
                        <source src={pokemon.cries} type="audio/ogg" />
                    </audio>
                </div>
                {/* <div className="pokemon__evolutions">
                    <div className="pokemon__evolution-text">
                        <p className="pokemon__evolution-title">Possible evolutions</p>
                    </div>
                    <div className="pokemon__evolution-evos">
                        {pokemon.evolution.length > 0 ? (
                            pokemon.evolution.map(renderEvolution)
                        ) : (
                            <p className="noevo">This pokemon doesn't have any evolutions!</p>
                        )}
                    </div>
                </div> */}
            </div>
        </div >
    );
};

export default PokemonDetails;
