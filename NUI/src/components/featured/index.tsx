import { usePokemonContext } from "../../context/pokemon-context";
import './featured.scss'

const Featured = () => {
    const pokemonData = usePokemonContext();

    const legendaryPokemon = pokemonData ? pokemonData.filter(pokemon => pokemon.isLegendary) : [];

    return (
        <>
            <section className="featured">
                <div className="featured__header">
                    <h2>Now in LEGEND Season!</h2>
                </div>
                <div className="featured__items">
                    {legendaryPokemon.map(pokemon => (
                        <div key={pokemon.id} className="featured__card">
                            <div className="featured__img-container">
                                <img className="featured__img" src={pokemon.sprite} alt={pokemon.name} />
                            </div>
                            <div className="featured__text">
                                {pokemon.name}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Featured;
