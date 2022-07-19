import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TRACKS_API } from "../Api";

const initialState = {
    tracks: [],
    currentTrack: {
        title: "Glimpse of Us",
        artist: {
            name: "Joji"
        },
        album: {
            cover_big: "http://e-cdn-images.dzcdn.net/images/cover/1e1146f11ba53e8e0f8e456c722d94ae/500x500-000000-80-0-0.jpg"
        },
        preview: "http://cdn-preview-6.deezer.com/stream/c-69f5fdb3a26e071968dd81575408a9ad-3.mp3"
    },
    favorites: [],
    playlists: [
        {
            id: 1,
            name: 'blond',
            tracks: []
        },
        {
            id: 2,
            name: 'astroworld',
            tracks: []
        },
        {
            id: 3,
            name: 'nectar',
            tracks: []
        }
    ],
    status: 'idle',
    error: null,
}

export const fetchTracks = createAsyncThunk('tracks/fetchTracks', async (term = 'frank ocean') => {
    try {
        const response = await axios.get(TRACKS_API + term);
        return response.data.data;
    } catch {
        console.log('failed to fetch data!')
    }
})

const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {
        changeCurrentTrack(state,action) {
            state.currentTrack = action.payload;
        },
        addTrackToFavorites(state,action) {
            state.favorites.push(action.payload);
        },
        deleteTrackFromFavorites(state,action) {
            const filteredFavorites = state.favorites.filter(track => track.id !== action.payload.id);
            state.favorites = filteredFavorites;
        },
        addPlaylist: {
            reducer(state,action) {
                const playlist = state.playlists.find(playlist => playlist.name === action.payload.name);
                if(!playlist) {
                    state.playlists.push(action.payload);
                }
            },
            prepare({name}) {
                let i = 4;
                return {
                    payload: {
                        id: i++,
                        name,
                        tracks: []
                    }
                }
            }
        },
        addTrackToPlaylist(state,action) {
            for(let i = 0; i < state.playlists.length; i++) {
                if(state.playlists[i].name === action.payload.name) {
                    const track = state.playlists[i].tracks.find(trk => trk.id === action.payload.track.id);
                    if(!track) {
                        state.playlists[i].tracks.push(action.payload.track)
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTracks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTracks.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.tracks = action.payload;
            })
            .addCase(fetchTracks.rejected, (state) => {
                state.status = 'failed';
            })
    }
})

export default tracksSlice.reducer;
export const selectAllTracks = state => state.tracks.tracks;
export const getStatusTracks = state => state.tracks.status;
export const getErrorTracks = state => state.tracks.error;
export const {changeCurrentTrack,addTrackToFavorites,deleteTrackFromFavorites,addPlaylist,addTrackToPlaylist} = tracksSlice.actions;
export const selectCurrentTrack = state => state.tracks.currentTrack;
export const selectAllFavorites = state => state.tracks.favorites;
export const selectFavTrackById = (state,trackId) => state.tracks.favorites.find(track => track.id === trackId)
export const selectAllPlaylists = state => state.tracks.playlists;
export const selectPlaylistById = (state,playlistId) => state.tracks.playlists.find(playlist => playlist.id === playlistId);
