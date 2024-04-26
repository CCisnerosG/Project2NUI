import './footer.scss'
import facebookLogo from '/facebook.svg';
import instagramLogo from '/instagram.svg';
import twitterLogo from '/twitter.svg';

const Footer = () => {
    return (
        <div className="footer__container">
            <div className="footer__legal">
                <p className="footer__legal-text">© All rights reserved... And nobody was hurt, right?</p>
            </div>
            <div className="footer__social">
                <a href="https://www.facebook.com/PokemonOficialLatAm/?brand_redir=230809307041021&locale=es_LA" target='_blank'>
                    <img src={facebookLogo} className="logo" alt="Facebook logo" />
                </a>
                <a href="https://www.instagram.com/pokemon/?hl=en" target='_blank'>
                    <img src={instagramLogo} className="logo" alt="Instagram logo" />
                </a>
                <a href="https://twitter.com/Pokemon" target='_blank'>
                    <img src={twitterLogo} className="logo" alt="Twitter logo" />
                </a>

            </div>
        </div >
    )
};

export default Footer;