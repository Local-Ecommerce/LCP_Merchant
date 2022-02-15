import React, { useState } from 'react';
import styled from 'styled-components';
import { Delete, Palette, AddCircleOutline, SquareFoot, Scale } from '@mui/icons-material';
import { TextField, InputAdornment } from '@mui/material';
import { useEffect } from 'react';

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.spacebetween ? "space-between" : null};
`;

const OptionWrapper = styled.div`
    border-top: 1px solid #d6d6d6;
    border-bottom: 1px solid #d6d6d6;
    margin: -1px -30px;
    padding: 20px 30px;
`;

const OptionLabel = styled.div`
    margin-top: ${props => props.mt ? "13px" : "0px"};
    margin-bottom: 7px;
    font-size: 13px;
    color: #6c6c6c;
`;

const StyledOptionTextField = styled(TextField)`
    && {
        margin-bottom: 7px;
        width: 500px;
    }
`;

const StyledDeleteIcon = styled(Delete)`
    && {
        color: grey;
        margin-left: 10px;
        margin-bottom: ${props => props.mb ? "7px" : "0px"};
    }
`;

const StyledColorIcon = styled(Palette)`
    && {
        font-size: 18px;
    }
`;

const StyledSizeIcon = styled(SquareFoot)`
    && {
        font-size: 18px;
    }
`;

const StyledWeightIcon = styled(Scale)`
    && {
        font-size: 18px;
    }
`;

const Button = styled.button`
    display: block;
    border-radius: 5px;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border: 1px solid ${props => props.white ? props.theme.greyBorder : props.theme.bg};
    background: ${props => props.white ? "white" : props.theme.bg};
    color: ${props => props.white ? props.theme.grey : "white"};
    font-weight: 600;

    &:active {
    transform: translateY(1px);
    }

    &:hover {
    opacity: 0.8;
    }
`;

const AddOptionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 10px;
    width: 500px;
    border-radius: 5px;
    border: 2px dashed ${props => props.theme.bg};
    color: ${props => props.theme.bg};
    background-color: white;
    margin: 20px 0px;

    &:active {
        border: 2px solid ${props => props.theme.bg};
    }

    &:hover {
        opacity: 0.8;
        background-color: #E8E8E8;
    }
`;

const StyledAddIcon = styled(AddCircleOutline)`
    && {
        font-size: 20px;
        margin-right: 5px;
    }
`;

const ProductOption = ({ type }) =>  {
    const [display, toggleDisplay] = useState(false);
    const [values, setValues] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(values);
    }, [values]);

    const changeValue = (e) => {
        const { name, value } = e.target;
        let newValues = [...values];
        let index = newValues.findIndex(obj => parseInt(obj.name) === parseInt(name));
        let error = (newValues.find(obj => obj.value === value) ? "Tùy chọn đã tồn tại" : "");
        newValues[index] = { name, value, error };
        setValues(newValues);
    }

    const addValue = (newValue) => {
        setCount(count + 1);
        setValues(values => [...values, newValue]);
    }

    const removeValue = (name) => {
        if (name !== -1) {
            setValues(values.filter((item) => {
                return item.name !== name
            }));
        }
    }

    let typeLabel = '';
    let typeIcon = '';
    switch (parseInt(type)) {
        case 1:
            typeLabel = 'Màu sắc';
            typeIcon = <StyledColorIcon />
            break;
        case 2:
            typeLabel = 'Kích thước';
            typeIcon = <StyledSizeIcon />
            break;
        case 3:
            typeLabel = 'Trọng lượng';
            typeIcon = <StyledWeightIcon />
            break;
        default:
            typeLabel = 'Wrong type';
            typeIcon = <StyledDeleteIcon />
            break;
    }

    return (
        <>
            {display ? 
            <OptionWrapper>
                <OptionLabel>Tên tùy chọn</OptionLabel>
                <Row>
                    <StyledOptionTextField size="small" value={typeLabel}
                        InputProps={{
                        style: {fontSize: 14}, 
                        readOnly: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                {typeIcon}
                            </InputAdornment>
                        ),
                    }}/>
                    <StyledDeleteIcon onClick={() => toggleDisplay(!display)} />
                </Row>

                <OptionLabel mt>Giá trị tùy chọn</OptionLabel>
                {values ?
                    <>
                    {values.map((item, index) => {
                        return (
                            <Row>
                                <StyledOptionTextField
                                    size="small"
                                    inputProps={{style: {fontSize: 14}}}
                                    value={item.value} name={item.name}
                                    onChange={changeValue}
                                    error={item.error !== ''}
                                    helperText={item.error}
                                /> 
                                <StyledDeleteIcon mb onClick={() => removeValue(item.name)} />
                            </Row>
                        )
                    })}
                    </>
                : null }

                <Button white onClick={() => addValue({name: count, value: '', error: ''})}> Thêm giá trị mới </Button>
            </OptionWrapper>

            :

            <AddOptionButton onClick={() => toggleDisplay(!display)}>
                <StyledAddIcon/> 
                Thêm tùy chọn {typeLabel.toLowerCase()}
            </AddOptionButton>
            }
        </>
    )
}

export default ProductOption;