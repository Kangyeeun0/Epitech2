import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import './register.css';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        id: '',
        password: '',
        // confirmPassword: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // 입력 값 변경 처리
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // 폼 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        // // 비밀번호 확인 체크
        // if (formData.password !== formData.confirmPassword) {
        //     setError('Passwords do not match.');
        //     setMessage('');
        //     return;
        // }

        try {
            // // 서버에 회원가입 요청 보내기
            // const response = await axios.post('https://your-api-endpoint.com/signup', {
            //     username: formData.username,
            //     id: formData.id,
            //     password: formData.password,
            // });
            const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
            const newUser = {
                username: formData.username,
                id: formData.id,
                password: formData.password,
            };
            localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

            // 성공 시 메시지 출력
            setMessage('Registration successful! You can now log in.');
            setError('');
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            });

            alert('Registration successful! You can now log in.');
            navigate('/');
        } catch (err) {
            // 에러 처리
            setError(err.response?.data?.message || 'An error occurred during registration.');
            setMessage('');
        }
    };

    return (
        <div className="loginWrap">
            <h1 className="register-title">Sign Up</h1>
            <div className="loginContents">
                <form onSubmit={handleSubmit}>
                    <div className="inputWrap">
                        <label className="register-label">
                            Your Name
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                    <div className="inputWrap">
                        <label>
                            ID
                            <input name="id" value={formData.id} id="memId" type="text" onChange={handleChange} />
                        </label>
                    </div>
                    <div className="inputWrap">
                        <label>
                            Password
                            <input
                                name="password"
                                value={formData.password}
                                id="memPw"
                                type="password"
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit" className="signup">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
