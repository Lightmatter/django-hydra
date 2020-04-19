import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
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
    const auth = useIsAuthenticated();
    const logoutButtonClick = () => {
        logOut();
        profileMenuState.close();
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    {...bindTrigger(navMenuState)}
                >
                    <MenuIcon />
                </IconButton>
                <Menu keepMounted {...bindMenu(navMenuState)}>
                    <MenuItem onClick={navMenuState.close}>
                        <Link href="/login">Login</Link>
                    </MenuItem>
                    <MenuItem onClick={navMenuState.close}>
                        <Link href="/signup">Sign Up</Link>
                    </MenuItem>
                </Menu>
                <Link href="/">
                    <Typography variant="h6" color="textPrimary" className={classes.title}>
                        Lightmatter
                    </Typography>
                </Link>
                {auth && (
                    <div>
                        Hey {user.first_name}
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
                            <MenuItem onClick={profileMenuState.close}>Profile</MenuItem>
                            <MenuItem onClick={profileMenuState.close}>My account</MenuItem>
                            <MenuItem onClick={logoutButtonClick}>Logout</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}
