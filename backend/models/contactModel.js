const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    email: {
        type: String,
        required: [true, "Please add the email address"],
    },
    phone: {
        type: String,
        required: [true, "Please add the phone number"]
    },
    type: {
        type: String,
        enum: ["personal", "professional"],
        default: "personal", 
    }
}, 
{
    timestamps: true
}
);

contactSchema.index({user_id: 1, email: 1}, {unique: true});

module.exports = mongoose.model("Contact", contactSchema);