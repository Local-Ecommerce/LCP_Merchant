import styled from "styled-components";

const Image = styled.img`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const Avatar = () => {
    return (
        <Image src="./images/user.png" alt="Loich Logo" />
    )
};

export default Avatar;