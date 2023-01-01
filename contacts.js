import fs from 'fs/promises';
import path from 'path';

const contactsPath = path.resolve('db');

export const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });
        const contactsList = JSON.parse(data);
        return contactsList;
    } catch (error) {
        console.log(error.message);
    };
};

export const getContactsById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const requestContactById = contacts.find(({ id }) => id === contactId);
        return requestContactById;
    } catch (error) {
        console.log(error.message);
    };
};

export const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        const newId = Math.max(...contacts.map(contact => parseInt(contact.id, 10))) + 1;
        const newContact = { id: newId.toString(), name, email, phone };
        const updatedContacts = [...contacts, newContact];
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), { encoding: 'utf-8' });
    } catch (error) {
        console.log(error.message);
    };
};

export const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const filteredContacts = contacts.filter(({ id }) => id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2), { encoding: 'utf-8' });
    } catch (error) {
        console.log(error.message);
    };
};