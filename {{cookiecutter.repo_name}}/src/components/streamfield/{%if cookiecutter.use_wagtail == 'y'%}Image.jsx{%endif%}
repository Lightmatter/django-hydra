import PropTypes from 'prop-types';

// todo setup header preloading and placeholder
const Image = ({ stream }) => {
    if (stream == null) return <></>;
    return (
        <img
            src={stream.url}
            width={stream.width}
            height={stream.height}
            alt={stream.title}
        />
    );
};

Image.propTypes = {
    stream: PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
    }).isRequired,
};

export default Image;
