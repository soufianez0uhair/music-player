import { useSelector } from "react-redux";
import Track from "../components/Track";
import { selectAllFavorites } from "../redux/tracksSlice";

const FavoriteTracks = () => {
    const favorites = useSelector(selectAllFavorites);

    const favoritesEl = favorites.map(track => (
        <Track track={track} key={track.id} />
    ))

    return (
        <div className="tracks">
            {favoritesEl}
        </div>
    )
}

export default FavoriteTracks;