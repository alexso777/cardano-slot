import axios from "axios"
import { API_URL } from "../config"

export const play = async (wallet: string, token: string, amount: string) => {

    try {
        const res = await axios.post(`${API_URL}/play`, {
            wallet: wallet,
            token: token,
            score: amount
        })
        return res.data
    } catch (error) {
        console.log(error)
    }

}

export const depositFund = async (
    wallet: string,
    nebula: number,
    dum: number,
    snek: number,
    ada: number
) => {
    try {
        const res = await axios.post(`${API_URL}/depositFund`, {
            wallet,
            nebula,
            dum,
            snek,
            ada
        })
        console.log(res);
    } catch (error) {
        console.log(error)
    }
}

export const withdrawFund = async (
    wallet: string,
    nebula: number,
    dum: number,
    snek: number,
    ada: number
) => {
    try {
        const res = await axios.post(`${API_URL}/withdrawFund`, {
            wallet,
            nebula,
            dum,
            snek,
            ada
        })
        console.log(res);
    } catch (error) {
        console.log(error)
    }
}
