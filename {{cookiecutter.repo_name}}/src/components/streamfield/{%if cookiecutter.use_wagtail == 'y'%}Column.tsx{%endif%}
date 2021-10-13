import PropTypes from 'prop-types';

import streamProp from '{{cookiecutter.repo_name}}/src/components/streamfield/props';
import StreamField from '{{cookiecutter.repo_name}}/src/components/streamfield/StreamField';

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
