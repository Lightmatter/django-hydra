import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Link from 'components/router/Link';

export default function Footer({ className }) {
    return (
        <Paper className={className} elevation={0}>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://www.lightmatter.com/">
                    Lightmatter
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Paper>
    );
}
