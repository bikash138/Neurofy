import { prisma } from '../prisma'
import express from 'express'
export const notesRoute: express.Router = express.Router()

notesRoute.post('/create-note', async (req,res)=>{
    try{
        const { title } = req.body
        const newNeuro = await prisma.note.create({
            data: {
                title: title,
                userId: 'cme06ihw800007kz87xrbn7xw'
            }
        })
        const neuroId = newNeuro.id
        return res.status(200).json({
            success: true,
            message: "Saved success",
            neuroId
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message: "Internal Server Error"
        })
    }
})

notesRoute.put('/update-note/:id', async (req,res)=>{
    try{
        console.log("Update Request")
        const {id} = req.params
        const {title,content} = req.body
        await prisma.note.update({
            where:{
                id: id
            },
            data: {
                title: title,
                content: content,
            }
        })
        return res.status(200).json({
            success: true,
            message: "Update success"
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message: "Internal Server Error"
        })
    }
})

notesRoute.get('/get-note/:id', async (req,res)=>{
    try{
        const {id} = req.params
        const note = await prisma.note.findUnique({
            where:{
                id: id
            },
            select:{
                title: true,
                content: true,
                createdAt: true
            }
        })
        return res.status(200).json({
            success: true,
            message: "Fetched success",
            note
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message: "Internal Server Error"
        })
    }
})