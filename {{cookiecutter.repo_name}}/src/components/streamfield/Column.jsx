import PropTypes from 'prop-types';
import StreamField from 'components/streamfield/StreamField';

const Column = ({ stream }) => {
    return (
        <div className={stream.className}>
            <StreamField stream={stream.body} />
        </div>
    );
};

Column.propTypes = {
    stream: PropTypes.shape({
        className: PropTypes.string,
        body: PropTypes.arrayOf(
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

export default Column;
