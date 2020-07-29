import PropTypes from 'prop-types';

// Maybe this can be built out to be more useful?
// but for now it's meant to alert you that your block has no component
const DefaultComponent = ({ stream }) => {
    return <div className="default">{`${stream}`}</div>;
};

DefaultComponent.propTypes = {
    stream: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
    ]).isRequired,
};

export default DefaultComponent;
