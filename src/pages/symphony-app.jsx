import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { StationList } from '../cmps/station-list.jsx'
import { defaultHeaderBgcolor } from '../services/bg-color.service'
import { stationService } from '../services/station.service.js'
import { setHeaderBgcolor } from '../store/app-header.actions.js'
import { loadStations } from '../store/station.actions.js'

export const SymphonyApp = () => {
    let stations = useSelector(state => state.stationModule.stations)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setHeaderBgcolor(defaultHeaderBgcolor))
        if (!stations.length) dispatch(loadStations())
    }, [stations])

    return (
        <div>
            <div className="station-by-tag-container">
                <div className='tag-link'>
                    <h1>Rock</h1>
                    <Link to={'/tag/Rock'}>SEE ALL</Link>
                </div>
                <StationList stations={stationService.getStationByTag(stations, 'Rock')} />
            </div>
            <div className="station-by-tag-container">
                <div className='tag-link'>
                    <h1>90's</h1>
                    <Link to={'/tag/Hip Hop'}>SEE ALL</Link>
                </div>
                <StationList stations={stationService.getStationByTag(stations, '90s')} />
            </div>

            <div className="station-by-tag-container">
                <div className='tag-link'>
                    <h1>Soothing</h1>
                    <Link to={'/tag/Soothing'}>SEE ALL</Link>
                </div>
                <StationList stations={stationService.getStationByTag(stations, 'Soothing')} />
            </div>

            <div className="station-by-tag-container">
                <div className='tag-link'>
                    <h1>Pop</h1>
                    <Link to={'/tag/Pop'}>SEE ALL</Link>
                </div>
                <StationList stations={stationService.getStationByTag(stations, 'Pop')} />
            </div>


            <div className="station-by-tag-container">
                <div className='tag-link'>
                    <h1>Beatles</h1>
                    <Link to={'/tag/60s'}>SEE ALL</Link>
                </div>
                <StationList stations={stationService.getStationByTag(stations, 'Beatles')} />
            </div>

            <div className="station-by-tag-container">
                <div className='tag-link'>
                    <h1>Hip Hop</h1>
                    <Link to={'/tag/Funk'}>SEE ALL</Link>
                </div>
                <StationList stations={stationService.getStationByTag(stations, 'Hip Hop')} />
            </div>

            <div className="station-by-tag-container">
                <div className='tag-link'>
                    <h1>Love</h1>
                    <Link to={'/tag/Love'}>SEE ALL</Link>
                </div>
                <StationList stations={stationService.getStationByTag(stations, 'Love')} />
            </div>

            <div className="station-by-tag-container">
                <div className='tag-link'>
                    <h1>Dance</h1>
                    <Link to={'/tag/Dance'}>SEE ALL</Link>
                </div>
                <StationList stations={stationService.getStationByTag(stations, 'Dance')} />
            </div>

            <div className="station-by-tag-container">
                <div className='tag-link'>
                    <h1>Israeli</h1>
                    <Link to={'/tag/Israeli'}>SEE ALL</Link>
                </div>
                <StationList stations={stationService.getStationByTag(stations, 'Israeli')} />
            </div>

            <div className="station-by-tag-container">
                <div className='tag-link'>
                    <h1>Top songs</h1>
                    <Link to={'/tag/Top songs'}>SEE ALL</Link>
                </div>
                <StationList stations={stationService.getStationByTag(stations, 'Top songs')} />
            </div>

            <div className="station-by-tag-container">
                <div className='tag-link'>
                    <h1>Europe</h1>
                    <Link to={'/tag/Europe'}>SEE ALL</Link>
                </div>
                <StationList stations={stationService.getStationByTag(stations, 'Europe')} />
            </div>

            <div className="station-by-tag-container">
                <div className='tag-link'>
                    <h1>Metal</h1>
                    <Link to={'/tag/Metal'}>SEE ALL</Link>
                </div>
                <StationList stations={stationService.getStationByTag(stations, 'Metal')} />
            </div>
        </div >
    )
}

