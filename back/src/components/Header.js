import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <header>
        <Link to="/" className='logo'>LegalCompany</Link>
        <nav>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Sign Up</Link>
        </nav>
      </header>
    );
}