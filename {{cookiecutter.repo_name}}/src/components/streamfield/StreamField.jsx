import dynamic from 'next/dynamic';

import streamProp from 'components/streamfield/props';
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
    stream: streamProp.isRequired,
};

export default StreamField;
