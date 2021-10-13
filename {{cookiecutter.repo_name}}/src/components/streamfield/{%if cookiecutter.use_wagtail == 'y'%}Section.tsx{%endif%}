import PropTypes from 'prop-types';

import streamProp from '{{cookiecutter.repo_name}}/src/components/streamfield/props';
import StreamField from '{{cookiecutter.repo_name}}/src/components/streamfield/StreamField';

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
