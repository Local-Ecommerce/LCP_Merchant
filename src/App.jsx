import React from 'react';
import styled from "styled-components";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAuth } from "./contexts/AuthContext";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import Home  from './pages/Home';
import Login from './pages/Login';
import Header  from './pages/Header';
import Sidebar from './pages/Sidebar';
import PageNotFound from './pages/PageNotFound';

import Product from './pages/Product/Product';
import AddProduct from './pages/Product/AddProduct';

import Menu from './pages/Menu/Menu';
import AddMenu from './pages/Menu/AddMenu';
import EditMenu from './pages/Menu/EditMenu';

import Detail from './pages/Setting/Detail';

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

const SidebarLayout = () => (
	<>
        <ToastContainer />

		<ContentWrapper>
			<Outlet />
		</ContentWrapper>

		<SidebarWrapper>
			<Sidebar />
		</SidebarWrapper>

		<HeaderWrapper>
			<Header />
		</HeaderWrapper>
	</>
);

const RequireLoggedIn = ({ children }) => {
    const { logout } = useAuth();
    const user = JSON.parse(localStorage.getItem('USER'));
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    const expiredTime = localStorage.getItem("EXPIRED_TIME");
    const isToggle = localStorage.getItem("IS_TOGGLE");

    if (typeof user === 'undefined' || user === null 
     || typeof accessToken === 'undefined' || accessToken === null 
     || typeof refreshToken === 'undefined' || refreshToken === null 
     || typeof expiredTime === 'undefined' || expiredTime === null
     || typeof isToggle === 'undefined' || isToggle === null || isToggle === "1") {
        logout();
        return <Navigate to="/login" />;
    };
    return children;
}

const App = () => {
    return (
		<Routes>
			<Route element={<RequireLoggedIn> <SidebarLayout/> </RequireLoggedIn>}>
				<Route 
					exact path="/" 
					element={<RequireLoggedIn> <Home /> </RequireLoggedIn>} 
				/>

				<Route 
					path="/products" 
					element={<RequireLoggedIn> <Product /> </RequireLoggedIn>} 
				/>

				<Route path="/addProduct" 
				element={<RequireLoggedIn> <AddProduct /> </RequireLoggedIn>} 
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
					path="/settings/detail" 
					element={<RequireLoggedIn> <Detail /> </RequireLoggedIn>} 
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