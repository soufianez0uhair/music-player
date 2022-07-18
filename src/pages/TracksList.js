import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { selectAllTracks,getStatusTracks,getErrorTracks,fetchTracks } from "../redux/tracksSlice";

import Track from "../components/Track";

const TracksList = () => {
    const dispatch = useDispatch();


    const tracks = useSelector(selectAllTracks);
    const tracksStatus = useSelector(getStatusTracks);

    useEffect(() => {
        if(tracksStatus === 'idle') {
            dispatch(fetchTracks())
        }
    }, [tracksStatus, dispatch]);

    let tracksEl = '';
    if(tracksStatus === 'loading') {
        tracksEl = <img src="./img/transitiondogevibing.gif" alt="doge vibing" className="transition" />
    } else if(tracksStatus === 'succeeded') {
        tracksEl = tracks.map(track => (
            <Track track={track} key={track.id} />
        ))
    } else if(tracksStatus === 'failed') {
        console.log('failed to fetch data!')
    }

    return (
        <div className="tracks">
            {tracksEl}
        </div>
    )
}

export default TracksList;