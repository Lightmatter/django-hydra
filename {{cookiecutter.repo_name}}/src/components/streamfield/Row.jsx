import PropTypes from 'prop-types';

import streamProp from '{{cookiecutter.repo_name}}/src/components/streamfield/props';
import StreamField from '{{cookiecutter.repo_name}}/src/components/streamfield/StreamField';

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
    content: streamProp,
  }).isRequired,
};

export default Row;
