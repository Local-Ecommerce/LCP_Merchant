import { Home, FormatListBulleted, ShoppingCart, Summarize, Settings, Person } from '@mui/icons-material';
import styled from 'styled-components';

const StyledHomeIcon = styled(Home)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;
const StyledProductIcon = styled(ShoppingCart)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;
const StyledOrderIcon = styled(Summarize)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;
const StyledMenuIcon = styled(FormatListBulleted)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;
const StyledSettingIcon = styled(Settings)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;
const StyledUserIcon = styled(Person)`
    && { font-size: 18px; margin: 0px 15px 0px 10px; }
`;

const SidebarData = [
    {
        title: 'Trang chủ',
        path: '/',
        icon: <StyledHomeIcon />,
    },
    {
        title: 'Đơn hàng',
        path: '/orders',
        icon: <StyledOrderIcon />,
    },
    {
        title: 'Bảng giá',
        path: '/menus',
        icon: <StyledMenuIcon />
    },
    {
        title: 'Sản phẩm',
        path: '/products',
        icon: <StyledProductIcon />
    },
    {
        title: 'Thông tin cửa hàng',
        path: '/storeDetail',
        icon: <StyledSettingIcon />,
    },
    {
        title: 'Thông tin cá nhân',
        path: '/userProfile',
        icon: <StyledUserIcon />,
    }
];

export default SidebarData;