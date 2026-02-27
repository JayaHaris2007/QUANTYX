import { motion } from 'framer-motion';
import { Keyboard, Mouse, Headphones, Gamepad2, Monitor, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

const iconMap = {
    Keyboard,
    Mouse,
    Headphones,
    Gamepad2,
    Monitor,
    LayoutGrid,
};

export default function Categories() {
    return (
        <section id="categories" className="py-20 sm:py-28 px-4 sm:px-6 relative">
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">
                        Browse by <span className="text-gradient">Category</span>
                    </h2>
                    <p className="section-subtitle">
                        Find exactly what you need from our curated gaming collections.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
                    {categories.map((cat, index) => {
                        const Icon = iconMap[cat.icon];
                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                            >
                                <Link
                                    to={cat.name === 'All' ? '/products' : `/products?category=${encodeURIComponent(cat.name)}`}
                                    className="group relative rounded-2xl bg-white border border-slate-200/80 shadow-sm p-5 sm:p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 block"
                                >
                                    <div
                                        className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                                        style={{ backgroundColor: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                                    >
                                        <Icon size={24} style={{ color: cat.color }} />
                                    </div>
                                    <h3 className="font-outfit font-semibold text-slate-800 text-sm sm:text-base mb-1 group-hover:text-primary transition-colors">
                                        {cat.name}
                                    </h3>
                                    <p className="font-inter text-xs text-slate-400">
                                        {cat.count} Products
                                    </p>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
