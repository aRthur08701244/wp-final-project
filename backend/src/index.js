// import http from 'http'
// import express from 'express';
// import dotenv from 'dotenv-defaults'
// import mongoose from 'mongoose'
// import WebSocket from 'ws'
// import mongo from './mongo'
// import wsConnect from './wsConnect'
// import { v4 as uuidv4 } from 'uuid'

// mongo.connect();

// const app = express()
// const server = http.createServer(app)
// const wss = new WebSocket.Server({ server })
// const db = mongoose.connection

// db.once('open', () => {
//     console.log("MongoDB connected!")
//     wss.on('connection', (ws) => { // ws: client-side websocket
//         // wsConnect.initData(ws)
//         // ws.id = uuidv4() // hash key
//         // ws.box = '';
//         // console.log(wss)
//         ws.onmessage = wsConnect.onMessage(wss, ws);
//     }); });

// const PORT = process.env.PORT || 4001;
// server.listen(PORT, () => {
//     console.log(`Server is up on port ${PORT}.`)
// })


// import GraphQL server
import server from './server'
// import MongoDB connection
import mongo from './mongo'
mongo.connect();

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`)
})