import { Link } from "react-router-dom";
import { usePokemonContext } from "../../context/pokemon-context";
import './featured.scss'

const Featured = () => {
    const pokemonData = usePokemonContext();

    const legendaryPokemon = pokemonData ? pokemonData.filter(pokemon => pokemon.isLegendary) : [];

    return (
        <>
            <section className="featured">
                <div className="featured__header">
                    <p>Now in LEGEND Season!</p>
                </div>
                <Link to="/PokemonList">
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
                </Link>
            </section>
        </>
    )
}

export default Featured;
