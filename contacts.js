import fs from 'fs/promises';
import path from 'path';
import color from 'colors'

const contactsPath = path.resolve('db');

export const fetchContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath, { encoding: 'utf-8' });
        const contactsList = JSON.parse(data);
        return contactsList;
    } catch (error) {
        console.log(error.message);
    };
};

export const listContacts = async () => {
    try {
        const contacts = await fetchContacts();
        console.table(contacts)
        return;
    } catch (error) {
        console.log(error.message);
    };
};

export const getContactsById = async (contactId) => {
    try {
        const contacts = await fetchContacts();
        const requestContactById = contacts.find(({ id }) => id === contactId);
        if (!requestContactById) {
            console.log(color.red('This contact does not exist!'))
        } else {
            console.table(requestContactById);
        };
    } catch (error) {
        console.log(error.message);
    };
};

export const addContact = async (name, email, phone) => {
    try {
        const contacts = await fetchContacts();
        const newId = Math.max(...contacts.map(contact => parseInt(contact.id, 10))) + 1;
        const newContact = { id: newId.toString(), name, email, phone };
        const updatedContacts = [...contacts, newContact];
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), { encoding: 'utf-8' });
        console.log(color.green('Contact added successfully!'));
        console.table(newContact);
    } catch (error) {
        console.log(error.message);
    };
};

export const removeContact = async (contactId) => {
    try {
        const contacts = await fetchContacts();
        const filteredContacts = contacts.filter(({ id }) => id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2), { encoding: 'utf-8' });
        console.log(color.green('Contact removed successfully!'));
    } catch (error) {
        console.log(error.message);
    };
};