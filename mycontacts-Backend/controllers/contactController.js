const asyncHandler = require("express-async-handler");
const Contacts = require("../models/contactmodel");

/* 
@desc Get all Contacts
@routes GET /api/controller
@access public
*/
const getContacts = asyncHandler(async (req, res) => {
  const conatcts = await Contacts.find();
  res.json(conatcts);
});

/* 
@desc Create Contacts
@routes POST /api/controller
@access public
*/
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phonenumber } = req.body;
  if (!name || !email || !phonenumber) {
    res.status(400);
    throw new Error("All fields are manditory");
  }
  const contacts = await Contacts.create({
    name,
    email,
    phonenumber,
  });
  res.status(201).json(contacts);
});

/* 
@desc get Contact
@routes GET /api/controller/:id
@access public
*/
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found!");
  }
  res.status(200).json(contact);
});

/* 
@desc update Contact
@routes GET /api/controller/:id
@access public
*/
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found!");
  }
  const updatedContact = await Contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).json(updatedContact);
});

/* 
@desc Delete Contacts
@routes POST /api/controller/:id
@access public
*/
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findByIdAndDelete(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found!");
  }
  res.status(201).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  deleteContact,
  updateContact,
};
