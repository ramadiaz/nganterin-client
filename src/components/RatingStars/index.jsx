import { Star } from "@phosphor-icons/react";

export const RatingStars = ({ gap = 2, rating = 0, size = 20, color = "#2e2e2e" }) => {
    const elements = [];

    for (let i = 0; i < 5; i++) {
        elements.push(
            <Star size={size} color={color} weight={i + 1 <= rating ? "fill" : "thin"} key={i} />
        );
    }

    return (
        <div className={`flex flex-row gap-${gap}`} >
            {elements}
        </div>
    )
}