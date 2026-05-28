import { clerkClient } from "@clerk/express";

// Middleware (Protect Educator Routes)
// Protecting our educator routes so that only educator can add course
export const protectEducator = async (req, res, next) => {
    try {
        console.log("AUTH:", req.auth());
        console.log("HEADER:", req.headers.authorization);
        const { userId } = req.auth()

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "No valid userId from Clerk",
            });
        }


        const response = await clerkClient.users.getUser(userId)

        // check publicMeta data
        if (response.publicMetadata.role !== 'educator') {
            res.json({
                success: false,
                message: 'Unauthorized Access'
            })
        }

        next()

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}