import { utilService } from "../services/util.service"
import { Link } from 'react-router-dom'

export const TagPreview = ({ tag, idx }) => {
    return <div
        className='tag-preview-container flex column'
        style={{ backgroundColor: tag.backgroundColor }}>
        <Link to={'/tag/' + tag.tag}>
            <h3>{tag.tag}</h3>
            <img
                className="tag-preview-img"
                src={tag.src}
                alt={"tag-preview-img"} />
        </Link>
    </div>
}