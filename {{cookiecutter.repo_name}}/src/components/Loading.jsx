import { CircularProgress } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    center: {
        margin: '10% auto 0 auto',
        display: 'block',
    },
}));

const Loading = () => {
    const classes = useStyles();
    return <CircularProgress className={classes.center} />;
};

export default Loading;
