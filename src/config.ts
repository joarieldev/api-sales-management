import dotenv from 'dotenv'

dotenv.config()

export const HOST = process.env.API_HOST
export const PORT = process.env.API_PORT
export const URL = process.env.API_URL

export const DB_HOST = process.env.DB_HOST
export const DB_PORT = process.env.DB_PORT
export const DB_USERNAME = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_DATABASE = process.env.DB_DATABASE
