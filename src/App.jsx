import styled from "styled-components";
import React from 'react';

import Header  from './pages/Header';
import Sidebar from './pages/Sidebar';

import Menu from './pages/Menu/Menu';

import { BrowserRouter as Router, Routes } from "react-router-dom";

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

const App = () => {
    return (
		<Router>
			<Routes>
				<SidebarWrapper>
					<Sidebar />
				</SidebarWrapper>
				
				<HeaderWrapper>
					<Header />
				</HeaderWrapper>

				<ContentWrapper>
				</ContentWrapper>
			</Routes>
		</Router>
    )
}

export default App;