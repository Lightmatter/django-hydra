import PropTypes from 'prop-types';

const streamProp = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]).isRequired,
    type: PropTypes.string.isRequired,
    component: PropTypes.string.isRequired,
  }).isRequired
);

export default streamProp;
