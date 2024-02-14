const asyncHandler = require("express-async-handler");
const Contacts = require("../models/contactmodel");

/* 
@desc Get all Contacts
@routes GET /api/controller
@access private
*/
const getContacts = asyncHandler(async (req, res) => {
  const conatcts = await Contacts.find({ user_id: req.user.id });
  res.json(conatcts);
});

/* 
@desc Create Contacts
@routes POST /api/controller
@access private
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
    user_id: req.user.id,
  });
  res.status(201).json(contacts);
});

/* 
@desc get Contact
@routes GET /api/controller/:id
@access private
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
@access private
*/
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found!");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update others contact");
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
@access private
*/
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found!");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update others contact");
  }
  await Contacts.deleteOne({ _id: req.params.id });
  res.status(201).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  deleteContact,
  updateContact,
};
