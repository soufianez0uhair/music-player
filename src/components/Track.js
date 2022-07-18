import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { addTrackToFavorites,deleteTrackFromFavorites,changeCurrentTrack,selectFavTrackById,addPlaylist,selectAllPlaylists,addTrackToPlaylist } from '../redux/tracksSlice';

import {AiFillPlayCircle,AiOutlineStar,AiFillStar} from 'react-icons/ai';
import {GrAdd,GrFormClose} from 'react-icons/gr';

const Track = ({track}) => {
    const dispatch = useDispatch();

    const favTrack = useSelector((state) => selectFavTrackById(state,track.id));

    const [newPlaylist, setNewPlaylist] = useState({
        name: ''
    })

    function handleChange(e) {
        const {name,value} = e.target;
        setNewPlaylist({
            ...newPlaylist,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(newPlaylist.name) {
            dispatch(addPlaylist(newPlaylist));
            dispatch(addTrackToPlaylist({name: newPlaylist.name, track}))
            setNewPlaylist({
                name: ''
            })
        }
    }

    const playlists = useSelector(selectAllPlaylists);

    const [showPlaylists, setShowPlaylists] = useState(false);
    
    return (
        <div className="track">
            <img src={track.album.cover_big} alt={track.title + 'cover'} />
            <div className="track__details-box">
                <div className="track__details">
                    <h3 className="track__title">{track.title.length > 15 ? track.title.slice(0,15) + '...' : track.title}</h3>
                    <p className="track__artist">{track.artist.name}</p>
                </div>
                <AiFillPlayCircle className="icon icon--play" onClick={() => dispatch(changeCurrentTrack(track))} />
            </div>
            {favTrack ? <AiFillStar className="icon icon--star" onClick={() => dispatch(deleteTrackFromFavorites({id: track.id}))} /> : <AiOutlineStar className="icon icon--star" onClick={() => dispatch(addTrackToFavorites(track))} />}
            <GrAdd className="icon icon--add" onClick={() => setShowPlaylists(true)} />
            <div className="track__playlists" style={{top: showPlaylists ? '0' : '100%'}}>
                <form onSubmit={(e) => handleSubmit(e)} className="playlist__form">
                    <input type="text" name="name" id="name" className="playlist__form__input" value={newPlaylist.name} onChange={(e) => handleChange(e)} />
                    <button className="btn btn--addPlaylist">Add</button>
                </form>
                <div className="track__playlists__btns">
                    {playlists.map(playlist => (
                        <button key={playlist.id} className="btn btn--playlist" onClick={() => dispatch(addTrackToPlaylist({name: playlist.name, track}))} >{playlist.name}</button>
                    ))}
                </div>
                <GrFormClose className="icon icon--close--playlists" onClick={() => setShowPlaylists(false)} />
            </div>
        </div>
    )
}

export default Track;