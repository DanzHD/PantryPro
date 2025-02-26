import axios from "axios";
export const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_SERVER}/api/v1`
})

export const mealClient = axios.create({
    baseURL: "https://www.themealdb.com/api/json/v1/1"
})