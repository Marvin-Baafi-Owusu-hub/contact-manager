const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@route GET /api/contacts
const getContacts = asyncHandler(async (req, res) => {
   try {
    console.log("USER:", req.user);

    const contacts = await Contact.find({ user_id: req.user._id });

    res.json(contacts);
    } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ message: error.message });
    }
});  
//@route POST /api/contacts 

const createContact = asyncHandler(async(req, res) => {
    const {name, email, phone, type} = req.body; 
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are required");
    }
    const contactExists = await Contact.findOne({
        email,
        user_id: req.user._id
    });
    if(contactExists){
        res.status(400);
        throw new Error("The contact already exists");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        type,
        user_id: req.user._id
    });
    return res.status(201).json(contact);
})

//@route GET /api/contacts/:id
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    return res.status(200).json(contact);
});
//@route PUT /api/contacts/:id

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found"); 
    }
    if(contact.user_id.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("User doesn't have permission to update other user's contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
    return res.status(200).json(updatedContact);
});
//@route DELETE /api/contacts/:id

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("User doesn't have permission to delete other user's contact");
    }
    await contact.deleteOne();
    return res.status(200).json(contact);
});

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};