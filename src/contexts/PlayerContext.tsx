import { createContext, ReactNode, useContext, useState } from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    clearPlayerState: () => void;
    playNext: () => void;
    playPrevious: () => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toogleShuffling: () => void;
    setPlayingState: (state: boolean) => void;
    hasNext: boolean;
    hasPrevius: boolean;
}

type PlayerContextProviderProps = {
    children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData)

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [ episodeList, setEpisodeList ] = useState([])
    const [ currentEpisodeIndex, setCurrentEpisodeIndex ] = useState(0)
    const [ isPlaying , setisPlaying ] = useState(false)
    const [ isLooping, setIsLooping ] = useState(false)
    const [ isShuffling, setIsShuffling ] = useState(false)

    function play(episode: Episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setisPlaying(true)
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setisPlaying(true)
    }

    function clearPlayerState() {
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }

    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length
    const hasPrevius = currentEpisodeIndex > 0

    function playNext() {
        if(isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)

            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        } else if(hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }
    }

    function playPrevious() {
        if(hasPrevius) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }
    }

    function togglePlay() {
        setisPlaying(!isPlaying)
    }

    function toggleLoop() {
        setIsLooping(!isLooping)
    }

    function toogleShuffling() {
        setIsShuffling(!isShuffling)
    }

    function setPlayingState(state: boolean) {
        setisPlaying(state)
    }

    return (
        <PlayerContext.Provider 
         value={{ 
            episodeList, 
            currentEpisodeIndex, 
            play,
            playList,
            clearPlayerState,
            playNext,
            playPrevious,
            isPlaying, 
            isLooping,
            isShuffling,
            toggleLoop,
            togglePlay,
            toogleShuffling,
            setPlayingState,
            hasNext,
            hasPrevius
         }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}