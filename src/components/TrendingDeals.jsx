import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, ArrowRight, Zap } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const dealProducts = products.filter(p => p.originalPrice).slice(0, 3);

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
        <div className="flex items-center gap-2">
            {[
                { val: time.hours, label: 'HRS' },
                { val: time.minutes, label: 'MIN' },
                { val: time.seconds, label: 'SEC' },
            ].map((unit, i) => (
                <div key={unit.label} className="flex items-center gap-2">
                    <div className="flex flex-col items-center">
                        <span className="font-outfit font-black text-2xl sm:text-3xl text-slate-900 tabular-nums w-12 text-center">
                            {pad(unit.val)}
                        </span>
                        <span className="text-[9px] font-inter font-bold uppercase tracking-widest text-slate-400 mt-0.5">
                            {unit.label}
                        </span>
                    </div>
                    {i < 2 && (
                        <span className="text-primary/60 text-2xl font-bold mb-4">:</span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default function TrendingDeals() {
    const { addToCart } = useCart();

    return (
        <section id="deals" className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-6"
                >
                    {/* Flash deal badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6"
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Flame size={14} className="text-red-500" />
                        <span className="text-xs font-inter font-bold uppercase tracking-wider text-red-500">
                            Flash Deals — Limited Time
                        </span>
                        <Flame size={14} className="text-red-500" />
                    </motion.div>

                    <h2 className="section-title">
                        Today's <span className="text-gradient">Hot Deals</span>
                    </h2>
                    <p className="section-subtitle !mb-8">
                        Grab these insane discounts before they're gone. Hurry up!
                    </p>

                    {/* Countdown */}
                    <motion.div
                        className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm mb-12"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Clock size={18} className="text-primary" />
                        <span className="text-xs font-inter font-semibold uppercase tracking-wider text-slate-500">
                            Ends in
                        </span>
                        <CountdownTimer />
                    </motion.div>
                </motion.div>

                {/* Deal Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                    {dealProducts.map((product, index) => {
                        const discountPct = Math.round(
                            ((product.originalPrice - product.price) / product.originalPrice) * 100
                        );
                        return (
                            <motion.div
                                key={product.id}
                                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-red-500/10 transition-all duration-500"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.12 }}
                            >
                                {/* Animated border gradient */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/20 via-primary/15 to-secondary/20 p-[1.5px]">
                                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white via-white to-light-800" />
                                </div>

                                <div className="relative p-5 sm:p-6">
                                    {/* Discount badge */}
                                    <div className="flex items-center justify-between mb-4">
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
                                    <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-4">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>

                                    {/* Product info */}
                                    <p className="text-[10px] font-inter font-semibold uppercase tracking-widest text-slate-400 mb-1">
                                        {product.category}
                                    </p>
                                    <h3 className="font-outfit font-bold text-slate-800 text-lg mb-2 group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs font-inter text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                                        {product.description}
                                    </p>

                                    {/* Price & CTA */}
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <span className="text-xs font-inter text-slate-400 line-through mr-2">
                                                ${product.originalPrice}
                                            </span>
                                            <span className="font-outfit font-black text-2xl text-slate-900">
                                                ${product.price}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="px-4 py-2 rounded-xl text-xs font-inter font-bold uppercase tracking-wider bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-[0_4px_20px_rgba(239,68,68,0.3)] transition-all duration-300"
                                        >
                                            Grab Deal
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View all deals link */}
                <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <a href="/products" className="group flex items-center gap-2 font-outfit font-semibold text-red-500 hover:text-slate-900 transition-colors text-sm uppercase tracking-wider">
                        View All Deals
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
