import User from "../models/User.js"


// Update User CartData : /api/cart/update



export const updateCart = async (req, res) => {
    try {
        // Use authenticated user ID from middleware, not from body
        const userId = req.userId;
        const { cartItems } = req.body;

        if (!cartItems || typeof cartItems !== 'object') {
            return res.status(400).json({ success: false, message: "Invalid cart data" });
        }

        const updated = await User.findByIdAndUpdate(
            userId,
            { cartItems },
            { new: true } // Return updated document
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, cartItems: updated.cartItems });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}