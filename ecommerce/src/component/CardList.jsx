import { useLocation, useNavigate } from 'react-router-dom';
import './cardList.css';
import products from './goods';
import { useEffect, useState } from 'react';

export default function CardList() {
    const navigate = useNavigate();
    const location = useLocation();
    const brand = location?.state;
    const [brandProduct, setBrandProduct] = useState([]);

    useEffect(() => {
        console.log('Brand', brand);
        if (brand) {
            const filtered = products.filter((product) => product.brand === brand);
            setBrandProduct(filtered);
        } else {
            setBrandProduct(products);
        }
    }, [brand]);

    return (
        <>
            <div className="cardList-card-total">
                {brandProduct?.map((product) => (
                    <div
                        key={product.id}
                        className="cardList-card-div"
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        <img src={product.image} alt={product.name} className="cardList-card-img" />
                        <div className="cardList-card-container">
                            <span className="cardList-goods-title" style={{ fontWeight: 'bold' }}>
                                {product.name}
                            </span>
                        </div>
                        <span className="cardList-goods-price">{product.price}€</span>
                    </div>
                ))}
            </div>
        </>
    );
}
