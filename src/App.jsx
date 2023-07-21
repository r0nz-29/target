import './App.css'
import {Route, Routes} from "react-router";
import SoloTest from "./pages/SoloTest/index.jsx";

function App() {
	return (
		<Routes>
			<Route path="/solo" element={<SoloTest />} />
		</Routes>
	)
}

export default App
