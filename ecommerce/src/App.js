import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Header from './component/Header';
import Card from './pages/Card';
import Login from './pages/Login';
import Register from './pages/Register';
import MyCart from './pages/MyCart';
import CardList from './component/CardList';
import Contact from './pages/Contact';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/product/:id" element={<Card />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<Register />} />
                <Route path="/myCart" element={<MyCart />} />
                <Route path="/cardList" element={<CardList />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
