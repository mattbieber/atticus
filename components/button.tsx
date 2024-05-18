'use client'

import React from 'react'

interface CustomButtonProps {
    label: string
    light?: boolean
    disabled?: boolean
    names?: string
    onClick: () => void
}


export const CustomButton = ({
    label,
    onClick,
    light = false,
    disabled = false,
    names,
}: CustomButtonProps) => {
    const classes =
        'rounded px-5 py-2.5 overflow-hidden group  relative text-white'

    if (names) {
        classes.concat(names)
    }
    let cls = ''
    if (light) {
        cls = `bg-indigo-500 text-white uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-6 mb-1 mt-1`
    } else {
        cls = `${classes} ${disabled ? 'bg-gray-300' : 'bg-gray-800'}`
    }
    return (
        <button disabled={disabled} onClick={onClick} className={cls}>
            <span className="relative">{label}</span>
        </button>
    )
}
