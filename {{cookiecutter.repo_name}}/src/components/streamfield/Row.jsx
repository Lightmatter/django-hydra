import PropTypes from 'prop-types';
import StreamField from 'components/streamfield/StreamField';

const Row = ({ stream }) => {
    return (
        <div className={stream.className}>
            <StreamField stream={stream.content} />
        </div>
    );
};

Row.propTypes = {
    stream: PropTypes.shape({
        className: PropTypes.string,
        content: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                value: PropTypes.oneOfType([
                    PropTypes.array,
                    PropTypes.object,
                    PropTypes.string,
                ]),
                type: PropTypes.string.isRequired,
                component: PropTypes.string.isRequired,
            })
        ),
    }).isRequired,
};

export default Row;
