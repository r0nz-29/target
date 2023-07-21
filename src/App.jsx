import './App.css'
import {Route, Routes} from "react-router";
import SoloTest from "./pages/SoloTest/index.jsx";
import Home from './components/Header'
import Leader from './components/LeaderBoard/Leader'
import LeaderBoard from './components/LeaderBoard/Players'
import NavBar from './components/Navbar'
import MultiplayerTest from "./pages/MultiplayerTest/index.jsx";

function App() {
	return (
		<div>
			<NavBar/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/solo" element={<SoloTest/>}/>
				<Route path="/multiplayer" element={<MultiplayerTest/>}/>
				<Route path="/multiplayer/leaderboard" element={<><Leader/><LeaderBoard/></>}/>
			</Routes>
		</div>
	)
}

export default App
