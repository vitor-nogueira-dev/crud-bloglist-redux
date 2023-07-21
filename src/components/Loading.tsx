import React from 'react'

type Props = {}

export default function Loading({ }: Props) {
    return (
        <div className="flex items-center justify-center space-x-2 w-full h-[50vh]">
            <div className="h-3 w-12 bg-blue-200 rounded"></div>
            <div className="h-3 w-12 bg-blue-400 animate-pulse rounded"></div>
            <div className="h-3 w-12 bg-blue-600 rounded"></div>
        </div>
    )
}