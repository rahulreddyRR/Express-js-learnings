const asyncHandler = require('express-async-handler');

/* 
@desc Get all Contacts
@routes GET /api/controller
@access public
*/
const getContacts = asyncHandler(async (req, res) => {
    res.json({ message: "Get all Contacts" });
})

/* 
@desc Create Contacts
@routes POST /api/controller
@access public
*/
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phonenumber } = req.body;
    if (!name || !email || !phonenumber) {
        res.status(400);
        throw new Error("All fields are manditory")
    }
    res.status(201).json({ message: "Craete Contact" });
})

/* 
@desc get Contact
@routes GET /api/controller/:id
@access public
*/
const getContact = asyncHandler(async (req, res) => {
    res.json({ message: `get contact for ${req.params.id}` });
})

/* 
@desc update Contact
@routes GET /api/controller/:id
@access public
*/
const updateContact = asyncHandler(async (req, res) => {
    res.status(201).json({ message: `updated contact ${req.params.id}` });
})

/* 
@desc Delete Contacts
@routes POST /api/controller/:id
@access public
*/
const deleteContact = asyncHandler(async (req, res) => {
    res.status(201).json({ message: `Deleted contact ${req.params.id}` });
})

module.exports = { getContacts, createContact, getContact, deleteContact, updateContact }