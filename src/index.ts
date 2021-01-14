require("dotenv-safe/config")
import cors from "cors"
import express, { Request, Response } from "express"
import http from "http"
import api from "./services/axios"

let server: http.Server

export const initialize = () => new Promise((resolve, reject) => {
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.get("/video", (req: Request, res: Response) => {
        const { keyword } = req.query

        api.get(`search?key=${process.env.API_KEY}&part=id&type=video&q=${keyword}`)
            .then(response => {
                res.send(response.data)
            })
            .catch(error => {
                res.send(error)
            })
    })

    server = http.createServer(app)
    server.listen(process.env.PORT || 3333)
        .on("listening", () => resolve)
        .on("error", error => reject(error))
})

export const close = () => new Promise((resolve, reject) => {
    server.close(error => {
        if (error) {
            reject(error)
            return
        }

        resolve()
    })
})