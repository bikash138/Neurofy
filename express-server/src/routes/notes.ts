import { enqueueNote } from '@/utils/bullmq'
import { prisma } from '../prisma'
import express from 'express'
import { versionQueue } from '@/utils/bullmq/versionQueue'
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
                last_edited: new Date(),
            }
        })

        // Remove old scheduled bump for this note
        const job = await versionQueue.getJob(`version:${id}`);
        if (job) {
            await job.remove();
        }

        // Schedule a new one for 60s later
        await versionQueue.add(
            "bumpVersion",
            { id },
            {
                delay: 60000,
                jobId: `version:${id}`
            }
        );
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
                updatedAt: true
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

notesRoute.get('/get-all-note', async (req,res)=>{
    try{
        const userId = 'cme06ihw800007kz87xrbn7xw'
        const allNotes = await prisma.note.findMany({
            where:{
                userId
            },
        })
        return res.status(200).json({
            success: true,
            message: "Fetched All Notes",
            allNotes
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message: "Internal Server Error"
        })
    }
})

notesRoute.put('/mark-as-pinned', async (req,res)=>{
    try{
        const {noteId, pinned} = req.body
        console.log(noteId, pinned)
        await prisma.note.update({
            where:{
                id: noteId
            },
            data:{
                pinned: !!pinned
            }
        })
        return res.status(200).json({
            success: true,
            message: pinned ? "Pin success" : "Unpin success",
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message: "Internal Server Error"
        })
    }
})

notesRoute.delete('/delete-note', async (req,res)=>{
    try{
        const {noteId} = req.body
        const deletedNote = await prisma.note.delete({
            where:{
                id: noteId
            },
            select:{
                title: true
            }
        })
        return res.status(200).json({
            success: true,
            message: `${deletedNote.title} deleted success`,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message: "Internal Server Error"
        })
    }
})