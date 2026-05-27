import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
    const { login, signup } = useAuth();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e = {};
        if (!isLogin && !form.username.trim()) e.username = 'Username is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email format';
        if (!form.password) e.password = 'Password is required';
        else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        const e2 = validate();
        if (Object.keys(e2).length) return setErrors(e2);
        setErrors({});
        setLoading(true);
        try {
            if (isLogin) await login(form.email, form.password);
            else await signup(form.username, form.email, form.password);
            navigate('/');
        } catch (err) {
            setServerError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const toggle = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setServerError('');
        setForm({ username: '', email: '', password: '' });
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    {isLogin ? 'Sign in to your account' : 'Create an account'}
                </h2>

                {serverError && (
                    <div className="mb-4 px-4 py-3 bg-red-500/20 border border-red-500 text-red-400 rounded-lg text-sm">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Username</label>
                            <input
                                type="text"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-indigo-500"
                                placeholder="john"
                            />
                            {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Email</label>
                        <input
                            type="text"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-indigo-500"
                            placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-indigo-500"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                        {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-sm mt-6">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button onClick={toggle} className="text-indigo-400 hover:underline">
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                </p>
            </div>
        </div>
    );
}
