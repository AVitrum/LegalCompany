import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

export default function Layout() {
    return (
        <div>
            <header>
                <Header />
            </header>
            <main style={{ flex: '1 0 auto' }}>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
