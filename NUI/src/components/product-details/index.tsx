import { useParams } from "react-router-dom";
import { usePokemonContext } from "../../context/pokemon-context";
import NotFound from "../product-not-found";

const PokemonDetails = () => {
    const { id } = useParams();
    const pokemonData = usePokemonContext();

    if (!pokemonData) {
        return <p>Loading...</p>;
    }

    const pokemon = pokemonData.find(p => p.id === parseInt(id));

    if (!pokemon) {
        return <NotFound />;
    }

    return (
        <div className="body">
            <div className="pokemon-details">
                <h1>{pokemon.name}</h1>
                <img src={pokemon.sprite} alt={pokemon.name} />
                <div>
                    <h2>Type:</h2>
                    <p>{pokemon.type}</p>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetails;
