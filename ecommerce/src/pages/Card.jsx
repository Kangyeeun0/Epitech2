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
                return [...prev, { ...product, quantity: quantity }];
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
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                        width: '400px',
                        aspectRatio: '1/1',
                        objectFit: 'cover',
                        margin: '50px',
                        border: 0,
                        borderRadius: '10px',
                    }}
                />

                <div style={{ width: '50%' }}>
                    <h2 className="card-name">{product.name}</h2>
                    <p
                        className="card-description"
                        style={{ margin: 0, fontFamily: 'Roboto, sans-serif', fontSize: '20px' }}
                    >
                        {product.description}
                    </p>
                    {product.id == '3' ? (
                        <div className="teacher-div">
                            <img src="/img/teacher/angel.png" className="teacher-img" />
                            <span className="rainbow-text">angel's Pick!</span>
                        </div>
                    ) : (
                        ''
                    )}
                    {product.id == '1' ? (
                        <div className="teacher-div">
                            <img src="/img/teacher/Camille.png" className="teacher-img" />
                            <span className="rainbow-text">Camille's Pick!</span>
                        </div>
                    ) : (
                        ''
                    )}
                    {product.id == '2' ? (
                        <div className="teacher-div">
                            <img src="/img/teacher/clery.png" className="teacher-img" />
                            <span className="rainbow-text">Clery's Pick!</span>
                        </div>
                    ) : (
                        ''
                    )}
                    {product.id == '4' ? (
                        <div className="teacher-div">
                            <img src="/img/teacher/Pierre.png" className="teacher-img" />
                            <span className="rainbow-text">Pirre's Pick!</span>
                        </div>
                    ) : (
                        ''
                    )}

                    <p className="card-price" style={{ fontWeight: 'bold' }}>
                        {product.price}€
                    </p>
                    <p style={{ margin: '0', fontSize: '22px', fontWeight: '500' }}>Quantity</p>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '5px',
                            border: '1px solid',
                            width: 'fit-content',
                            backgroundColor: 'white',
                        }}
                    >
                        <button onClick={handleDecrease} className="card-quantity-button">
                            –
                        </button>
                        <span
                            style={{
                                margin: '0 10px',
                                fontSize: '25px',
                                fontFamily: 'Roboto, sans-serif',
                                width: '25px',
                                textAlign: 'center',
                            }}
                        >
                            {quantity}
                        </span>
                        <button onClick={handleIncrease} className="card-quantity-button2">
                            +
                        </button>
                    </div>
                    <p
                        style={{
                            marginTop: '10px',
                            fontSize: '28px',
                            fontWeight: 'bold',
                        }}
                    >
                        Total: {(parseFloat(product.price) * quantity).toFixed(2)}€
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
