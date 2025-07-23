import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const ModalContainer = styled.div`
    // Modal을 구현하는데 전체적으로 필요한 CSS를 구현
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const ModalBackdrop = styled.div`
    // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
    z-index: 1000; //위치지정 요소
    position: fixed;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    flex-direction: row-reverse;
    align-items: flex-start;
    background-color: rgb(1, 1, 1, 0.5);
    /* opacity: calc(80%); */
    /* border-radius: 10px; */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const ModalContent = styled.div`
    background-color: white;
    /* border-radius: 8px; */
    box-shadow: inset;
    padding: 20px;
    position: relative;
    z-index: 100000;
    margin-top: 300px;
    width: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: calc(100%);
`;

export const ModalBtn = styled.button`
    background-color: var(--coz-purple-600);
    text-decoration: none;
    border: none;
    padding: 20px;
    color: white;
    /* border-radius: 30px; */
    cursor: grab;
`;

export const ViewCartBtn = styled(ModalBtn)`
    /* background-color: black; */
    color: black;
    border: 1px solid;
    /* border-radius: 10px; */
    /* text-decoration: none; */
    font-size: 20px;
    /* padding-right: 40px; */
    width: 300px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    /* margin-left: 80px; */
`;

export const ExitBtn = styled(ModalBtn)`
    background-color: black;
    color: white;
    /* border-radius: 10px; */
    /* text-decoration: none; */
    font-size: 20px;
    /* padding-right: 40px; */
    width: 300px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    /* margin-left: 80px; */
`;

export const Message = styled.p`
    color: black;
    margin-top: 40px;
    font-size: 20px;
`;

export default function Modal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const onClickCartButton = () => {
        navigate('/myCart');
    };

    return (
        <>
            <ModalContainer>
                <ModalBackdrop>
                    <ModalContent>
                        <Message>✓ Item added to your cart</Message>
                        <ViewCartBtn onClick={onClickCartButton}>View my cart</ViewCartBtn>

                        <ExitBtn onClick={onClose}>Continue shopping</ExitBtn>
                    </ModalContent>
                </ModalBackdrop>
            </ModalContainer>
        </>
    );
}
