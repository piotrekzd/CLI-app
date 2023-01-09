import { Command } from 'commander';
import { listContacts, getContactsById, addContact, removeContact } from './contacts.js';

const program = new Command();

program
    .name('contacts manager')
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            listContacts();
            break;

        case 'get':
            getContactsById(id);
            break;

        case 'add':
            addContact(name, email, phone);
            break;

        case 'remove':
            removeContact(id);
            break;
    };
};

invokeAction(argv);