import React from 'react';

// interface contextType {
//     items: {id: string; name: string; amount: number; price: number;}[],
//     totalAmount: number;
//     addItem: (item: {})
// }

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: () => {},
    removeItem: (id) => {},
    clearCart: () => {},
});


export default CartContext;