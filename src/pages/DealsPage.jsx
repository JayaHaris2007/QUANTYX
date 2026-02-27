import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, Zap, Star, ShoppingCart, Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const dealProducts = products.filter(p => p.originalPrice);

function CountdownTimer() {
    const [time, setTime] = useState({ hours: 11, minutes: 45, seconds: 32 });

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => {
                let { hours, minutes, seconds } = prev;
                seconds--;
                if (seconds < 0) { seconds = 59; minutes--; }
                if (minutes < 0) { minutes = 59; hours--; }
                if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const pad = n => String(n).padStart(2, '0');

    return (
        <div className="flex items-center gap-3">
            {[
                { val: time.hours, label: 'HRS' },
                { val: time.minutes, label: 'MIN' },
                { val: time.seconds, label: 'SEC' },
            ].map((unit, i) => (
                <div key={unit.label} className="flex items-center gap-3">
                    <div className="flex flex-col items-center bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm min-w-[60px]">
                        <span className="font-outfit font-black text-2xl sm:text-3xl text-slate-900 tabular-nums">
                            {pad(unit.val)}
                        </span>
                        <span className="text-[9px] font-inter font-bold uppercase tracking-widest text-slate-400 mt-0.5">
                            {unit.label}
                        </span>
                    </div>
                    {i < 2 && (
                        <span className="text-primary/60 text-2xl font-bold">:</span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default function DealsPage() {
    const { addToCart, isInCart } = useCart();
    const [addedId, setAddedId] = useState(null);

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 1500);
    };

    return (
        <div className="min-h-screen bg-light-900">
            <Navbar />

            {/* Hero Banner */}
            <section className="pt-28 pb-8 px-4 relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto text-center relative">
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6"
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Flame size={14} className="text-red-500" />
                        <span className="text-xs font-inter font-bold uppercase tracking-wider text-red-500">
                            Flash Deals — Limited Time Only
                        </span>
                        <Flame size={14} className="text-red-500" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-outfit font-black text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-4"
                    >
                        Today's <span className="text-gradient">Hot Deals</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-inter text-slate-500 text-base md:text-lg max-w-xl mx-auto mb-8"
                    >
                        Grab these insane discounts before they're gone. Hurry up!
                    </motion.p>

                    {/* Countdown */}
                    <motion.div
                        className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm mb-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Clock size={18} className="text-primary" />
                        <span className="text-xs font-inter font-semibold uppercase tracking-wider text-slate-500">
                            Ends in
                        </span>
                        <CountdownTimer />
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="px-4 pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
                        {[
                            { value: `${dealProducts.length}`, label: 'Active Deals' },
                            { value: 'Up to 25%', label: 'Savings' },
                            { value: '24h', label: 'Time Left' },
                        ].map(stat => (
                            <div key={stat.label} className="text-center">
                                <div className="font-outfit font-bold text-2xl text-gradient">{stat.value}</div>
                                <div className="font-inter text-xs text-slate-400 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deal Cards Grid */}
            <section className="px-4 pb-20">
                <div className="max-w-7xl mx-auto">
                    <p className="text-sm font-inter text-slate-400 mb-6">
                        Showing <span className="text-slate-800 font-medium">{dealProducts.length}</span> deals
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {dealProducts.map((product, index) => {
                            const discountPct = Math.round(
                                ((product.originalPrice - product.price) / product.originalPrice) * 100
                            );
                            const inCart = isInCart(product.id);
                            const justAdded = addedId === product.id;

                            return (
                                <motion.div
                                    key={product.id}
                                    className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-red-500/10 transition-all duration-500"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.06 }}
                                >
                                    {/* Border gradient */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/20 via-primary/15 to-secondary/20 p-[1.5px]">
                                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white via-white to-light-800" />
                                    </div>

                                    <div className="relative p-5">
                                        {/* Discount + badge */}
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="px-3 py-1 text-xs font-inter font-black uppercase tracking-wider bg-red-500/10 border border-red-500/20 text-red-500 rounded-full">
                                                {discountPct}% OFF
                                            </span>
                                            <motion.div
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                                            >
                                                <Zap size={18} className="text-yellow-500 fill-yellow-500" />
                                            </motion.div>
                                        </div>

                                        {/* Product image */}
                                        <div className="relative h-48 w-full rounded-xl overflow-hidden mb-3">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>

                                        {/* Info */}
                                        <p className="text-[10px] font-inter font-semibold uppercase tracking-widest text-slate-400 mb-1">
                                            {product.category}
                                        </p>
                                        <h3 className="font-outfit font-bold text-slate-800 text-lg mb-1.5 group-hover:text-primary transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-xs font-inter text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                                            {product.description}
                                        </p>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1.5 mb-3">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={12}
                                                        className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs font-inter text-slate-400">
                                                {product.rating} ({product.reviews})
                                            </span>
                                        </div>

                                        {/* Price & CTA */}
                                        <div className="flex items-end justify-between mb-4">
                                            <div>
                                                <span className="text-xs font-inter text-slate-400 line-through mr-2">
                                                    ${product.originalPrice}
                                                </span>
                                                <span className="font-outfit font-black text-2xl text-slate-900">
                                                    ${product.price}
                                                </span>
                                            </div>
                                            <span className="text-xs font-inter font-bold text-green-600">
                                                Save ${(product.originalPrice - product.price).toFixed(2)}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-inter font-semibold transition-all duration-300 ${justAdded
                                                ? 'bg-green-500/10 border border-green-500/20 text-green-600'
                                                : inCart
                                                    ? 'bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15'
                                                    : 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-[0_4px_20px_rgba(239,68,68,0.3)]'
                                                }`}
                                        >
                                            {justAdded ? (
                                                <><Check size={16} /> Added!</>
                                            ) : inCart ? (
                                                <><ShoppingCart size={16} /> Add More</>
                                            ) : (
                                                <><ShoppingCart size={16} /> Grab Deal</>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Back link */}
                    <motion.div
                        className="flex justify-center mt-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link to="/" className="group flex items-center gap-2 font-outfit font-semibold text-primary hover:text-slate-900 transition-colors text-sm uppercase tracking-wider">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
