/* eslint-disable jsx-a11y/anchor-has-content, react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';
import isServer from 'util/isServer';

const NextComposed = React.forwardRef(function NextComposed(
{ as, href, ...other },
ref
) {
return (
    <NextLink href={href} as={as}>
        <a ref={ref} {...other} />
    </NextLink>
);
});

NextComposed.propTypes = {
as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
prefetch: PropTypes.bool,
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link({
href,
activeClassName = 'active',
className: classNameProps,
innerRef,
variant,
naked,
...other
}) {
const router = useRouter();
const pathname = typeof href === 'string' ? href : href.pathname;
const className = clsx(classNameProps, {
    [activeClassName]: router?.pathname === pathname && activeClassName,
});

if (naked) {
    return (
        <NextComposed
            className={className}
            ref={innerRef}
            href={href}
            {...other}
        />
    );
}

const isExternalLink = linkHref => {
    const checkHref = `${window.location.protocol}//${window.location.host}`;
    return !(
        !linkHref ||
        linkHref[0] === '?' ||
        linkHref[0] === '/' ||
        linkHref[0] === '#' ||
        linkHref.startsWith(checkHref) ||
        linkHref.startsWith(window.location.host) ||
        linkHref.substring(0, 4) === 'tel:' ||
        linkHref.substring(0, 7) === 'mailto:'
    );
};

let target;
if (!isServer()) {
    target = isExternalLink(href) ? '_blank' : undefined;
}
return (
    <MuiLink
        target={target}
        component={NextComposed}
        className={className}
        ref={innerRef}
        href={href}
        variant={variant}
        {...other}
    />
);
}

Link.propTypes = {
activeClassName: PropTypes.string,
as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
className: PropTypes.string,
href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
naked: PropTypes.bool,
onClick: PropTypes.func,
prefetch: PropTypes.bool,
variant: PropTypes.string,
};

export default React.forwardRef((props, ref) => (
<Link {...props} innerRef={ref} />
));
