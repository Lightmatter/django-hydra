import PropTypes from 'prop-types';

import streamProp from 'components/streamfield/props';
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
        rows: streamProp,
    }).isRequired,
};

export default Section;
