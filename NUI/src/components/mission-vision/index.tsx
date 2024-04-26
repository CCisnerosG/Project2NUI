import './mission.scss';
import { Divider } from '@nextui-org/divider';


const Mission = () => {
    return (
        <div className="mission-vision-container">
            <div className="mission__container">
                <img className="mission__img" src="/img/pokeball.png" alt="Pokeball icon" />
                <p className="mission__title">Mission</p>
                <p className="mission__description">We know it's hard to be the best, but we want to make you the ultimate trainer and complete your Pokédex!</p>
            </div>

            <Divider className='mydivider h-[180px]' orientation="vertical" />
            <div className="vision__container">
                <img className="vision__img" src="/img/shipping.png" alt="Shipping icon" />
                <p className="vision__title">Commitment</p>
                <p className="vision__description">We always strive to be better and make it easy for you as a trainer! Now we are shipping worldwide. Don't worry about anything</p>
            </div>
        </div>
    )
}

export default Mission;