import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import Section from 'components/Section/Section';

export function App() {
  const localContacts = localStorage.getItem('contacts');
  const parseContacts = JSON.parse(localContacts);
  const [contacts, setContacts] = useState(() => {
    if (parseContacts) {
      return parseContacts;
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  //Add contacts to the state
  const handleChange = evt => {
    setFilter(evt.target.value);
  };

  //Add contacts
  const handleAddContact = data => {
    const existContact = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(data.name.toLowerCase());
    });

    //If the name is in the contact list, throw a notification and cancel the code execution
    if (existContact.length > 0) {
      alert(`${data.name}, is already in your contacts`);
      return;
    }

    //Add an ID to a contact
    const id = nanoid();
    setContacts([
      { name: data.name, id: id, number: data.number },
      ...contacts,
    ]);
  };

  //Delete a contact with ID
  const deleteContact = contactId => {
    //Return a new state without contact

    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  //Add initial contacts from LocalStorage
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  //Filters
  const toLowerCaseFilter = filter.toLowerCase();
  const filteredState = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(toLowerCaseFilter);
  });

  return (
    <div>
      <Section title="Phonebook" border="1px solid">
        <ContactForm onSubmit={handleAddContact} />
      </Section>

      <Section title="Contacts">
        <Filter value={filter} onChange={handleChange} />
        <ContactList filteredState={filteredState} onDelete={deleteContact} />
      </Section>
    </div>
  );
}
