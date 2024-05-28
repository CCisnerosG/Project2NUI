export interface Pokemon {
    id: number;
    name: string;
    subtotal: number;
    taxes: number;
    save: number;
    icon_sprite: string;
    sprite: string;
    price: number;
    type: string;
    weight: number;
    description: string;
    height: number;
    cries: string;
    generation: number;
    legendary: boolean;
}

export interface CartItem {
    id: number;
    pokemon: Pokemon;
    quantity: number;
    price: number;
}

export interface Province {
    id: number;
    name: string;
}

export interface Country {
    id: number;
    name: string;
    provinces: Province[];
}

export interface State {
    id: number;
    name: string;
}

export interface PokemonData {
    pokemon: {
        subtotal: number;
        taxes: number;
        save: number;
    },
    quantity: number;
}

export interface WishlistItem {
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

export interface Product {
    id: number;
    quantity: number;
    pokemon: Pokemon;
}

export interface Order {
    id: string;
    orderDate: string;
    total: number;
    paymentMethod: string;
    user: User;
    formattedDate?: string;
    fullName: string;
    address: string;
    email: string;
    state: State;
    products: Product[];
}

export interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface FilterParams {
    name?: string;
    type?: string;
    generation?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: number;
}

export interface ModalAdminProps {
    isOpen: boolean;
    onClose: () => void;
    pokemon: Pokemon | null;
    isCreating: boolean;
}

export interface User {
    fullName: string;
    address: string;
    email: string;
}

export interface EVOPokemon {
    id: number;
    name: string;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
}

export interface PokemonChain {
    species: {
        name: string
    };
    evolves_to: string[];
}