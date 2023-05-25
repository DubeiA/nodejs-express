const express = require("express");
const {
  getAllContact,
  addContact,
  getContactById,

  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { addJoiSchema, favoriteJoiSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, getAllContact);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.post("/", authenticate, validateBody(addJoiSchema), addContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(addJoiSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(favoriteJoiSchema),
  updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, removeContact);

module.exports = router;
