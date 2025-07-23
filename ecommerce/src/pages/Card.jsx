import { useNavigate, useParams } from 'react-router-dom';
import products from '../component/goods';
import './card.css';
import { useEffect, useState } from 'react';
import Modal from '../component/Modal';

export default function Card() {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const product = products.find((item) => item.id === Number(id)); // id는 string이므로 숫자로 변환 필요
    const [cart, setCart] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // localStorage에서 cart 불러오기
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        console.log('storedCart', storedCart);
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

        setIsModalOpen(true);
    };

    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    const onCloseModalCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        setIsModalOpen(false);
        navigate('/myCart');
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
                    <button className="card-cart-button" onClick={() => addToCart(product)}>
                        {' '}
                        Add to cart
                    </button>
                    <button className="card-paypal-button">
                        Pay with <img src="/img/paypal.png" className="card-paypal-img" />
                    </button>
                </div>
                {isModalOpen && (
                    <Modal isOpen={isModalOpen} onCloseCart={onCloseModalCart} onClose={() => setIsModalOpen(false)} />
                )}
            </div>
        </>
    );
}
