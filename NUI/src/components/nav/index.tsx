import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import './nav.scss'

const NavNUI = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserSet, setIsUserSet] = useState(localStorage.getItem("user"));
    const [cartItemsCount, setCartItemsCount] = useState(0);

    const closeMenu = () => {
        useState(false);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setIsUserSet(localStorage.getItem("user"));
            const cartItems = JSON.parse(localStorage.getItem("cartItems"));
            if (cartItems) {
                setCartItemsCount(cartItems.length);
            } else {
                setCartItemsCount(0);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const logOut = () => {
        localStorage.clear();
        setIsUserSet(null);
    }

    const renderLoginButton = () => {
        if (isUserSet != null) {

            return (
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            src="https://img1.wsimg.com/isteam/ip/56c0cc13-b423-4d20-93f5-b95b2a675d4e/Robert-Fishman.jpg"
                            alt="Un compa"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="logout" color="danger" onClick={logOut}>
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            )
        } else {
            return (
                <Button as={Link} color="secondary" to="/Login" variant="flat">
                    Login
                </Button>
            )
        }
    }

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                    as={'li'}
                />

                <NavbarBrand as={'li'}>
                    <Link to='/' className="img-container">
                        <img className="navbar-img"
                            src="https://i.pinimg.com/originals/73/46/2b/73462b387cdd1ce3352343c290d61f4d.png"
                            alt="Pikachu PokéStore" />
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" to='/'>
                        HOME
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link to="/PokemonList" aria-current="page">
                        OUR POKÉMONS
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link to="/ShoppingCart">
                        <span className="material-symbols-outlined myShoppingBag">
                            shopping_bag
                        </span>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    {renderLoginButton()}
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem className="navItem-container" >
                    <Link color="foreground" to='/' onClick={closeMenu}>
                        HOME
                    </Link>
                    <Link to="/PokemonList" aria-current="page" onClick={closeMenu}>
                        OUR POKÉMONS
                    </Link>
                    <Link to="/ShoppingCart" onClick={closeMenu}>
                        SHOPPING CART
                    </Link>
                    <Link to="/Login" aria-current="page" onClick={closeMenu}>
                        LOGIN
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}

export default NavNUI;
