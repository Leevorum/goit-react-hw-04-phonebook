import PropTypes from 'prop-types';
import s from './Section.module.css';

export default function Section({ title, children, border }) {
  return (
    <section className={s.section} style={{ border }}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  border: PropTypes.string,
};
