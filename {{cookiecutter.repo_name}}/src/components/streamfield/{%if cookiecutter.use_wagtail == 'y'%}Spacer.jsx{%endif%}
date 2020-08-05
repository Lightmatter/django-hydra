import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

// TODO could be cleaner than rendering 2 boxes with css and do a screen size thing in react maybe? but I wonder how that would behave if you had 30 spacers on a page having a hook run in each one?
const Spacer = ({ stream }) => {
    console.log(stream);
    const { height, mobileHeight } = stream;
    return (
        <>
            {height > 0 && (
                <Box className="spacer show-for-medium" height={height} />
            )}
            {mobileHeight > 0 && (
                <Box
                    className="mobile-spacer show-for-small-only"
                    height={mobileHeight}
                />
            )}
        </>
    );
};
Spacer.propTypes = {
    stream: PropTypes.shape({
        height: PropTypes.number.isRequired,
        mobileHeight: PropTypes.number,
    }).isRequired,
};
export default Spacer;
