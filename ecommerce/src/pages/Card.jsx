import { useParams } from 'react-router-dom';
import products from '../component/goods';
import './card.css';
import { useState } from 'react';

export default function Card() {
    const [quantity, setQuantity] = useState(0);
    const { id } = useParams();
    const product = products.find((item) => item.id === Number(id)); // id는 string이므로 숫자로 변환 필요

    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    console.log('product', product);
    return (
        <>
            <div className="card-total">
                <img src={product.image} alt={product.name} style={{ width: '400px', marginRight: '20px' }} />
                <div>
                    <h2 className="card-name">{product.name}</h2>
                    <p className="card-price">{product.price}</p>
                    <p style={{ margin: '0', fontFamily: 'Roboto, sans-serif', fontWeight: 200 }}>Quantity</p>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                        <button onClick={handleDecrease} className="card-quantity-button">
                            –
                        </button>
                        <span
                            style={{
                                margin: '0 10px',
                                fontSize: '25px',
                                fontWeight: 200,
                                fontFamily: 'Roboto, sans-serif',
                            }}
                        >
                            {quantity}
                        </span>
                        <button onClick={handleIncrease} className="card-quantity-button">
                            +
                        </button>
                    </div>
                    <p
                        style={{
                            marginTop: '10px',
                            fontSize: '25px',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 300,
                        }}
                    >
                        총 가격: {(parseFloat(product.price) * quantity).toFixed(2)}€
                    </p>
                    <button className="card-cart-button"> Add to cart</button>
                    <button className="card-paypal-button">
                        Pay with <img src="/img/paypal.png" className="card-paypal-img" />
                    </button>
                </div>
            </div>
        </>
    );
}
