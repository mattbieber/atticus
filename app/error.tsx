'use client' // Error components must be Client Components

import React, { useEffect } from 'react'
import { ErrorIcon } from '@/components/icons'
import { CenteredItem } from '@/components'
export default function Error({
    error,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <CenteredItem>
            <div className="flex flex-col items-center justify-center">
                <div className="m-auto pb-14">
                    <ErrorIcon />
                </div>
                <h2>Something went wrong!</h2>
            </div>
        </CenteredItem>
    )
}
