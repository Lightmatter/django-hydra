import Link from 'next/link';
const Header = props => (
    <header>
        <Link href="/">
            <h4>Lightmatter!</h4>
        </Link>
        <Link href="/login">
            <a> Login </a>
        </Link>
        <Link href="/signup">
            <a> signup </a>
        </Link>
    </header>
);
export default Header;
