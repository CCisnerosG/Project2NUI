import './hero.scss'


const Hero = () => {
    return (
        <div className="hero">
            <video src="vid/poke-video.mp4" typeof="video/mp4" loop muted autoPlay playsInline className="hero__vid">
            </video>

            <div className="hero__text">
                <p className="hero__text-title">PokéStore</p>
                <p className="hero__text-description">...cause you can't always catch 'em all</p>
            </div>
        </div>
    )
}

export default Hero;