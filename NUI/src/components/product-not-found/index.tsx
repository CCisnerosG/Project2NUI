import { Link } from 'react-router-dom';
import './not-found.scss'
import { Button } from '@nextui-org/react';

const NotFound = () => {
    return (
        <>
            <div className="semi-hero">
                <p className="title-not-found">The Pokémon you're looking for hasn't been caught....yet!  </p>
                <div className="not-found-container">
                    <img className="not-found-img" src="https://as01.epimg.net/epik/imagenes/2018/11/16/portada/1542384053_864693_1542384302_noticia_normal.jpg" alt="Pikachu surprised" />
                </div>
            </div>
            <div className="text-description">
                <p className="text-not-found">Still, take a look to our Pokémon catalog here:</p>
                <Link to='/PokemonList'>
                    <Button color="primary" variant="ghost">Available Pokémons</Button>
                </Link>
            </div>
        </>
    )
}

export default NotFound;