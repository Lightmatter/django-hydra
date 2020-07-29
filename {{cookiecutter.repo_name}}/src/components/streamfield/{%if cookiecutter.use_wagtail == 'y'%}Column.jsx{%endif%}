import PropTypes from 'prop-types';

import streamProp from 'components/streamfield/props';
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
        body: streamProp,
    }).isRequired,
};

export default Column;
