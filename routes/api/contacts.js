const express = require("express");
const {
  getAllContact,
  addContact,
  getContactById,

  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");
const { addJoiSchema, favoriteJoiSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", getAllContact);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(addJoiSchema), addContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(favoriteJoiSchema),
  updateStatusContact
);

router.delete("/:contactId", isValidId, removeContact);

router.put("/:contactId", isValidId, validateBody(addJoiSchema), updateContact);

module.exports = router;
