import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import './nav.scss'

const NavNUI = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link to='/'>
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
                    <Button as={Link} color="primary" to="/Login" variant="flat">
                        Login
                    </Button>
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
