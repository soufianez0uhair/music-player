import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import TracksList from "./pages/TracksList";
import AudioPlayer from "./components/AudioPlayer";
import FavoriteTracks from "./pages/FavoriteTracks";
import Playlist from "./pages/Playlist";

const App = () => {
  return (
    <Router basename="/music-player">
      <main className="App">
        <Header />
        <Routes>
          <Route path="/" element={<TracksList />} />
          <Route path="/favorites" element={<FavoriteTracks />} />
          <Route path="/playlist/:playlistId" element={<Playlist />} />
        </Routes>
        <AudioPlayer />
      </main>
    </Router>
  )
}

export default App;