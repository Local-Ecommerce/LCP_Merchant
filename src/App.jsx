import styled from "styled-components";
import React from 'react';

import Header  from './pages/Header';
import Sidebar from './pages/Sidebar';
import Home  from './pages/Home';

import Menu from './pages/Menu/Menu';

import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

const HeaderWrapper = styled.div`
    position:absolute;
    left:0; right:0;
    height: 62px;
`;

const SidebarWrapper = styled.div`
    position:absolute;
    left:0; top:0px; bottom: 0;
    width: 245px;
`;

const ContentWrapper = styled.div`
  position: absolute;
  left:245px; top:62px; right:0; bottom:0;
`;

const SidebarLayout = () => (
	<>
		<SidebarWrapper>
			<Sidebar />
		</SidebarWrapper>

		<HeaderWrapper>
			<Header />
		</HeaderWrapper>
		
		<ContentWrapper>
			<Outlet />
		</ContentWrapper>
	</>
  );

const App = () => {
    return (
		<Router>
			<Routes>
				<Route element={<SidebarLayout/>}>
					<Route exact path="/" element={<Home />} />
					<Route path="/menus" element={<Menu />} />
				</Route>
			</Routes>
		</Router>
    )
}

export default App;