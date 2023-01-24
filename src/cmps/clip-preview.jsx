import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { getDuration, shortTitle } from '../services/clip.service'
import { LikesBtns } from './likes-btn'
import { ClipDropdown } from './clip-dropdown'
import { setClip, setCurrTime, setIsPlaying, setMediaPlayerInterval, setPlaylist } from '../store/media-player.actions'
import { useDispatch } from 'react-redux'
import { storageService } from '../services/async-storage.service'
import { updateUser } from '../store/user.actions'
import { userService } from '../services/user.service'
import { equalizer, getDate } from '../services/clip.service'
export const ClipPreview = ({
    station,
    clip,
    type,
    idx,
    clipNum,
    onRemoveClip,
    dndStyle }) => {

    let { playerFunc, isPlaying, currClip, currPlaylist, mediaPlayerInterval, currTime, clipLength } = useSelector(state => state.mediaPlayerModule)

    const loggedInUser = useSelector(state => state.userModule.user)
    let [isDropdownClip, setIsDropdownClip] = useState(false)
    let [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        if (!currClip || !currPlaylist) return
        if (clip._id === currClip._id) {
            setIsClicked(isPlaying)
        }
    }, [isPlaying])

  

    const isCreatedAt = (type === 'search-res' || type === 'queue-clip')
    const dispatch = useDispatch()

    const onTogglePlay = (clip, isClicked, loggedInUser) => {
        if (!isClicked) {
            dispatch(setIsPlaying(true))
            clearInterval(mediaPlayerInterval)
            dispatch(setPlaylist(station))
            dispatch(setClip(clip))
            dispatch(setMediaPlayerInterval(setInterval(getTime, 750)))
            playerFunc.playVideo()
        }
        else {
            dispatch(setIsPlaying(false))
            clearInterval(mediaPlayerInterval)
            playerFunc.pauseVideo()
        }
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
        dispatch(setIsPlaying(true))
    }

    return <li
        style={{
            backgroundColor: dndStyle?.backgroundColor,
            color: dndStyle?.color,
            borderRadius: dndStyle?.borderRadius,
            cursor: dndStyle?.cursor,
        }}

        className={'clip-preview-container '} >
        <div className='clip-preview-main-container'>
            {currClip?._id === clip?._id && isPlaying ? <div className='clip-equalizer'><img src={equalizer} onClick={() => {
                setIsClicked(!isClicked)
                onTogglePlay(clip, isClicked, loggedInUser)
            }} alt='clip-img' /></div> :
                <div >
                    <i className={'clip-play-btn ' + (currClip?.id === clip?.id && isPlaying ? 'fas fa-pause' : 'fas fa-play playing')}></i>
                    <div className='clip-num'>{clipNum ? clipNum : idx + 1}</div>
                </div>
            }
            <div className='clip-title flex align-center' onClick={() => {
                setIsClicked(!isClicked)
                onTogglePlay(clip, isClicked, loggedInUser)
            }}>
                <img className='clip-img' src={clip.img?.url} alt='clip-img' />
                <div className='title-text flex column'>
                    <h1 style={{ color: dndStyle?.color }}>{shortTitle(clip)}</h1>
                    <p style={{ color: dndStyle?.color }}>{clip.artist}</p>
                </div>
            </div>
            <div className='artist-name' onClick={() => {
                setIsClicked(!isClicked)
                onTogglePlay(clip, isClicked, loggedInUser)
            }}>{clip.artist}</div>
            {!isCreatedAt && <div className='added'>{clip.createdAt || clip.LikedAt || new Date(clip.addedAt * 1000).toLocaleDateString('he-IL')}</div>}
            {loggedInUser && <LikesBtns clip={clip} station={station} />}
            {clip.duration ? <div className='clock-area'>{getDuration(clip.duration)}</div> : ''}
            <i
                className='dropdown-btn fa-solid fa-ellipsis'
                onClick={() => {
                    setIsDropdownClip(!isDropdownClip)
                }}>
                {isDropdownClip && <ClipDropdown
                    setIsDropdownClip={setIsDropdownClip}
                    station={station}
                    onRemoveClip={onRemoveClip}
                    clip={clip}
                />}
            </i>
        </div>
    </li >

}