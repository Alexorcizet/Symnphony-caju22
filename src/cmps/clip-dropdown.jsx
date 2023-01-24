import { useState } from "react"
import { useSelector } from "react-redux"
import { DropDownList } from './drop-down-list'


export const ClipDropdown = ({ clip, station, onRemoveClip, setIsDropdownClip }) => {

    const loggedInUser = useSelector(state => state.userModule.user)

    const copyLink = (clipId) => {
        navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${clipId}`)
    }

    return (
        <div className='dropdown-clip'>
            <ul>
                {loggedInUser && ((station?.createdBy?._id === loggedInUser._id) || (loggedInUser?.isAdmin)) && <li className="remove-clip" onClick={(ev) => {
                    ev.stopPropagation()
                    setIsDropdownClip(false)
                    onRemoveClip(ev, clip._id, clip.title)
                }}>Remove from playlist</li>}
                <li onClick={() => copyLink(clip.id)}>Copy Song Link</li>
                <li className="add-to-station">Add to playlist <DropDownList clip={clip} /></li>
            </ul>
        </div >

    )
}


