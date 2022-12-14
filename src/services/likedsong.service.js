
export const loadingImg = 'https://res.cloudinary.com/dng9sfzqt/image/upload/v1663540882/ezgif.com-gif-maker_znhvuh.gif'
export const defaultImg = 'https://res.cloudinary.com/dng9sfzqt/image/upload/v1663788155/pngwing.com_7_smg1dj.png'

export const getTotalSongDur = (songs) => {
    let secCollector = 0
    songs.forEach(song => {
        secCollector += song.duration?.hours * 3600
        secCollector += song.duration?.min * 60
        secCollector += song.duration?.sec
    })
    let hours = Math.floor(secCollector / 3600)
    let minutes = Math.floor((secCollector - (hours * 3600)) / 60)
    let seconds = secCollector - (hours * 3600) - (minutes * 60)
    if (hours < 10) { hours = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    const totalTime = hours <= 0 ? `${minutes}:${seconds} minutes` : `${hours}:${minutes}:${seconds} hours`

    return totalTime
}

