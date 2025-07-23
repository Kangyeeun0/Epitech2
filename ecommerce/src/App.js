import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Header from './component/Header';
import Card from './pages/Card';
import Login from './pages/Login';
import Register from './pages/Register';
import MyCart from './pages/MyCart';

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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
