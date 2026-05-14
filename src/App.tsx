import React from 'react';
import Home from './pages/Home';
import LoadingScreen from './widgets/LoadingScreen';
import { AudioPlayerProvider } from 'react-use-audio-player';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MusicProvider } from "./utils/contexts/MusicContext";
import './App.css';


function App() {
	return (
		<React.Suspense fallback={<LoadingScreen color='white'/>}>
			<AudioPlayerProvider>
				<MusicProvider>
					<Router>
						<Routes>
							<Route path="/" element={<Home />} />
						</Routes>
					</Router>
				</MusicProvider>
			</AudioPlayerProvider>
		</React.Suspense>
	)
}

export default App
