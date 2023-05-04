const express = require("express");
const {
  getAllContact,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas/contacts");

const router = express.Router();

router.get("/", getAllContact);

router.get("/:contactId", getContactById);

router.post("/", validateBody(addSchema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateBody(addSchema), updateContact);

module.exports = router;
