import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePokemonContext } from "../../context/pokemon-context";
import NotFound from "../product-not-found";
import './product-details.scss'
import { Divider } from "@nextui-org/divider";

const typeColors = {
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
};

const PokemonDetails = () => {
    const { id } = useParams();
    const pokemonData = usePokemonContext();
    const [bgColor, setBgColor] = useState("");


    useEffect(() => {
        if (pokemonData) {
            const pokemon = pokemonData.find(p => p.id === parseInt(id));
            const type = pokemon?.type;
            if (type && typeColors[type]) {
                setBgColor(typeColors[type]);
            }
        }
    }, [id, pokemonData]);

    if (!pokemonData) {
        return <p>Loading...</p>;
    }

    const pokemon = pokemonData.find(p => p.id === parseInt(id));
    console.log(pokemon['evolution_chain']);

    const renderEvolution = (evolution) => {
        return (
            <>
                <p className="pokemon__evolution-title">This Pokémon evolves into</p>
                <div className="pokemon__evolution">
                    <p className="pokemon__evolution-name">{evolution.name}</p>
                    <div className="pokemon__evolution-img-container">
                        <img className="pokemon__evolution-img" src={evolution.sprite} alt={`Image of ${evolution.name}`} />
                    </div>
                </div>

                {evolution.evolution && evolution.evolution.map(renderEvolution)}
            </>
        );
    };


    if (!pokemon) {
        return <NotFound />;
    }


    return (
        < div className="pokemon__product" >
            <div className="pokemon__header">
                <p className="pokemon__header-title">{pokemon.name}</p>
                <p className="pokemon__header-price">${pokemon.price}</p>
            </div>
            <div className="pokemon__img-container" style={{ backgroundColor: bgColor }}>
                <img className="pokemon__image" src={pokemon.sprite} alt={`Image of ${pokemon.name}`} />
            </div>
            <div className="pokemon__info">
                <div className="pokemon__header-info">
                    <p className="pokemon__header-title">{pokemon.name}</p>
                    <p className="pokemon__header-price">${pokemon.price}</p>
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
                <div className="pokemon__evolutions">
                    {pokemon.evolution.length > 0 ? (
                        pokemon.evolution.map(renderEvolution)
                    ) : (
                        <p>This pokemon doesn't have any evolutions!</p>
                    )}
                </div>
                {/* <div className="mytab">
                    <ul className="nav nav-tabs mytab-content" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                                type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Refunds and
                                Shipping</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane"
                                type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Reviews
                                (3)</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab"
                            tabIndex="0">
                            <div className="mytab__text">
                                <p>Free shipping with our PokéPartner membership.</p>
                                <ul>
                                    <li>There's no refunds, don't be like that.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab"
                            tabIndex="0">
                            <div className="mytab__text">
                                <div className="mytab__text-header">
                                    <p className="mytab__text-title">
                                        I completed my Pokédex!
                                    </p>
                                    <div className="mytab__text-rating">
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <p className="mytab__text-user">TotallyNotAsh - Apr 4th 2024</p>
                                    </div>
                                </div>
                                <p>Great service! Totally legit.</p>
                            </div>
                            <div className="mytab__text">
                                <div className="mytab__text-header">
                                    <p className="mytab__text-title">
                                        Fast delivery!
                                    </p>
                                    <div className="mytab__text-rating">
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <p className="mytab__text-user">Andrew - Jan 10th 2024</p>
                                    </div>
                                </div>
                                <p>About to go for another one!</p>
                            </div>
                            <div className="mytab__text">
                                <div className="mytab__text-header">
                                    <p className="mytab__text-title">
                                        Not quite satisfied...
                                    </p>
                                    <div className="mytab__text-rating">
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-half"></i>
                                        <i className="bi bi-star"></i>
                                        <p className="mytab__text-user">Mike - Apr 1st 2024</p>
                                    </div>
                                </div>
                                <p>It evolved upon arrival.</p>
                            </div>
                        </div>
                    </div>
                </div> */}
                <section className="partners">
                    <h4 className="partners__title">Some of our partners</h4>
                    <div className="partners__img-container">
                        <img className="partners__img"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/FedEx_Express.svg/640px-FedEx_Express.svg.png"
                            alt="FedEx" />
                        <img className="partners__img" src="https://superboxcr.com/wp-content/uploads/2018/11/Amazon-Logo-PNG.png"
                            alt="Amazon" />
                        <img className="partners__img"
                            src="https://data.alibabagroup.com/ecms-files/886024452/296d05a1-c52a-4f5e-abf2-0d49d4c0d6b3.png"
                            alt="Alibaba" />
                    </div>
                </section>
            </div>
        </div >
    );
};

export default PokemonDetails;
