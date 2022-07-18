import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchTracks, selectAllPlaylists } from '../redux/tracksSlice';
import {MdSearch} from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';
import {GrFormClose} from 'react-icons/gr';
import { Link,useNavigate } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [term, setTerm] = useState('');

    function handleChange(e) {
        const {value} = e.target;
        setTerm(value);
    }

    const [requestStatus, setRequestStatus] = useState('idle');

    function handleSubmit(e) {
        e.preventDefault();
        if(term && requestStatus === 'idle') {
            try {
                setRequestStatus('pending');
                navigate('/');
                dispatch(fetchTracks(term));
            } catch {
                console.log('failed to fetch data!')
            } finally {
                setRequestStatus('idle');
                setTerm('');
            }
        }
    }

    const [showMenu, setShowMenu] = useState(false);
    
    const playlists = useSelector(selectAllPlaylists);

    return (
        <header>
            <AiOutlineMenu className="icon icon--menu" onClick={() => setShowMenu(true)}/>
            <div className="menu"  style={{left: showMenu ? '0' : '-25rem'}}>
                <ul className="navbar">
                <GrFormClose className="icon icon--close" onClick={() => setShowMenu(false)} />
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/favorites">Favorites</Link>
                    </li>
                    {
                        playlists.map(playlist => (
                            <li key={playlist.id}>
                                <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <img src="./img/logo.gif" alt="cat vibing" className="logo" />
            <form onSubmit={(e) => handleSubmit(e)} className="search">
                <input type="text" name="search__input" id="search__input" className="search__input" value={term} onChange={(e) => handleChange(e)} />
                <MdSearch className="icon icon--search" />
            </form>
        </header>
    )
}

export default Header;