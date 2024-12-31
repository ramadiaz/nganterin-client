import { decodeJwt } from "jose"
import Cookies from "js-cookie"

export const GetUserData = () => {
    const token = Cookies.get("user_jwt")
    let user_data = {}

    if (token) {
        try {
            user_data = decodeJwt(token)
        } catch (error) {
            console.error("Invalid JWT detected, removing cookie:", error)
            Cookies.remove("user_jwt")
        }
    }

    return user_data
}
