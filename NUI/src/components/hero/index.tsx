import { usePokemonContext } from '../../context/pokemon-context';
import './hero.scss'


const Hero = () => {
    const pokemonData = usePokemonContext();
    const getRandomSprite = () => {
        if (!pokemonData) return '';
        const randomPokemon = pokemonData[Math.floor(Math.random() * pokemonData.length)];
        return randomPokemon.sprite;
    };

    const randomSprite = getRandomSprite();
    return (
        <div className="hero">
            <div className="hero__text">
                <p className="hero__text-title">PokéStore</p>
                <p className="hero__text-description">...cause you can't always catch 'em all</p>
            </div>
            <div className="hero__image-one">
                <img className="hero__image-poke" src="pokeball-hero.svg" alt="Pokeball" />
                <div className="hero__image-two">
                    <img className="hero__image-pika" src={randomSprite} alt="Pikachu smiling" />
                </div>
            </div>
        </div>
    )
}

export default Hero;