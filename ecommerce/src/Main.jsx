import { useEffect, useState } from 'react';
import CardList from './component/CardList';
import './main.css';

function Main() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || []);
    }, []);

    // cart가 바뀔 때마다 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    // const removeFromCart = (id) => {
    //     setCart((prev) => prev.filter((item) => item.id !== id));
    // };

    return (
        <>
            <CardList addToCart={addToCart} />
        </>
    );
}

export default Main;
