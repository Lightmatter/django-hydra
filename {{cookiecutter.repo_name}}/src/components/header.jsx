import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';

import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Link from 'components/router/Link';
import { useIsAuthenticated, useCurrentUser, logOut } from 'models/user';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const navMenuState = usePopupState({ variant: 'popover', popupId: 'navMenu' });
    const profileMenuState = usePopupState({ variant: 'popover', popupId: 'profileMenu' });
    const user = useCurrentUser();
    const logoutButtonClick = () => {
        logOut();
        profileMenuState.close();
    };
    const throwException = () => {
        throw 'Exception';
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    data-cy="auth-menu-button"
                    {...bindTrigger(navMenuState)}
                >
                    <MenuIcon />
                </IconButton>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={6} md={3}>
                        <Menu keepMounted {...bindMenu(navMenuState)}>
                            <MenuItem onClick={navMenuState.close}>
                                <Link data-cy="login" href="/login">
                                    Login
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={navMenuState.close}>
                                <Link data-cy="signup" href="/signup">
                                    Sign Up
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={throwException}>Throw an error</MenuItem>
                        </Menu>
                        <Link href="/">
                            <Typography variant="h6" color="textPrimary" className={classes.title}>
                                Lightmatter
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={9} align="right">

                        {user && (
                            <div>
                                <span data-cy="logged-in-name">Hey {user.first_name}</span>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    {...bindTrigger(profileMenuState)}
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu id="menu-appbar" {...bindMenu(profileMenuState)}>
                                    <MenuItem onClick={profileMenuState.close}>
                                        <Link href="/account">Profile</Link>
                                    </MenuItem>
                                    <MenuItem onClick={profileMenuState.close}>
                                        <Link href="/account/change-password">Change Password</Link>
                                    </MenuItem>
                                    <MenuItem onClick={profileMenuState.close}>
                                        <Link href="/account/change-email">Change Email</Link>
                                    </MenuItem>
                                    <MenuItem onClick={profileMenuState.close}>
                                        <Link href="/account/delete-account">Delete Account</Link>
                                    </MenuItem>

                                    <MenuItem onClick={logoutButtonClick}>Logout</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
