'use server'

import type { Song } from '@/context/models'

interface RawEntry {
    title: string
    album: string
    artist: string
    song_length: string
}
const cachedSongs: { songs: Array<Song>, artists: string[], albums: string[] } | null = null

export async function fetchSongs(): Promise<{ songs: Array<Song>, artists: string[], albums: string[] } | null> {
    
    if(cachedSongs) {
        return Promise.resolve(cachedSongs)
    }
    
    const response = await fetch('https://storage.googleapis.com/atticus-frontend-assessment/api/songs.json')
    if(!response.ok) {
        throw new Error('Failed to fetch songs')
    }

    const rawData: { songs: [RawEntry] } = await response.json()
    
    const albums: string[] = []
    const artists: string[] = []
    
   const songs: Song[] = rawData.songs.map((entry: RawEntry, index) => {
        
        const artistId: number = artists.includes(entry.artist)
        ? artists.indexOf(entry.artist)
        : artists.push(entry.artist) - 1

        const albumId = albums.includes(entry.album) 
        ? albums.indexOf(entry.album)
        : albums.push(entry.album) -1
        

        return {
            id: index,
            title: entry.title,
            length: parseInt(entry.song_length),
            artistId,
            albumId
        }
    })
    
    
    return { songs, artists, albums }
}
