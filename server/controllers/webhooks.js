import { Webhook } from "svix";
import User from "../models/User.js"
import Stripe from "stripe";
import Purchase from "../models/Purchase.js";
import Course from "../models/Course.js";

// we will get data of the user from the clerk
// API Controller Function to Manage Clerk User with database
// Jab bhi Clerk me koi new user signup karega → 
// Clerk automatically tumhare backend ko data bhejega.

export const clerkWebhooks = async (req, res) => {
    try {
        // verify karna ki request sach me Clerk ne bheji hai
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // await whook.verify(JSON.stringify(req.body), {
        //     "svix-id": req.headers["svix-id"],
        //     "svix-timestamp": req.headers["svix-timestamp"],
        //     "svix-signature": req.headers["svix-signature"]
        // })

        const payload = req.body.toString();
        const evt = whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        const { data, type } = evt

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


// Stripe Webhooks

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

export const stripeWebhooks = async (request, response) => {
    const sig = request.headers['stripe-signature']

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            endpointSecret
        )
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`)
    }

    // handle the event
    try {
        switch (event.type) {

            case 'payment_intent.succeeded': {

                const paymentIntent = event.data.object;
                // console.log('PaymentIntent was successful!');
                const paymentIntentId = paymentIntent.id;


                const session = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntentId
                })

                const { purchaseId } = session.data[0].metadata;

                if (!purchaseData || purchaseData.status === "completed") break;

                const purchaseData = await Purchase.findById(purchaseId)
                const userData = await User.findById(purchaseData.userId)
                const courseData = await Course.findById(purchaseData.courseId.toString());

                if (!courseData.enrolledStudents.includes(userData._id)) {
                    courseData.enrolledStudents.push(userData._id);
                    await courseData.save();
                }

                if (!userData.enrolledCourses.includes(courseData._id)) {
                    userData.enrolledCourses.push(courseData._id);
                    await userData.save();
                }

                purchaseData.status = 'completed'
                await purchaseData.save()

                break;
            }


            case 'payment_intent.payment_failed': {

                const paymentIntent = event.data.object;
                // console.log('PaymentIntent was successful!');
                const paymentIntentId = paymentIntent.id;


                const session = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntentId
                })

                const { purchaseId } = session.data[0].metadata;

                const purchaseData = await Purchase.findById(purchaseId)

                purchaseData.status = 'failed'
                await purchaseData.save()

                break;
            }


            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Return a response to acknowledge receipt of the event
        return response.json({ received: true });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message,
        });
    }
}