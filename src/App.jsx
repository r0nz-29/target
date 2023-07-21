import './App.css'
import { Route, Routes } from "react-router";
import SoloTest from "./pages/SoloTest/index.jsx";
import Home from './components/Header'
import Leader from './components/LeaderBoard/Leader'
import LeaderBoard from './components/LeaderBoard/Players'
import NavBar from './components/Navbar'
import Toggleaccount from './components/Account';
import DataProvider from './context/DataProvider';
import MultiplayerTest from "./pages/MultiplayerTest/index.jsx";
import Faqs from './components/Faqs';
import DashBoard from './components/DashBoard/DashBoard';

function App() {
	
	return (
		<DataProvider>
			<NavBar/>
			
			<Routes>
				<Route path="/" element={ <Home/> }/>
				<Route path="/faqs" element={ <Faqs/> }/>
				<Route path="/dashboard" element={ <DashBoard/> }/>
				<Route path="/solo" element={ <SoloTest/> }/>
				<Route path="/login" element = { <Toggleaccount/> }/>
				<Route path="/multiplayer" element={<MultiplayerTest/>}/>
				<Route path="/multiplayer/leaderboard" element={<><Leader/><LeaderBoard/></>}/>
			</Routes>
		</DataProvider>
	)
}

export default App
