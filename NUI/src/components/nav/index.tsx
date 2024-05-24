import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import './nav.scss'
import { useRecoilState } from "recoil";
import loginState from "../../states/login-recoil";

const NavNUI = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

    const closeMenu = () => {
        useState(false);
    };

    useEffect(() => {

    }, []);

    const logOut = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    }

    const renderLoginButton = () => {
        if (isLoggedIn == true) {

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

    const renderLoginButtonDrop = () => {
        if (isLoggedIn == true) {

            return (
                <Link to='/' key="logout" color="danger" onClick={() => {
                    logOut();
                    closeMenu();
                }}>
                    LOGOUT
                </Link>
            )
        } else {
            return (
                <Link to="/Login" aria-current="page" onClick={closeMenu}>
                    LOGIN
                </Link>
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
                <NavbarItem>
                    <Link to="/PokemonList" aria-current="page">
                        OUR POKÉMONS
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/Wishlist" aria-current="page">
                        WISHLIST
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link to="/AdminHome" aria-current="page">
                        ADMIN HOME
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="lg:flex mynavitem">
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
                    <Link to="/Wishlist" onClick={closeMenu}>
                        WISHLIST
                    </Link>
                    <Link to="/ShoppingCart" onClick={closeMenu}>
                        SHOPPING CART
                    </Link>
                    {renderLoginButtonDrop()}
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
}

export default NavNUI;
