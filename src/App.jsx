import './App.css'
import {Route, Routes} from "react-router";
import SoloTest from "./pages/SoloTest/index.jsx";
import Leader from './components/LeaderBoard/Leader'
import LeaderBoard from './components/LeaderBoard/Players'
import NavBar from './components/Navbar'
import Toggleaccount from './components/Account';
import MultiplayerTest from "./pages/MultiplayerTest/index.jsx";
import Dashboard from "./components/Dashboard/index.jsx";
import Home from "./pages/Home/index.jsx";

function App() {
	return (
		<div className="flex flex-col justify-center min-h-screen">
			<div className="bg-transparent absolute top-0 left-0 w-full h-full dotted-background z-[-10]">
			</div>
			<NavBar/>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/solo" element={<SoloTest/>}/>
				<Route path="/dashboard" element={<Dashboard/>}/>
				<Route path="/login" element={<Toggleaccount/>}/>
				<Route path="/multiplayer" element={<MultiplayerTest/>}/>
				<Route path="/multiplayer/leaderboard" element={<><Leader/><LeaderBoard/></>}/>
			</Routes>
		</div>
	)
}

export default App
