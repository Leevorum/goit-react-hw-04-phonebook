import PropTypes from 'prop-types';
import s from './ContactList.module.css';

export default function ContactList({ filteredState, onDelete }) {
  return (
    <ul className={s.list}>
      {filteredState.map(contact => {
        return (
          <li key={contact.id} className={s.listItem}>
            {contact.name} : {contact.number}
            <button onClick={() => onDelete(contact.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  filteredState: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
