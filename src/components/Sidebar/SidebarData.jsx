import {
    ArrowDropDown,
    ArrowDropUp,
    Home,
    ShoppingCart,
    House,
    BarChart,
    Settings,
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
                title: 'Danh sách sản phẩm',
                path: '/products',
                icon: ''
            },
            {
                title: 'Tạo mới sản phẩm',
                path: '/addProduct',
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
                path: '/menus',
                icon: '',
            },
            {
                title: 'Tạo bảng giá',
                path: '/addMenu',
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
        icon: <Settings />,
        iconClosed: <ArrowDropDown />,
        iconOpened: <ArrowDropUp />,

        subNav: [
            {
                title: 'Thông tin cửa hàng',
                path: '/settings/detail',
                icon: '',
            }
        ]
    }
];

export default SidebarData;