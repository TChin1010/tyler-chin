import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MusicProvider } from "./utils/contexts/MusicContext";
import './App.css';
import { AudioPlayerProvider } from 'react-use-audio-player';


function App() {
	return (
		<React.Suspense fallback="loading">
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
