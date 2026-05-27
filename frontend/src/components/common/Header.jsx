import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 border-b border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Logo"
                            className="h-8 w-auto"
                        />
                        <span className="text-white font-semibold text-lg">TaskManager</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-300 text-sm hidden sm:block">
                            Hi, {user?.username}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-1.5 text-sm text-gray-300 border border-gray-600 rounded-lg hover:bg-white/5 hover:text-white transition-colors duration-200"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
