'use client'

import React, { createContext, useContext, useState } from 'react'

import type { Song } from './models'
type Data = { songs: Song[], artists: string[], albums: string[] }

interface SongsContextProps {
    currentSong: Song | undefined
    songs: Song[]
    artists: string[]
    albums: string[]
    setData: (data: { songs: Song[], artists: string[], albums: string[] }) => void
   
}

export const SongsContext = createContext<SongsContextProps>({
    currentSong: undefined,
    songs: [],
    albums: [],
    artists: [],
    setData: () => {},
})

interface SongsContextProviderProps {
    children: React.ReactNode
}

export const SongsContextProvider = ({
    children,
}: SongsContextProviderProps) => {

    const [data, setData] = useState<Data>()
    let songs: Song[] = []
    let artists: string[] = []
    let albums: string[] = []

    if(data) {
        songs = data.songs
        artists = data.artists
        albums = data.albums
    }
    
    return (
        <SongsContext.Provider
            value={{
                currentSong: undefined,
                songs,
                artists,
                albums, 
                setData,
            }}
        >
            {children}
        </SongsContext.Provider>
    )
}

export const useSongsContext = () => useContext(SongsContext)
