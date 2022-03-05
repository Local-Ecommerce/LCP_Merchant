import ReactDOM from "react-dom";
import React, { useState, useRef } from 'react';
import styled from "styled-components";
import Modal from 'react-modal';
import { Search, ArrowRight, ArrowLeft } from '@mui/icons-material';
import { arrayMoveImmutable as arrayMove } from "array-move";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import _ from "lodash";

const Row = styled.div`
    display: flex;
    align-items: center;
`;

const FlexDirection = styled.div`
    display: flex;
    flex-direction: column;
`;

const FormLabel = styled.div`
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 10px;
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
    display: flex;
    align-items: center;
    height: 60vh;
`;

const LeftWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-flow: column;
    height: 100%;
`;

const RightWrapper = styled(LeftWrapper)`
`;

const StyledArrowLeftIcon = styled(ArrowLeft)`
    && {
        margin: 15px;
        font-size: 30px;
        border-radius: 20px;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
            background-color: ${props => props.theme.greyBorder};
        }

        &:active {
            transform: translateY(1px);
        }
    }
`;

const StyledArrowRightIcon = styled(ArrowRight)`
    && {
        margin: 15px;
        font-size: 30px;
        border-radius: 20px;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
            background-color: ${props => props.theme.greyBorder};
        }

        &:active {
            transform: translateY(1px);
        }
    }
`;

const ListWrapper = styled.div`
    margin-top: 15px;
    background-color: #f3f5f7;
    flex-grow: 1;
    border: 1px solid #d6d6d6;
    border-radius: 5px;
    padding: 20px;
    overflow: scroll;
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

const Grid = styled.div`
    height: 100%;
`;

const ItemWrapper = styled.div`
    font-size: 13px;
    display: inline-block;
    padding: 4px 10px 4px 4px;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
    text-decoration: none;
    cursor: pointer;
    background-color: #fff;
    border-radius: 20px;
    margin: 0px 5px 5px 0px;
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
    opacity: 0.9;
    background-color: ${props => props.theme.disabled};
    }

    &:focus {
    outline: 0;
    }

    &:active {
    transform: translateY(1px);
    }
`;

const Image = styled.img`
    vertical-align: middle;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10px;
`;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '15%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px'
    },
};

const SortableItem = SortableElement(({ item, area }) => (
    (
        item.ProductId === -1 ?
        <div></div> :
        <ItemWrapper>
            <Image src="../images/product1.png" alt="Loich Logo" />
            {item.ProductName}
        </ItemWrapper>
    )
));

const SortableList = SortableContainer(({ area, items, isDragging, search }) => (
    <Grid container>
        {!_.isEmpty(items) &&
            items.map((item, index) => (
                ((item.ProductName?.toLowerCase().includes(search)) ?
                    <SortableItem
                        area={area}
                        key={item.ProductId}
                        index={index}
                        item={item}
                        collection={area}
                        isDragging={isDragging}
                    /> 
                    : null
                )
            ))
        }
    </Grid>
));

