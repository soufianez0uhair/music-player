import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPlaylistById } from "../redux/tracksSlice";
import Track from "../components/Track";

const Playlist = () => {
    const {playlistId} = useParams();
    const playlist = useSelector((state) => selectPlaylistById(state,Number(playlistId)));
    const tracks = playlist.tracks.map(track => (
        <Track track={track} key={track.id} />
    ))
    return (
        <div className="tracks">
            {tracks}
        </div>
    )
}

export default Playlist;