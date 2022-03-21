import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Close, AddPhotoAlternate, Add } from '@mui/icons-material';

const ImageListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
`;

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    margin: 0px 35px 20px 0px;
    position: relative;
`;

const Image = styled.img`
    object-fit: contain;
    width: 108px;
    height: 108px;
    margin-bottom: 10px;
    display: ${props => props.display === "true" ? null : "none"};
    cursor: pointer;
`;

const StyledPhotoIcon = styled(AddPhotoAlternate)`
    && {
        cursor: pointer;
        border: 2px dashed #727272;
        padding: 40px;
        border-radius: 5px;
        color: #383838;
        margin-bottom: 10px;

        &:active {
            transform: translateY(1px);
        }

        &:hover {
            opacity: 0.8;
            background-color: #E8E8E8;
        }
    }
`;

const StyledAddIcon = styled(Add)`
    && {
        cursor: pointer;
        border: 2px dashed #727272;
        padding: 40px;
        border-radius: 5px;
        color: #383838;
        margin-bottom: 10px;

        &:active {
            transform: translateY(1px);
        }

        &:hover {
            opacity: 0.8;
            background-color: #E8E8E8;
        }
    }
`;

const StyledCloseButton = styled(Close)`
    && {
        position: absolute;
        padding: 2px;
        background: rgba(0,0,0,0.3);
        border-radius: 25px;
        color: white;
        font-size: 20px;
        top: -10px;
        right: -10px;
        cursor: pointer;

        &:active {
            transform: translateY(1px);
        }

        &:hover {
            opacity: 0.8;
            background-color: ${props => props.theme.dark};
        }
    }
`;

const HiddenInputFile = styled.input`
    opacity: 0;
    position: absolute;
    z-index: -1;
`;

const ImageUpload = ({ images, setImages, handleSetImage, handleRemoveImage }) =>  {
    const [index, setIndex] = useState(1);

    useEffect(() => {
        images.forEach(item => {
            if (item.image.startsWith('https://firebasestorage.googleapis.com/')) {
                document.getElementById(item.name).src = item.image;
            }
        })
        setIndex(images.length);
    }, [])

    const addImage = () => {
        if (Object.keys(images).length) {
            setImages(prev => [...prev, { name: index, image: '' }]);
            setIndex(index + 1);
        }
    }

    const removeBlankImage = (name) => {
        setImages(images.filter((item) => {
            return item.name !== name
        }));
    }

    return (
        <ImageListWrapper>
            <ImageWrapper>
                {
                    images[0].image === '' ?
                    <label>
                        <HiddenInputFile type="file" name={images[0].name} accept="image/png, image/jpeg" onChange={handleSetImage} />
                        <StyledPhotoIcon />
                    </label>
                    :   <StyledCloseButton onClick={() => handleRemoveImage(images[0].name)} />
                }
                <Image id={images[0].name} src={images[0].image} display={images[0].image === '' ? "false" : "true"} />
                Ảnh bìa
            </ImageWrapper>

            {
                images && images.length > 1 ?
                images.slice(1).map((image, index) => {
                    return <ImageWrapper key={index}>
                        {
                            image.image === '' ?
                            <>
                                <StyledCloseButton onClick={() => removeBlankImage(image.name)} />
                                <label>
                                    <HiddenInputFile type="file" name={image.name} accept="image/png, image/jpeg" onChange={handleSetImage} />
                                    <StyledPhotoIcon />
                                </label>
                            </>
                            :   <StyledCloseButton onClick={() => handleRemoveImage(image.name)} />
                        }
                        <Image id={image.name} src={image.image} display={image.image === '' ? "false" : "true"} />
                        Hình ảnh {index+1}
                    </ImageWrapper>
                })
                : null
            }

            <ImageWrapper>
                <StyledAddIcon onClick={addImage} />
                Thêm ảnh
            </ImageWrapper>
        </ImageListWrapper>
    )
}

export default ImageUpload;