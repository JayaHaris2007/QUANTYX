import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Deals', href: '/deals' },
    { label: 'Reviews', href: '/reviews' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { cartCount, wishlist } = useCart();
    const wishlistCount = wishlist.length;

    const getActive = () => {
        const path = location.pathname;
        const match = navLinks.find(l => l.href === path);
        return match ? match.label : 'Home';
    };
    const active = getActive();

    return (
        <nav className="fixed top-4 left-4 right-4 z-50">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white/80 backdrop-blur-2xl rounded-full border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)] px-4 sm:px-6">
                    <div className="flex items-center justify-between h-14">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_12px_rgba(8,145,178,0.2)] group-hover:shadow-[0_0_20px_rgba(8,145,178,0.35)] transition-shadow">
                                <Zap size={16} className="text-white fill-white" />
                            </div>
                            <span className="font-outfit font-bold text-lg tracking-tight bg-gradient-to-r from-primary via-slate-800 to-secondary bg-clip-text text-transparent">
                                QUANTYX
                            </span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-1 bg-slate-100/80 rounded-full px-1.5 py-1 border border-slate-200/60">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    className="relative px-4 py-1.5 text-sm font-inter font-medium transition-colors duration-200 rounded-full"
                                >
                                    {active === link.label && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className={`relative z-10 ${active === link.label ? 'text-primary' : 'text-slate-500 hover:text-slate-900'}`}>
                                        {link.label}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-1.5 shrink-0">
                            <button className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200" aria-label="Search">
                                <Search size={16} />
                            </button>
                            <Link to="/wishlist" className="p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 relative" aria-label="Wishlist">
                                <Heart size={16} />
                                {wishlistCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-[8px] font-bold flex items-center justify-center text-white">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>
                            <Link to="/cart" className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200 relative" aria-label="Cart">
                                <ShoppingCart size={16} />
                                {cartCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-gradient-to-r from-primary to-secondary rounded-full text-[8px] font-bold flex items-center justify-center text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <div className="w-px h-5 bg-slate-200 mx-1" />
                            <button className="px-4 py-1.5 text-xs font-inter font-semibold rounded-full bg-gradient-to-r from-primary to-cyan-500 text-white hover:shadow-[0_4px_20px_rgba(8,145,178,0.3)] transition-all duration-300">
                                Sign In
                            </button>
                        </div>

                        {/* Mobile */}
                        <div className="flex md:hidden items-center gap-1">
                            <Link to="/wishlist" className="p-2 rounded-full text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all relative" aria-label="Wishlist">
                                <Heart size={18} />
                                {wishlistCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-[8px] font-bold flex items-center justify-center text-white">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>
                            <Link to="/cart" className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all relative" aria-label="Cart">
                                <ShoppingCart size={18} />
                                {cartCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-gradient-to-r from-primary to-secondary rounded-full text-[8px] font-bold flex items-center justify-center text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="md:hidden mt-2 bg-white/90 backdrop-blur-2xl rounded-2xl border border-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden"
                        >
                            <div className="p-4 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        to={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-4 py-2.5 rounded-xl text-sm font-inter font-medium transition-all duration-200 ${active === link.label
                                            ? 'bg-primary/10 text-primary border border-primary/20'
                                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="pt-2">
                                    <button className="w-full py-2.5 text-xs font-inter font-semibold rounded-xl bg-gradient-to-r from-primary to-cyan-500 text-white hover:shadow-[0_4px_20px_rgba(8,145,178,0.3)] transition-all duration-300">
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
