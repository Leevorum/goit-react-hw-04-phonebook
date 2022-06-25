import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import Section from 'components/Section/Section';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  //Add initial contacts from LocalStorage
  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(localContacts);
    if (parseContacts) {
      this.setState({
        contacts: parseContacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //Update local storage
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  //Add contacts to the state
  handleChange = evt => {
    this.setState({ [evt.currentTarget.name]: evt.target.value });
  };

  //Add contacts
  handleAddContact = data => {
    const stateContacts = [...this.state.contacts];
    const existContact = this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(data.name.toLowerCase());
    });

    //If the name is in the contact list, throw a notification and cancel the code execution
    if (existContact.length > 0) {
      alert(`${data.name}, is already in your contacts`);
      return;
    }

    //Add ann ID to a contact
    const id = nanoid();
    this.setState({
      contacts: [
        ...stateContacts,
        { name: data.name, id: id, number: data.number },
      ],
    });
  };

  //Delete a contact with ID
  deleteContact = contactId => {
    //Return a new state without contact
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const toLowerCaseFilter = this.state.filter.toLowerCase();
    const filteredState = this.state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(toLowerCaseFilter);
    });

    return (
      <div>
        <Section title="Phonebook" border="1px solid">
          <ContactForm onSubmit={this.handleAddContact} />
        </Section>

        <Section title="Contacts">
          <Filter value={this.state.filter} onChange={this.handleChange} />
          <ContactList
            filteredState={filteredState}
            onDelete={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}
