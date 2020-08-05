import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from 'material-ui-popup-state/hooks';
import { useRef } from 'react';

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Router from 'next/router';

import Link from 'components/router/Link';
import { useCurrentUser, logOut } from 'models/user';

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
    const anchorRef = useRef(null);
    const navMenuState = usePopupState({
        variant: 'popover',
        popupId: 'navMenu',
    });
    const profileMenuState = usePopupState({
        variant: 'popover',
        popupId: 'profileMenu',
    });
    const user = useCurrentUser();

    const logoutButtonClick = () => {
        logOut();
        profileMenuState.close();
    };

    const handleMenuCloseWithLink = ({ event, link = '', callback = null }) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        if (link) {
            Router.push(link);
        }

        if (callback) {
            callback();
        }

        profileMenuState.close();
        navMenuState.close();
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
                            <MenuItem
                                data-cy="login"
                                onClick={event =>
                                    handleMenuCloseWithLink({
                                        event,
                                        link: '/login',
                                    })
                                }
                            >
                                Login
                            </MenuItem>
                            <MenuItem
                                data-cy="signup"
                                onClick={event =>
                                    handleMenuCloseWithLink({
                                        event,
                                        link: '/signup',
                                    })
                                }
                            >
                                Sign Up
                            </MenuItem>
                            <MenuItem
                                onClick={event =>
                                    handleMenuCloseWithLink({
                                        event,
                                        link: '/error-page',
                                    })
                                }
                            >
                                Throw an error
                            </MenuItem>
                        </Menu>
                        <Link href="/">
                            <Typography
                                variant="h6"
                                color="textPrimary"
                                className={classes.title}
                            >
                                Lightmatter
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={9} align="right">
                        {user && (
                            <div>
                                <span data-cy="logged-in-name">
                                    Hey {user.first_name}
                                </span>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    {...bindTrigger(profileMenuState)}
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    {...bindMenu(profileMenuState)}
                                >
                                    <MenuItem
                                        onClick={event =>
                                            handleMenuCloseWithLink({
                                                event,
                                                link: '/account',
                                            })
                                        }
                                    >
                                        Profile
                                    </MenuItem>
                                    <MenuItem
                                        onClick={event =>
                                            handleMenuCloseWithLink({
                                                event,
                                                link:
                                                    '/account/change-password',
                                            })
                                        }
                                    >
                                        Change Password
                                    </MenuItem>
                                    <MenuItem
                                        onClick={event =>
                                            handleMenuCloseWithLink({
                                                event,
                                                link: '/account/change-email',
                                            })
                                        }
                                    >
                                        Change Email
                                    </MenuItem>
                                    <MenuItem
                                        onClick={event =>
                                            handleMenuCloseWithLink({
                                                event,
                                                link: '/account/delete-account',
                                            })
                                        }
                                    >
                                        Delete Account
                                    </MenuItem>
                                    <MenuItem
                                        onClick={event =>
                                            handleMenuCloseWithLink({
                                                event,
                                                callback: logoutButtonClick,
                                            })
                                        }
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
