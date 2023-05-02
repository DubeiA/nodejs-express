const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const findContact = contacts.find((item) => item.id === id);
  return findContact || null;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const searchContact = contacts.findIndex((item) => item.id === id);
  if (searchContact === -1) {
    return null;
  }
  contacts[searchContact] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[searchContact];
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const searchContact = contacts.findIndex((item) => item.id === id);
  if (searchContact === -1) {
    return null;
  }
  const [result] = contacts.splice(searchContact, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
