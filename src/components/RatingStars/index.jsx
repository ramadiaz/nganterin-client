'use client'

import { Star } from "@phosphor-icons/react"

export const RatingStars = ({ value, onChange, size = 24, color = '#fcd34d', gap = 1, count = 10, description = {} }) => {
    return (
        <div className="flex flex-row items-center text-slate-900" style={{ gap: `${gap}px` }}>
            {
                Array.from({ length: count }).map((_, index) => {
                    return (
                        <Star key={index} size={size} color={color} onClick={() => onChange(index + 1)} weight={value < index + 1 ? 'thin' : 'fill'} className="" />
                    )
                })
            }
            <p className="ml-2 text-sm font-thin">
                {description[value]}
            </p>
        </div>
    )
}