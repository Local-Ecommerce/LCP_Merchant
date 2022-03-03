import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "styled-components";

const theme = {
	red: "#dc3545",
	green: "#28a745",
	blue: "#17a2b8",
	black: "rgba(0, 0, 0, 0.87)",
	white: "#fff",
	dark: "#555",
	grey: "#808080",
	greyBorder: "#c4c4c4",
	disabled: "#d8d8d8",
	orange: "#ff9800",

	hover: "rgba(246, 246, 247, 1)",
};

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
