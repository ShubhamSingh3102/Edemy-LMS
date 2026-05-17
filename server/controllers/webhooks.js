import { Webhook } from "svix";
import User from "../models/User.js"

// we will get data of the user from the clerk
// API Controller Function to Manage Clerk User with database
// Jab bhi Clerk me koi new user signup karega → 
// Clerk automatically tumhare backend ko data bhejega.

export const clerkWebhooks = async (req, res) => {
    try {
        // verify karna ki request sach me Clerk ne bheji hai
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        const { data, type } = req.body

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.create(userData) // store the userData in our mongoDB database
                res.json({})
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }

            default:
                break;
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}