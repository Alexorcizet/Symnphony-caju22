import { useSelector, useDispatch } from 'react-redux'
import { setClip, setCurrTime, setIsPlaying, setMediaPlayerInterval, setPlaylist } from '../store/media-player.actions.js'
import LikedSongLogo from '../assets/img/likedsongs.png'
import { ClipListHeader } from '../cmps/clip-list-header'
import { StationHeader } from '../cmps/station-header'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { DraggableClipList } from '../cmps/draggable-clip-list'
import { handleDragEnd } from '../services/dragg.service'
import { useEffect, useState } from 'react'
import { updateUser } from '../store/user.actions'
import { setHeaderBgcolor } from '../store/app-header.actions.js'
import { likedSongsBgcolor } from '../services/bg-color.service.js'
import { storageService } from '../services/async-storage.service.js'
import LikedSongsLogo from '../../src/assets/img/likedsongs.png'
import { userService } from '../services/user.service.js'



export const LikedSongs = () => {
    const loggedInUser = useSelector(state => state.userModule.user)
    let { playerFunc, isPlaying, currClip, currPlaylist, mediaPlayerInterval, currTime, clipLength } = useSelector(state => state.mediaPlayerModule)
    const dispatch = useDispatch()
    let [likedSongs, setLikedSongs] = useState()

    useEffect(() => {
        dispatch(setHeaderBgcolor(likedSongsBgcolor))
        setLikedSongs(loggedInUser.likedSongs)
    }, [])

    const station = {
        name: "Liked Songs",
        imgUrl: LikedSongLogo,
        clips: likedSongs,
        createdBy: {
            fullname: loggedInUser.fullname
        }
    }

    const onHandleDragEnd = (res) => {
        likedSongs = handleDragEnd(res, likedSongs)
        setLikedSongs(likedSongs)
        loggedInUser.likedSongs = likedSongs
        dispatch(updateUser(loggedInUser))
    }

    const onTogglePlay = async (clip, isClicked) => {
        if (!isClicked) {
            dispatch(setIsPlaying(false))
            clearInterval(mediaPlayerInterval)
            dispatch(setPlaylist(station))
            dispatch(setClip(clip))
            dispatch(setMediaPlayerInterval(setInterval(getTime, 750)))
            playerFunc.playVideo()
        }
        if (isClicked) {
            clearInterval(mediaPlayerInterval)
            playerFunc.pauseVideo()
        }
        dispatch(setIsPlaying(!isPlaying))
        const userToUpdate = { ...loggedInUser }
        userService.updateUserRecentlyPlayedClips(userToUpdate, clip)
        dispatch(updateUser(userToUpdate))
    }

    const getTime = async () => {
        const time = await playerFunc.getCurrentTime()
        storageService.put('currTime', time)
        dispatch(setCurrTime(time))
        if (currTime > clipLength - 1.5) {
            const currIdx = currPlaylist.clips.indexOf(currClip)
            let nextIdx = currIdx + 1
            if (nextIdx > currPlaylist.clips.length - 1) nextIdx = 0
            currClip = currPlaylist.clips[nextIdx]
        }
        dispatch(setClip(currClip))
        dispatch(setIsPlaying(true))
    }
    

    return (
        <div className='station-container'>
            <div className='station-header'>
                <StationHeader
                    bgColor={likedSongsBgcolor}
                    isUserStation={true}
                    LikedSongLogo={LikedSongLogo}
                    clips={station.clips}
                    currStation={station}
                    user={loggedInUser.username}
                    LikedSongsLogo={LikedSongsLogo}
                    onTogglePlay={onTogglePlay}
                />
            </div>
            {likedSongs&&
            <div className='station-clips-container'>
                <ClipListHeader
                    bgColor={likedSongsBgcolor}
                />
                <hr />
                <DragDropContext onDragEnd={onHandleDragEnd}>
                    <Droppable droppableId='station-clips-main-container'>
                        {(provided) => (
                            <DraggableClipList
                                bgColor={likedSongsBgcolor}
                                provided={provided}
                                clipKey={'liked-clip'}
                                station={station}
                                currClips={station.clips}
                            />)}
                    </Droppable>
                </DragDropContext>
            </div>}
        </div >
    )



}