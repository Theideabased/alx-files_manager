import express from 'express'
import dbClient from '../utils/db'
import redisClient from '../utils/redis'
const router = express.Router()

exports.getStatus = async (req, res) => {
    try{
        res.status(200).json({
            'redis' : redisClient.isAlive(),
            'db' : dbClient.isAlive()
        })
    }catch (err) {
        console.error('Error getting status' , err)
    }
}

exports.getStats = (req, res) => {
    try{
        res.status(200).json({
            "users": dbClient.nbUsers(),
            "files": dbClient.nbFiles()
        })
    }catch{
        console.error('Error getting stats:', err)
    }
}