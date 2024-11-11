import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    const playWithId = async (id) => {
        if (audioRef.current) {
            setTrack(songsData[id]);
            audioRef.current.src = songsData[id].audioUrl; // Assuming audioUrl is the key for audio source URL
            audioRef.current.load(); // Ensures the new track is loaded
            audioRef.current.onloadeddata = () => {
                audioRef.current.play();
                setPlayStatus(true);
            };
        }
    };

    const previous = async () => {
        if (track.id > 0) {
            setTrack(songsData[track.id - 1]);
            audioRef.current.src = songsData[track.id - 1].audioUrl;
            audioRef.current.load();
            audioRef.current.onloadeddata = () => {
                audioRef.current.play();
                setPlayStatus(true);
            };
        }
    };

    const next = async () => {
        if (track.id < songsData.length - 1) {
            setTrack(songsData[track.id + 1]);
            audioRef.current.src = songsData[track.id + 1].audioUrl;
            audioRef.current.load();
            audioRef.current.onloadeddata = () => {
                audioRef.current.play();
                setPlayStatus(true);
            };
        }
    };
    
    const seekSong =async(e) =>{
             audioRef.current.currentTime = ((e.nativeEvent.offsetX/seekBg.current.offsetWidth)* audioRef.current.duration)
    }

    useEffect(() => {
        const handleTimeUpdate = () => {
            if (audioRef.current) {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                setTime(prevTime => ({
                    ...prevTime,
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    }
                }));
            }
        };

        const handleLoadedMetadata = () => {
            if (audioRef.current) {
                setTime(prevTime => ({
                    ...prevTime,
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                }));
            }
        };

        if (audioRef.current) {
            audioRef.current.ontimeupdate = handleTimeUpdate;
            audioRef.current.onloadedmetadata = handleLoadedMetadata;
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = null;
                audioRef.current.onloadedmetadata = null;
            }
        };
    }, [audioRef]);

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;





