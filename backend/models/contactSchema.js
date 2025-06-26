import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name must contain at least 3 characters."],
        maxLength: [100, "Name cannot exceed 100 characters."],
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."],
    },
    subject: {
        type: String,
        required: true,
        minLength: [5, "Subject must contain at least 5 characters."],
        maxLength: [200, "Subject cannot exceed 200 characters."],
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "Message must contain at least 10 characters."],
    },

    imageAttech: {
        public_id: {
            type: String,

        },
        url: {
            type: String,
        },
    },
}, {
    timestamps: true,
})

export const Contact = mongoose.model("Contact", contactSchema)
