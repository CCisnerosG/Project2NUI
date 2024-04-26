import './product-list.scss'

import PokeProducts from "../../components/product-list";

const PokemonList = () => {
    return (
        <>
            <p className="title">Check Our Pokémons!</p>
            <PokeProducts />
        </>
    )
}

export default PokemonList;