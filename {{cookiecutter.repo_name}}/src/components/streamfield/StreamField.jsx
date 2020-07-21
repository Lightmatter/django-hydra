import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import Default from 'components/streamfield/Default';

const StreamField = ({ stream }) => {
    let StreamComponent;
    const sections = stream.map(section => {
        if (section.component) {
            StreamComponent = dynamic(
                () => import(`components/streamfield/${section.component}`),
                { loading: () => <p>Loading {section.component}</p> }
            );
        } else {
            StreamComponent = Default;
        }
        return <StreamComponent stream={section.value} key={section.id} />;
    });
    return <div>{sections}</div>;
};

StreamField.propTypes = {
    stream: PropTypes.arrayOf(
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
    ).isRequired,
};

export default StreamField;
