import { useEffect, useState } from 'react';
import './myCart.css';
import { useNavigate } from 'react-router-dom';

export default function MyCart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    // localStorage에서 cart 불러오기
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        console.log('cart', storedCart);
    }, []);

    // cart가 바뀔 때마다 localStorage에 저장
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const increaseQuantity = (id) => {
        setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
    };

    const decreaseQuantity = (id) => {
        setCart((prev) =>
            prev.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
        );
    };

    return (
        <div className="myCart-total">
            <div>
                <h1 className="mycart-title">Your cart</h1>
            </div>
            <div>
                {cart.length === 0 ? (
                    <div className="mycart-empty-div">
                        <p className="mycart-empty-text">Your cart is empty</p>
                        <button className="mycart-continue-button" onClick={() => navigate('/')}>
                            Continue shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mycart-title2-div">
                            <p className="mycart-product-title">PRODUCTS</p>

                            <p className="mycart-quantity-title">QUANTITY</p>
                            <p className="mycart-product-title">TOTAL</p>
                        </div>
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item-container">
                                <div style={{ display: 'flex', width: '400px' }}>
                                    <img src={item.image} className="cart-img" />
                                    <p className="cart-item-text">{item.name} </p>
                                </div>
                                <div className="cart-quantity-control">
                                    <button onClick={() => decreaseQuantity(item.id)} className="cart-quantity-button">
                                        —
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => increaseQuantity(item.id)}
                                        className="cart-quantity-button-plus"
                                    >
                                        ＋
                                    </button>
                                </div>
                                <p className="cart-item-price">{item.price * item.quantity}</p>
                                {/* <button onClick={() => removeFromCart(item.id)}>제거</button> */}
                            </div>
                        ))}
                    </>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="mycart-bottom-div ">
                    {cart.length > 0 && (
                        <p className="cart-subtotal-text">
                            <span className="cart-subtotal"> Subtotal:</span>{' '}
                            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}
                        </p>
                    )}
                </div>
                <div style={{ textAlign: 'end', fontWeight: '200' }}>Taxes and shipping calculated at checkout</div>
                <button className="mycart-checkout-button">Check Out</button>
            </div>
        </div>
    );
}

//acc: 누적 합계
