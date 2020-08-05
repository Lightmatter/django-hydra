import PropTypes from 'prop-types';

const Title = ({ stream }) => {
    return <div>{stream.title}</div>;
};

Title.propTypes = {
    stream: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
};

export default Title;
