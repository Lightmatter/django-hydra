import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

const AccountPageHeader = ({ children }) => {
    return (
        <Box width="200px" mb={2} pt={6} display="flex" justifyContent="center">
            {children}
        </Box>
    );
};

AccountPageHeader.propTypes = {
    children: PropTypes.object,
};

AccountPageHeader.defaultProps = {
    children: [],
};

export default AccountPageHeader;
