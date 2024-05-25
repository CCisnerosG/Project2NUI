import { Link } from "react-router-dom";
import './item.scss';
import { Button } from "@nextui-org/react";
import toast, { Toaster } from 'react-hot-toast';

interface PokeItemProps {
    item: {
        id: number;
        name: string;
        type: string;
        generation: number;
        price: number;
        sprite: string;
        height: number;
        weight: number;
        subtotal: number;
        taxes: number;
        save: number;
        icon_sprite: string;
    };
    addToCart: (item: {
        id: number;
        name: string;
        type: string;
        generation: number;
        price: number;
        sprite: string;
        height: number;
        weight: number;
        subtotal: number;
        taxes: number;
        save: number;
    }) => void;
    addToWishlist: (item: {
        id: number;
        name: string;
        type: string;
        generation: number;
        price: number;
        sprite: string;
        height: number;
        weight: number;
        subtotal: number;
        taxes: number;
        save: number;
    }) => void;
}

const PokeItem: React.FC<PokeItemProps> = ({ item, addToCart, addToWishlist }) => {

    const notification = () => {
        // toast.success(`${item.name} added to cart`)
        toast(
            <div className="toast">
                <img className='toast-icon' src={item.icon_sprite} alt={item.name} />
                <p>{item.name} added to cart</p>
            </div>
        )
    }

    const wishlistNotification = () => {
        // toast.success(`${item.name} added to wishlist`)
        toast(
            <div className="toast">
                <img className='toast-icon' src={item.icon_sprite} alt={item.name} />
                <p>{item.name} added to cart</p>
            </div>
        )
    }


    return (
        <>
            <div><Toaster /></div>
            <div className="pkm">
                <Button
                    isIconOnly
                    className="text-default-900/60 data-[hover]:bg-foreground/10 my-heart"
                    radius="full"
                    variant="light"
                    // onPress={() => setLiked((v) => !v)}
                    onClick={() => { addToWishlist(item); wishlistNotification(); }}
                >
                    <img className="btn-image-img" src="/heart.svg" alt="Add to wishlist icon" />
                </Button>
                <Link to={`/ProductDetails/${item.id}`}>
                    <div className="pkm__img-container">
                        <img className="pkm__img" src={item.sprite} alt={`Pokemon ${item.name}`} />
                    </div>
                    <div className="pkm__details">
                        <div className="pkm__head">
                            <p className="pkm__total">${item.price}</p>
                            <p className="pkm__head-title">{item.name}</p>
                            <p className="pkm__head-number">Pokemon No. {item.id}</p>
                        </div>
                        <div className="pkm__content">
                            <div className="pkm__content-info">
                                <div className="pkm__content-types">
                                    <p><b>TYPE:</b> {item.type}</p>
                                </div>
                                <p className="pkm__content-height"><b>HEIGHT:</b> {item.height} inch</p>
                                <p className="pkm__content-weight"><b>WEIGHT:</b> {item.weight} lbs</p>
                            </div>
                            <div className="pkm__pricing">
                                <p className="pkm__subtotal">Sub-total: ${item.subtotal}</p>
                                <p className="pkm__taxes">Taxes: ${item.taxes}</p>
                                <p className="pkm__save">Save: ${item.save}</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="mybtn__container">
                    <Button className="mybtn" color="success" onClick={() => { addToCart(item); notification(); }}>Add to Cart</Button>
                </div>
            </div >
        </>
    );
};

export default PokeItem;
