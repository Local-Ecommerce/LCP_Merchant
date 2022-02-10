import styled from "styled-components";

const Image = styled.img`
    width: 80px;
    height: 40px;
`;

const Logo = () => {
    return (
        <Image src='./images/lcp2.png' alt="Loich Logo" />
    )
};

export default Logo;