import axios from "axios";
export const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1"
})

export const mealClient = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1"
})