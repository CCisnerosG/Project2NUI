import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, CardHeader, Image, CardFooter, Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";
import './wishlist.scss';

interface WishlistItem {
    id: number;
    pokemon: {
        id: number;
        name: string;
        sprite: string;
        weight: number;
        height: number;
        price: number;
        icon_sprite: string;
        type: string;
    };
}

const Wish = () => {
    const [data, setData] = useState<WishlistItem[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/wishlist/products`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    if (data.length === 0) {
        return (
            <div className="empty-cart">
                <p className="empty-cart-text">Your wishlist is empty</p>
                <Link to={'/PokemonList'}><Button color="primary">Back to Shopping!</Button>
                </Link>
            </div>
        );
    }

    const handleToCart = () => {
        axios.post(`http://localhost:8080/api/v1/shoppingCart/moveFromWishlist`, null,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }

    const deleteItem = (itemId: number) => {
        axios.delete(`http://localhost:8080/api/v1/wishlist/${itemId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                console.log(response.data);
                setData(data.filter(item => item.pokemon.id !== itemId))
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const oneProductToCart = (itemId: number) => {
        console.log(localStorage.getItem("token"));
        axios.post(`http://localhost:8080/api/v1/shoppingCart/add?&pokemonId=${itemId}&quantity=${1}`, null, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                if (response.status == 200) {
                    console.log('Sirvio la pus');
                } else {
                    console.log('No sirve');
                }
            })
            .catch(error => {
                console.log(`Error: ${error.message}`);
            });
        deleteItem(itemId);
    }

    return (
        <>
            <Divider />
            <div className="shopping__header">
                <div className="shopping__title">
                    <div className="shopping__img-container">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="Pokeball" />
                    </div>
                    <Divider orientation="vertical" className="h-10" />
                    <div className="shopping__text-container">
                        <p className="shopping__text">Your wishlist</p>
                    </div>
                </div>
                <div className="shopping__topkmlist">
                    <p className="shopping__topkmlist-text" onClick={handleToCart}>Add All To Cart</p>
                </div>
            </div>
            <Divider />
            <div className="mywishlist__container">
                <div className="mywishlist__card-container">
                    {data.map((item) => (
                        <Card key={item.id} isFooterBlurred className="col-span-12 sm:col-span-7 mywishlist__card">
                            <CardHeader className="absolute z-10 top-1 items-start mycardheader">
                                <div className="card__header">
                                    <h4 className="text-black/90 font-medium text-xl">{item.pokemon.name}</h4>
                                    <p className="text-tiny text-primary uppercase font-bold">{`$ ${item.pokemon.price}`}</p>
                                </div>
                                <button onClick={() => deleteItem(item.pokemon.id)} className="card-btn"><img className='item__trash-icon' src="/trash.svg" alt="Delete icon" /></button>

                            </CardHeader>
                            <Image
                                removeWrapper
                                alt={`${item.pokemon.name} image`}
                                className="z-0 w-full h-full object-cover mycardimg"
                                src={item.pokemon.sprite}
                            />
                            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                                <div className="flex flex-grow gap-2 items-center">
                                    <Image
                                        alt={`${item.pokemon.name} icon`}
                                        className="rounded-full w-10 h-11 bg-white mycardimg"
                                        src={`${item.pokemon.icon_sprite}`}
                                    />
                                    <div className="flex flex-col">
                                        {/* <p className="text-tiny text-white/60">{`${item.pokemon.type}`}</p> */}
                                        {/* <p className="text-tiny text-white/60">{`${item.pokemon.weight} lbs |  ${item.pokemon.height} inch`}</p> */}
                                        <p className="text-tiny text-white/60">Ready to be yours!</p>
                                    </div>
                                </div>
                                <Button color="success" radius="full" size="sm" onClick={() => oneProductToCart(item.pokemon.id)}> <img src="shopping-cart.svg" alt="Shopping Cart" /></Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            {/* <Table isStriped aria-label="Example static collection table" className="mywishlist__table">
                <TableHeader >
                    <TableColumn className="mywishlist__tableheader"> </TableColumn>
                    <TableColumn className="mywishlist__tableheader">POKEMON</TableColumn>
                    <TableColumn className="mywishlist__tableheader">DESCRIPTION</TableColumn>
                    <TableColumn className="mywishlist__tableheader">PRICE</TableColumn>
                    <TableColumn className="mywishlist__tableheader"> </TableColumn>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.pokemon.id}>
                            <TableCell> </TableCell>
                            <TableCell>
                                <div className="mywishlist__cell">
                                    <img src={item.pokemon.sprite} alt={item.pokemon.name} className="pkm-img-wish" />
                                    <p>{item.pokemon.name}</p>
                                </div>
                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>${item.pokemon.price}</TableCell>
                            <TableCell>
                                <Button color="success" className="p-0" onClick={() => oneProductToCart(item.pokemon.id)}>Add to Cart</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table> */}
        </>
    )
}

export default Wish;