const AddItemModal = ({ display, toggle, stockItems, menuItems, setStockItems, setMenuItems, getNewProducts }) => {
    const [searchStock, setSearchStock] = useState('');
    const [searchMenu, setSearchMenu] = useState('');

    const [draggingItem, setDraggingItem] = useState(null);
    const [draggingItemIndex, setDraggingItemIndex] = useState(null);
    const [targetOrderIndex, setTargetOrderIndex] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [sourceArea, setSourceArea] = useState(null);
    const [targetArea, setTargetArea] = useState(null);
    const enableRef = useRef();
    const disableRef = useRef();

    const handleAreaMouseEnter = (area) => {
        if (isDragging === true) {
          setTargetArea(area);
        } else {
          setSourceArea(area);
          setTargetArea(area);
        }
    };

    const handleDragStart = (e) => {
        if (sourceArea === "MENU") {
            setSearchStock('');
        } else if (sourceArea === "STOCK") {
            setSearchMenu('');
        }
        setIsDragging(true);
        if (sourceArea === "STOCK") {
            setDraggingItemIndex(e.index);
            setDraggingItem(stockItems[e.index]);
        } else if (sourceArea === "MENU") {
            if (targetArea === "MENU") {
                setDraggingItemIndex(e.index);
            }
            if (
                stockItems.length === 0 ||
                stockItems[stockItems.length - 1].ProductId !== -1
            ) {
                stockItems.push({
                    ProductId: -1,
                    ProductName: "placeholder"
                });
                setStockItems(stockItems);
            }
            setDraggingItem(menuItems[e.index]);
        }
    };
    
      const handleDragging = (e) => {
        if (
          draggingItem &&
          isDragging &&
          sourceArea === "MENU" &&
          targetArea === "STOCK"
        ) {
          setDraggingItem(null);
          const enableNodes = enableRef.current.container.children;
          const lastNodeIndex = enableNodes.length - 1;
          const lastNode = enableNodes[lastNodeIndex];
          ReactDOM.render(
                <ItemWrapper>
                    <Image src="../images/product1.png" alt="Loich Logo" />
                    {draggingItem.ProductName}
                </ItemWrapper>,
                disableRef.current.helper
            );
            enableRef.current.manager.active = {
                collection: "STOCK",
                index: lastNodeIndex
            };
            enableRef.current.handlePress(e);
            let pageXCount = 0.5;
            switch (enableNodes.length % 3) {
            case 1:
                pageXCount = 2.5;
                break;
            case 2:
                pageXCount = 1.5;
                break;
            default:
                break;
            }
            enableRef.current.initialOffset = {
                x: e.pageX - lastNode.clientWidth * pageXCount,
                y:
                e.pageY - (e.pageY - lastNode.offsetTop) + lastNode.clientHeight * 0.5
            };
            enableRef.current.handleMove(e);
        }
    };
    
    const handleDragOver = (e) => {
        if (
          isDragging &&
          sourceArea === "MENU" &&
          targetArea === "STOCK" &&
          e.collection === "STOCK"
        ) {
          setTargetOrderIndex(e.newIndex);
        }
    };
    
    const handleDragEnd = (e) => {
        if (
            targetArea === "STOCK" &&
            sourceArea === "MENU" &&
            e.collection === "MENU"
        ) {
            return;
        }
        if (stockItems[stockItems.length - 1].ProductId === -1) {
            stockItems.pop();
            setStockItems(stockItems);
        }
        if (targetArea === "MENU") {
            if (sourceArea === "STOCK") {
                menuItems.push(stockItems[e.oldIndex]);
                stockItems.splice(e.oldIndex, 1);
                setMenuItems([...menuItems]);
                setStockItems([...stockItems]);
            }
        } else if (targetArea === "STOCK") {
            if (sourceArea === "STOCK") {
                if (e.oldIndex !== e.newIndex) {
                    setStockItems(arrayMove(stockItems, e.oldIndex, e.newIndex));
                }
            } else {
                stockItems.splice(
                _.isNull(targetOrderIndex) ? stockItems.length : targetOrderIndex,
                0,
                menuItems[draggingItemIndex]
                );
                menuItems.splice(draggingItemIndex, 1);
                setStockItems([...stockItems]);
                setMenuItems([...menuItems]);
            }
        }
        setDraggingItemIndex(null);
        setTargetOrderIndex(null);
        setIsDragging(false);
        setSourceArea(targetArea);
        setDraggingItem(null);
    };

    const handleGetAllItems = () => {
        setMenuItems(menuItems.concat(stockItems));
        setStockItems([]);
    }

    const handleRemoveAllItems = () => {
        setStockItems(stockItems.concat(menuItems));
        setMenuItems([]);
    }

    const handleClearSearchStock = () => {
        setSearchStock('');
        document.getElementById('searchStock').value = '';
    }

    const handleClearSearchMenu = () => {
        setSearchMenu('');
        document.getElementById('searchMenu').value = '';
    }

    const handleGetNewProducts = () => {
        getNewProducts(menuItems);
        toggle();
    }

    return (
        <Modal isOpen={display} onRequestClose={toggle} style={customStyles} ariaHideApp={false}>
            <ModalWrapper>
                <ModalTitle>Thêm sản phẩm</ModalTitle>

                <ModalContentWrapper>
                    <LeftWrapper>
                        <FormLabel>Sản phẩm của bạn</FormLabel>
                        <Row>
                            <SearchBar>
                                <StyledSearchIcon />
                                <Input id="searchStock" placeholder="Tìm kiếm sản phẩm" onChange={event => setSearchStock(event.target.value)}/>
                                <Button onClick={handleClearSearchStock}>Xóa</Button>
                            </SearchBar>
                        </Row>

                        <ListWrapper onMouseEnter={() => handleAreaMouseEnter("STOCK")}>
                            <SortableList
                                axis="xy"
                                area="STOCK"
                                items={stockItems}
                                draggingItem={draggingItem}
                                isDragging={isDragging}
                                sourceArea={sourceArea}
                                targetArea={targetArea}
                                ref={enableRef}
                                selfRef={enableRef}
                                otherRef={disableRef}
                                onSortStart={handleDragStart}
                                onSortOver={handleDragOver}
                                onSortEnd={handleDragEnd}
                                search={searchStock}
                            />
                        </ListWrapper>
                    </LeftWrapper>

                    <FlexDirection>
                        <StyledArrowLeftIcon onClick={handleRemoveAllItems} />
                        <StyledArrowRightIcon onClick={handleGetAllItems} />
                    </FlexDirection>

                    <RightWrapper>
                        <FormLabel>Sản phẩm thuộc bảng giá</FormLabel>
                        <Row>
                            <SearchBar>
                                <StyledSearchIcon />
                                <Input id="searchMenu" placeholder="Tìm kiếm sản phẩm" onChange={event => setSearchMenu(event.target.value)}/>
                                <Button onClick={handleClearSearchMenu}>Xóa</Button>
                            </SearchBar>
                        </Row>

                        <ListWrapper onMouseEnter={() => handleAreaMouseEnter("MENU")}>
                            <SortableList
                                axis="xy"
                                area="MENU"
                                items={menuItems}
                                draggingItem={draggingItem}
                                isDragging={isDragging}
                                sourceArea={sourceArea}
                                targetArea={targetArea}
                                ref={disableRef}
                                selfRef={disableRef}
                                otherRef={enableRef}
                                onSortStart={handleDragStart}
                                onSortMove={handleDragging}
                                onSortEnd={handleDragEnd}
                                search={searchMenu}
                            />
                        </ListWrapper>
                    </RightWrapper>
                </ModalContentWrapper>

                <ModalButtonWrapper>
                    <ModalButton blue onClick={handleGetNewProducts}>Lưu</ModalButton>
                    <ModalButton onClick={toggle}>Hủy</ModalButton>
                </ModalButtonWrapper>
            </ModalWrapper>
        </Modal>
    )
};

export default AddItemModal;