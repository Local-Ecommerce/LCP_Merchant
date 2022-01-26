import {
    ArrowDropDown,
    ArrowDropUp,
    Home,
    ShoppingCart,
    House,
    BarChart,
    Settings,
    Logout,
} from '@mui/icons-material';

const SidebarData = [
    {
        title: 'Trang chủ',
        path: '/',
        icon: <Home />,
    },
    {
        title: 'Sản phẩm',
        path: null,
        icon: <ShoppingCart />,
        iconClosed: <ArrowDropDown />,
        iconOpened: <ArrowDropUp />,

        subNav: [
            {
                title: 'Tất cả sản phẩm',
                path: '/',
                icon: ''
            },
            {
                title: 'Tạo mới sản phẩm',
                path: '/',
                icon: '',
            },
        ]
    },
    {
        title: 'Cửa hàng',
        path: null,
        icon: <House />,
        iconClosed: <ArrowDropDown />,
        iconOpened: <ArrowDropUp />,

        subNav: [
            {
                title: 'Bảng giá',
                path: '/',
                icon: '',
            },
            {
                title: 'Bộ sưu tập',
                path: '/',
                icon: '',
            },
        ]
    },
    {
        title: 'Phân tích',
        path: '/',
        icon: <BarChart />
    },
    {
        title: 'Cài đặt',
        path: '/',
        icon: <Settings />
    },
    {
        title: 'Log out',
        path: '/',
        icon: <Logout />
    }
];

export default SidebarData;