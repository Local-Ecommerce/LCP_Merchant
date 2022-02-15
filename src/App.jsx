import styled from "styled-components";
import React from 'react';
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import Header  from './pages/Header';
import Sidebar from './pages/Sidebar';
import Home  from './pages/Home';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Product from './pages/Product/Product';
import AddProduct from './pages/Product/AddProduct';

import Menu from './pages/Menu/Menu';
import AddMenu from './pages/Menu/AddMenu';
import EditMenu from './pages/Menu/EditMenu';

import Detail from './pages/Setting/Detail';

import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";

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

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();

    return currentUser ? children : <Navigate to="/login" />;
}

const App = () => {
    return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route element={<SidebarLayout/>}>
						<Route exact path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />

						<Route path="/products" element={<PrivateRoute> <Product /> </PrivateRoute>} />
						<Route path="/addProduct" element={<PrivateRoute> <AddProduct /> </PrivateRoute>} />

						<Route path="/menus" element={<PrivateRoute> <Menu /> </PrivateRoute>} />
						<Route path="/addMenu" element={<PrivateRoute> <AddMenu /> </PrivateRoute>} />
						<Route path="/menu/:id" element={<PrivateRoute> <EditMenu /> </PrivateRoute>} />

						<Route path="/settings/detail" element={<PrivateRoute> <Detail /> </PrivateRoute>} />
					</Route>

					<Route path="/login" element={<Login />} />
				</Routes>
			</AuthProvider>
		</Router>
    )
}

export default App;