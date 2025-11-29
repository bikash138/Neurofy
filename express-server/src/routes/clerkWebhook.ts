import { prisma } from "../lib/prisma";
import { verifyWebhook } from "@clerk/express/webhooks";
import express from "express";
export const clerkWebhookRoute: express.Router = express.Router();

clerkWebhookRoute.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

      if (!SIGNING_SECRET) {
        throw new Error(
          "Error: Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env"
        );
      }

      const evt = await verifyWebhook(req, {
        signingSecret: SIGNING_SECRET,
      });

      // Do something with payload
      // For this guide, log payload to console
      const { id } = evt.data;
      //@ts-ignore
      const email = evt.data.email_addresses[0].email_address;
      const eventType = evt.type;

      if(eventType === "user.created" && id && email) {
        await prisma.user.create({
          data:{
            clerkId: id,
            email
          }
        })
      }
      console.log("Webhook received");
      return res.send("Webhook received");
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return res.status(400).send("Error verifying webhook");
    }
  }
);
