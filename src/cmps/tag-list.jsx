import { useEffect, useState } from "react"
import { TagPreview } from "./tag-preview"
import { utilService } from "../services/util.service"


export const TagList = ({ stations }) => {
    let [tagListToDisplay, setTagsListToDisplay] = useState([])

    useEffect(() => {

        let tagsObj = []
        let tagList = []
        stations?.forEach(station => {
            const { tags } = station
            if (tags !== null && tags?.length > 0) {
                tags.forEach(tag => {
                    if (!tagList.includes(tag)) {
                        tagList.push(tag)
                        tagsObj.push(
                            {
                                tag,
                                src: station.imgUrl,
                                backgroundColor: utilService.getRandomColor()
                            }
                        )
                    }
                })
            }
        })

        setTagsListToDisplay(tagsObj)
    }, [stations])

    return <section className='tag-list grid'>
        {tagListToDisplay.map((tag, idx) => <TagPreview
            key={'tag' + idx}
            tag={tag}
            idx={idx} />)}
    </section>
}