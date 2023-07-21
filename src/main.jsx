import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "@fontsource/jetbrains-mono";
import {BrowserRouter} from "react-router-dom"; // Defaults to weight 400

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>
)
