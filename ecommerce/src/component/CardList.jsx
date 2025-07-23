import { useNavigate } from 'react-router-dom';
import './cardList.css';
import products from './product';

export default function CardList() {
    const navigate = useNavigate();
    return (
        <>
            <div className="cardList-card-total">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="cardList-card-div"
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        <img src={product.image} alt={product.name} className="cardList-card-img" />
                        <div className="cardList-card-container">
                            <span className="cardList-goods-title">{product.name}</span>
                        </div>
                        <span className="cardList-goods-price">{product.price}</span>
                    </div>
                ))}
            </div>
        </>
    );
}
