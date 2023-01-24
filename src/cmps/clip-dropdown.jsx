import { useState } from "react"
import { useSelector } from "react-redux"
import { DropDownList } from './drop-down-list'


export const ClipDropdown = ({ clip, station, onRemoveClip, setIsDropdownClip }) => {

    const loggedInUser = useSelector(state => state.userModule.user)
    const [isShare, setIsShare] = useState(false)

    const copyToClipBoard = (text) => {
        console.log(clip);
        navigator.clipboard.writeText(text)
        console.log(text)
    }

    return (
        <div className='dropdown-clip'>
            <ul>
                {((station?.createdBy?._id === loggedInUser._id) || (loggedInUser?.isAdmin)) && <li className="remove-clip" onClick={(ev) => {
                    ev.stopPropagation()
                    setIsDropdownClip(false)
                    onRemoveClip(ev, clip._id, clip.title)
                }}>Remove from playlist</li>}
                {/* <li onClick={() => setIsShare(!isShare)}>Share</li> */}
                {/* <li>Copy Song Link</li> */}
                <li onClick={() => { copyToClipBoard('text') }}>Embed Track</li>
                <li className="add-to-station">Add to playlist <DropDownList clip={clip} /></li>
            </ul>
        </div >

    )
}


