import { getAuth } from "@clerk/express";
import { prisma } from "../lib/prisma";
import express from "express";
export const voiceNotesRoute: express.Router = express.Router();

voiceNotesRoute.post("/create-voice-note", async (req, res) => {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const { title, url } = req.body
    await prisma.voiceNote.create({
      data: {
        title,
        url,
        userId
      },
    });
    return res.status(200).json({
      success: true,
      message: "Audio link saved to DB"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

voiceNotesRoute.get("/get-all-voice-notes", async (req, res) => {
  try {
    const { userId } = getAuth(req)
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    console.log("get all voice notes")
    const voiceNotes = await prisma.voiceNote.findMany({
      where: {
        userId
      },
      select:{
        id: true,
        title: true,
        url: true,
        pinned: true,
      }
    });
    return res.status(200).json({
      voiceNotes,
      success: true,
      message: "Audio notes fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

