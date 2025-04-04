import React from 'react';

export interface CartItemType {
    id: string;
    name: string;
    price: number;
    amount: number;
}

export interface CartContextType {
    items: CartItemType[];
    totalPrice: number;
    addItem: (item: CartItemType) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
}

const CartContext = React.createContext<CartContextType>({
    items: [],
    totalPrice: 0,
    addItem: () => {},
    removeItem: (id: string) => {},
    clearCart: () => {},
});


export default CartContext;