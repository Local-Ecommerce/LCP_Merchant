import React, { useState } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import { Search, ProductionQuantityLimits } from '@mui/icons-material';

import ProductInAddModalList from './ProductInAddModalList';

const Row = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${props => props.mb ? "10px" : null};
`;

const SearchBar = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border-color: #D8D8D8;
    border-style: solid;
    border-width: thin;
    height: 40px;
    padding: 0px 3px 0px 8px;
    background-color: #ffffff;
`;

const Input = styled.input`
    padding: 4px;
    flex-grow: 1;
    background-color: transparent;
    outline: none;
    border: none;
    margin-right: 8px;

    &:focus {
    outline: 0;
    }
`;

const Button = styled.button`
    height: 33px;
    width: 70px;
    background-color: ${props => props.theme.blue};
    border-style: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }

    &:active {
        transform: translateY(1px);
    }
`;

const StyledSearchIcon = styled(Search)`
    && {
        color: grey;
    }
`;

const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const ModalTitle = styled.h4`
    color: #212529;
    border-bottom: 1px solid #cfd2d4;
    margin: 0px;
    padding: 20px;
`;

const ModalContentWrapper = styled.div`
    padding: 20px;
    min-height: 200px;
    max-height: 50vh;
    overflow-y: auto;
`;

const ModalButtonWrapper = styled.div`
    border-top: 1px solid #cfd2d4;
    padding: 20px;
`;

const ModalButton = styled.button`
    min-width: 80px;
    padding: 10px;
    margin-left: 10px;
    background: ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.white};
    color: ${props => props.red || props.blue ? props.theme.white : props.theme.grey};
    border: 1px solid ${props => props.red ? props.theme.red : props.blue ? props.theme.blue : props.theme.greyBorder};
    border-radius: 4px;
    text-align: center;
    font-size: 1rem;
    float: right;
    font-size: 14px;
    font-weight: 600;

    &:hover {
    opacity: 0.8;
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(1px);
    }
`;

const NoProductWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: auto;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
`;

const StyledProductIcon = styled(ProductionQuantityLimits)`
    && {
        font-size: 144px;
        color: #D8D8D8;
        margin: 10px;
    }
`;

const NoProductTitle = styled.div`
    margin-bottom: 25px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    color: ${props => props.theme.grey};
`;

const NoProductButton = styled(Link)`
    border-radius: 5px;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    background-color: ${props => props.theme.blue};
    color: white;
    font-weight: 400;
    font-size: 14px;
    text-decoration: none;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '60%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};

const AddItemModal = ({ display, toggle, stock, saveItem, handleToggleChecked }) => {
    const [search, setSearch] = useState('');

    const handleClearSearch = () => {
        setSearch('');
        document.getElementById('search').value = '';
    }

    const handleSaveItem = () => {
        saveItem(stock.filter((item) => item.checked === true ));
        toggle();
    }

    const handleToggle = () => {
        setSearch('');
        toggle();
    }

    return (
        <Modal isOpen={display} onRequestClose={handleToggle} style={customStyles} ariaHideApp={false}>
            <ModalWrapper>
                <ModalTitle>Thêm sản phẩm</ModalTitle>

                <ModalContentWrapper>
                   {
                       stock && stock.length ?
                        <>
                            <Row mb>
                                <SearchBar>
                                    <StyledSearchIcon />
                                    <Input id="search" placeholder="Tìm kiếm sản phẩm" onChange={event => setSearch(event.target.value)}/>
                                    <Button onClick={handleClearSearch}>Xóa</Button>
                                </SearchBar>
                            </Row>

                            <ProductInAddModalList
                                currentItems={stock}
                                search={search}
                                handleToggle={handleToggleChecked}
                            />
                        </>
                        :
                        <NoProductWrapper>
                                <StyledProductIcon />
                                <NoProductTitle>Bạn hiện chưa có sản phẩm</NoProductTitle>
                                <NoProductButton to={"/addProduct"}> Tạo sản phẩm </NoProductButton>
                        </NoProductWrapper>
                   }
                </ModalContentWrapper>

                <ModalButtonWrapper>
                    {
                        stock && stock.length ?
                        <ModalButton blue onClick={handleSaveItem}>Lưu</ModalButton>
                        :
                        null
                    }
                    
                    <ModalButton onClick={handleToggle}>Hủy</ModalButton>
                </ModalButtonWrapper>
            </ModalWrapper>
        </Modal>
    )
};

export default AddItemModal;