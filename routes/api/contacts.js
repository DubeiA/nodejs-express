const express = require("express");
const {
  getAllContact,
  addContact,
  getContactById,

  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const { addJoiSchema, favoriteJoiSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", getAllContact);

router.get("/:contactId", getContactById);

router.post("/", validateBody(addJoiSchema), addContact);

router.patch(
  "/:contactId/favorite",
  validateBody(favoriteJoiSchema),
  updateStatusContact
);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateBody(addJoiSchema), updateContact);

module.exports = router;
