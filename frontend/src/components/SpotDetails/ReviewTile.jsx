import { dateFromString } from "../../utils"

export default function ReviewTile({review}) {

    const {month, year} = dateFromString(review.createdAt);

    return <div className="review-tile">
        <p>{review.User.firstName}</p>
        <p>{month} {year}</p>
        <p>{review.review}</p>
    </div>
}