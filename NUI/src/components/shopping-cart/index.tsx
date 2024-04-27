import { useEffect, useState } from "react";
import subject from "../../service/service";
import './shopping.scss';

const Cart = () => {
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [show, setShow] = useState(false);
    const [ver, setVer] = useState(false);

    useEffect(() => {
        const subscription = subject.subscribe((value) => {
            setData(value);
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <div className="bar-container">
            {data.map((item, index) => (
                <div className="item__container" key={item.id}>
                    <div className='item__image-container'>
                        <img className='item__image' src={item.sprite} alt={`${item.name} image`} />
                    </div>
                    <div className="item__info-container">
                        <ul className="item__info">
                            <li className="item__name-container">
                                <p className='item__name'>{item.name}</p>
                                <p className="item__description">{item.description}</p>
                            </li>
                            <div className="item__price-details">
                                <div className="item__price-container">
                                    <p className='item__price'>Total: ${item.price}</p>
                                </div>
                                <div className="item__details-container">
                                    <li className="item__details-type">
                                        <p className="item__details-type-text">Type: {item.type}</p>
                                        <p className="item__details-weight-text">Weight: {item.weight} lbs</p>
                                        <p className="item__details-height-text">Height: {item.height} inch</p>
                                        
                                    </li>
                                </div>
                            </div>
                        </ul>
                        <div className="options">

                        </div>
                    </div>
                </div>
            ))}
        </div >

    )
}

export default Cart;