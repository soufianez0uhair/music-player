import ReactAudioPlayer from "react-audio-player";

import { useSelector } from "react-redux";
import { selectCurrentTrack } from "../redux/tracksSlice";

const AudioPlayer = () => {
    const currentTrack = useSelector(selectCurrentTrack);
        return (
            <div className="currentTrack">
                <img src={currentTrack && currentTrack.album.cover_big} alt={currentTrack && currentTrack.title + ' cover'} className="currentTrack__cover" />
                <div className="currentTrack__details">
                    <h3 className="currentTrack__title">{currentTrack && currentTrack.title}</h3>
                    <p className="currentTrack__artist">{currentTrack && currentTrack.artist.name}</p>
                </div>
                <ReactAudioPlayer
                    src={currentTrack && currentTrack.preview}
                    loop={true}
                    controls
                    className="audioPlayer"
                />
            </div>
        )    
}

export default AudioPlayer;