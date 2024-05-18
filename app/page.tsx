'use client'

import React, { useEffect, useState } from 'react'

import { GitHubIcon, LinkIcon } from '@/components/icons'
import { useSongsContext } from '@/context/store'
import { fetchSongs } from '@/app/actions/fetch-songs-action'
import { PlaylistGrid } from '@/components/playlist-chooser'

type Playlist = number[]

// cheesy in-memory playlist
const playlists: Playlist = []

export default function Home() {
    const { setData } = useSongsContext()
    const [creatingPlaylist, setCreatingPlaylist] = useState(false)

    useEffect(() => {
        fetchSongs().then((data) => {
            if (data) setData(data)
        })
    }, [setData])
    
    return (
        <div>
            <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/mattbieber/solacenotes"
                className="absolute top-4 right-12"
            >
                <GitHubIcon />
            </a>

            <main className="flex min-h-screen flex-col items-center p-4">
                <h1 className="text-6xl mt-40 mb-16 font-black tracking-tight">
                    Audio Player 🎶
                </h1>

                {creatingPlaylist && <PlaylistGrid />}

                {playlists.length === 0 && !creatingPlaylist && (
                    <div>
                        It appears you have no playlists created. Click below to
                        make one.
                    </div>
                )}

                {!creatingPlaylist && (
                    <div
                        onClick={() => setCreatingPlaylist(true)}
                        className=" w-40 mt-10 cursor-pointer rounded px-5 py-2.5 overflow-hidden group bg-gray-800 relative hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 text-white hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all ease-out duration-300"
                    >
                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        Create Playlist
                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    </div>
                )}
                <div className="flex mt-20 text-1xl space-x-12 text-indigo-500">
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/mattbieber/solacenotes"
                        className="flex space-x-1 mt-12 mb-12 text-l  hover:text-indigo-300"
                    >
                        <span>Visit the repo</span>
                        <span>
                            <LinkIcon />
                        </span>
                    </a>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/mattbieber/solacenotes/blob/master/README.md"
                        className="flex space-x-1 mt-12 mb-12 text-l  hover:text-indigo-300"
                    >
                        <span>View the docs</span>
                        <span>
                            <LinkIcon />
                        </span>
                    </a>
                </div>
            </main>
        </div>
    )
}
