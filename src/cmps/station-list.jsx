import { StationPreview } from './station-preview'
import { useSelector } from 'react-redux'
import { LikedSongsPreview } from './liked-songs-preview'

export const StationList = ({
    stations,
    isArtistList,
    isSearch,
    isDrag }) => {
    const user = useSelector(state => state.userModule.user)
    const params = window.location.href

    return <section className='station-list grid'>
        {params.includes('library') && <LikedSongsPreview user={user} />}
        {stations?.map((station, idx) => <div
            key={'home-page-station-' + idx}>
            <StationPreview
             currStation={station} 
             isSearch={isSearch}/>
        </div>
        )}
        {!stations?.length && <div className='no-res-msg'>
            {!isArtistList &&
                <p>
                    No Playlists were found...
                </p>
            }
            {isArtistList &&
                <p>
                    No Artists were found...
                </p>
            }
        </div>}
    </section>
}