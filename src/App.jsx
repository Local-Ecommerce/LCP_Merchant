import React, { useState } from 'react';
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import { DateTime } from 'luxon';
import { ToastContainer } from 'react-toastify';
import { useAuth } from "./contexts/AuthContext";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import Home  from './pages/Home';
import Login from './pages/Login';
import Header  from './pages/Header';
import Sidebar from './pages/Sidebar';
import PageNotFound from './pages/PageNotFound';

import Order from './pages/Order';
import OrderDetail from './pages/OrderDetail';

import Product from './pages/Product';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

import Menu from './pages/Menu';
import AddMenu from './pages/AddMenu';
import EditMenu from './pages/EditMenu';

import UserProfile from './pages/UserProfile';
import StoreDetail from './pages/StoreDetail';

const HeaderWrapper = styled.div`
    position:absolute; position: fixed; 
    left:0; right:0;
    height: 62px;
`;

const SidebarWrapper = styled.div`
    position:absolute; position: fixed; 
    left:0; top:0px; bottom: 0;
    width: 245px;
`;

const ContentWrapper = styled.div`
    position: absolute;
    left:245px; top:62px; right:0; bottom:0;
`;

const SidebarLayout = ({ refresh, toggleRefresh }) => (
	<>
        <ToastContainer 
			style={{ width: "320px" }}
			autoClose={5000}
			position="top-center"
			pauseOnFocusLoss={false}
		/>

		<ContentWrapper>
			<Outlet />
		</ContentWrapper>

		<SidebarWrapper>
			<Sidebar refresh={refresh} toggleRefresh={toggleRefresh} />
		</SidebarWrapper>

		<HeaderWrapper>
			<Header refresh={refresh} toggleRefresh={toggleRefresh} />
		</HeaderWrapper>
	</>
);

const RequireLoggedIn = ({ children }) => {
    const { logout } = useAuth();
    const user = JSON.parse(localStorage.getItem('USER'));
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    const expiredTime = localStorage.getItem("EXPIRED_TIME");

    if ((user && user.RoleId === "R002")
	 || (user && user.RoleId === "R001" && user.Residents[0].Type !== "Merchant")
	 ||	typeof user === 'undefined' || user === null 
     || typeof accessToken === 'undefined' || accessToken === null 
     || typeof refreshToken === 'undefined' || refreshToken === null 
     || typeof expiredTime === 'undefined' || expiredTime === null
	 || DateTime.fromISO(expiredTime).diffNow().toObject().milliseconds < 0) {
        logout();
        return <Navigate to="/login" />;
    };
    return children;
}

const App = () => {
	const [refresh, setRefresh] = useState(false);
    const toggleRefresh = () => { setRefresh(!refresh) };

    return (
		<Routes>
			<Route element={<RequireLoggedIn> <SidebarLayout refresh={refresh} toggleRefresh={toggleRefresh}/> </RequireLoggedIn>}>
				<Route 
					exact path="/" 
					element={<RequireLoggedIn> <Home /> </RequireLoggedIn>} 
				/>

				<Route 
					path="/orders" 
					element={<RequireLoggedIn> <Order /> </RequireLoggedIn>} 
				/>

				<Route 
					path="/order/:id" 
					element={<RequireLoggedIn> <OrderDetail refresh={refresh} toggleRefresh={toggleRefresh} /> </RequireLoggedIn>} 
				/>

				<Route 
					path="/products" 
					element={<RequireLoggedIn> <Product /> </RequireLoggedIn>} 
				/>

				<Route 
					path="/addProduct" 
					element={<RequireLoggedIn> <AddProduct /> </RequireLoggedIn>} 
				/>

				<Route 
					path="/product/:id" 
					element={<RequireLoggedIn> <EditProduct /> </RequireLoggedIn>} 
				/>

				<Route 
					path="/menus" 
					element={<RequireLoggedIn> <Menu /> </RequireLoggedIn>} 
				/>

				<Route 
					path="/addMenu" 
					element={<RequireLoggedIn> <AddMenu /> </RequireLoggedIn>} 
				/>

				<Route 
					path="/menu/:id" 
					element={<RequireLoggedIn> <EditMenu /> </RequireLoggedIn>} 
				/>

				<Route 
					path="/storeDetail" 
					element={<RequireLoggedIn> <StoreDetail /> </RequireLoggedIn>} 
				/>

				<Route 
					exact path="/userProfile" 
					element={<RequireLoggedIn> <UserProfile refresh={refresh} toggleRefresh={toggleRefresh} /> </RequireLoggedIn>}
				/>
			</Route>

			<Route 
				path="/login" 
				element={<Login />} 
			/>

			<Route 
				path="*" 
				element={<PageNotFound />}
			/>
		</Routes>
    )
}

export default App;