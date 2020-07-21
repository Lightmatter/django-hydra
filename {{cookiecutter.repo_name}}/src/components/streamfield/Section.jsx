import PropTypes from 'prop-types';
import StreamField from 'components/streamfield/StreamField';

const Section = ({ stream }) => {
    return (
        <div className={stream.specialClass}>
            <StreamField stream={stream.rows} />
        </div>
    );
};

Section.propTypes = {
    stream: PropTypes.shape({
        specialClass: PropTypes.string,
        rows: PropTypes.arrayOf(
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

export default Section;
