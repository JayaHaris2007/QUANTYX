import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Star, ShoppingCart, ArrowUpDown, Heart, Check } from 'lucide-react';
import { Keyboard, Mouse, Headphones, Gamepad2, Monitor, LayoutGrid } from 'lucide-react';
import { products, categories } from '../data/products';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const iconMap = {
    Keyboard, Mouse, Headphones, Gamepad2, Monitor, LayoutGrid,
};

const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Rating', value: 'rating' },
    { label: 'Newest', value: 'newest' },
];

export default function ProductsPage() {
    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get('category') || 'All';
    const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');
    const [showSort, setShowSort] = useState(false);
    const [addedId, setAddedId] = useState(null);
    const { addToCart, toggleWishlist, isInWishlist, isInCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 1500);
    };

    const filteredProducts = useMemo(() => {
        let filtered = products;

        if (activeCategory !== 'All') {
            filtered = filtered.filter(p => p.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q)
            );
        }

        switch (sortBy) {
            case 'price-asc':
                filtered = [...filtered].sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered = [...filtered].sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered = [...filtered].sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered = [...filtered].sort((a, b) => b.id - a.id);
                break;
            default:
                break;
        }

        return filtered;
    }, [activeCategory, searchQuery, sortBy]);

    const discount = (price, original) =>
        `-${Math.round(((original - price) / original) * 100)}%`;

    return (
        <div className="min-h-screen bg-light-900">
            <Navbar />

            {/* Hero Banner */}
            <section className="pt-28 pb-10 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-outfit font-black text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-4"
                    >
                        All <span className="text-gradient">Products</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-inter text-slate-500 text-base md:text-lg max-w-xl mx-auto"
                    >
                        Explore our complete collection of premium gaming gear.
                    </motion.p>
                </div>
            </section>

            {/* Search & Sort Bar */}
            <section className="px-4 pb-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    <div className="relative flex-1 max-w-md">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 font-inter focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                        />
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowSort(!showSort)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-500 font-inter hover:text-slate-800 hover:border-slate-300 transition-all"
                        >
                            <ArrowUpDown size={14} />
                            <span>{sortOptions.find(o => o.value === sortBy)?.label}</span>
                            <ChevronDown size={14} className={`transition-transform ${showSort ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {showSort && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-20"
                                >
                                    {sortOptions.map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                                            className={`block w-full text-left px-4 py-2.5 text-sm font-inter transition-colors ${sortBy === opt.value
                                                ? 'text-primary bg-primary/5'
                                                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Category Tabs */}
            <section className="px-4 pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {[{ id: 0, name: 'All', icon: 'LayoutGrid', count: products.length }, ...categories].map(cat => {
                            const Icon = iconMap[cat.icon];
                            const isActive = activeCategory === cat.name;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.name)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-inter font-medium whitespace-nowrap border transition-all duration-200 shrink-0
                                        ${isActive
                                            ? 'bg-primary/10 border-primary/25 text-primary shadow-[0_0_12px_rgba(8,145,178,0.1)]'
                                            : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300'
                                        }`}
                                >
                                    {Icon && <Icon size={14} />}
                                    <span>{cat.name}</span>
                                    {cat.name !== 'All' && (
                                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-primary/15 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                                            {cat.count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="px-4 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-sm font-inter text-slate-400">
                            Showing <span className="text-slate-800 font-medium">{filteredProducts.length}</span> products
                            {activeCategory !== 'All' && (
                                <> in <span className="text-primary">{activeCategory}</span></>
                            )}
                        </p>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <p className="text-5xl mb-4">🎮</p>
                            <p className="text-lg font-inter text-slate-500">No products found</p>
                            <p className="text-sm font-inter text-slate-400 mt-1">Try adjusting your filters or search query.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map(product => {
                                    const wishlisted = isInWishlist(product.id);
                                    const inCart = isInCart(product.id);
                                    const justAdded = addedId === product.id;

                                    return (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.25 }}
                                            className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-primary/20 hover:shadow-[0_4px_30px_rgba(8,145,178,0.08)] transition-all duration-300"
                                        >
                                            {/* Image Area */}
                                            <div className="relative h-44 flex items-center justify-center overflow-hidden bg-slate-50">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                                                {product.badge && (
                                                    <span className={`absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-inter font-bold uppercase rounded-full tracking-wider ${product.badge === 'HOT' ? 'bg-red-500/90 text-white' :
                                                        product.badge === 'NEW' ? 'bg-primary/90 text-white' :
                                                            product.badge === 'BEST SELLER' ? 'bg-secondary/90 text-white' :
                                                                'bg-yellow-500/90 text-white'
                                                        }`}>
                                                        {product.badge}
                                                    </span>
                                                )}

                                                {/* Wishlist Heart */}
                                                <button
                                                    onClick={() => toggleWishlist(product.id)}
                                                    className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${wishlisted
                                                        ? 'bg-red-500/15 text-red-500'
                                                        : 'bg-white/80 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-500/10'
                                                        }`}
                                                    aria-label="Toggle wishlist"
                                                >
                                                    <Heart size={16} className={wishlisted ? 'fill-red-500' : ''} />
                                                </button>
                                            </div>

                                            {/* Info */}
                                            <div className="p-4">
                                                <p className="text-[10px] font-inter font-semibold uppercase tracking-widest text-slate-400 mb-1">
                                                    {product.category}
                                                </p>
                                                <h3 className="font-outfit font-bold text-slate-800 text-base mb-1.5 truncate">
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

                                                {/* Price */}
                                                <div className="flex items-baseline gap-2 mb-4">
                                                    <span className="font-outfit font-bold text-slate-900 text-lg">
                                                        ${product.price}
                                                    </span>
                                                    {product.originalPrice && (
                                                        <>
                                                            <span className="text-xs font-inter text-slate-400 line-through">
                                                                ${product.originalPrice}
                                                            </span>
                                                            <span className="text-xs font-inter font-semibold text-green-600">
                                                                {discount(product.price, product.originalPrice)}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Add to Cart Button */}
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-inter font-semibold transition-all duration-300 ${justAdded
                                                        ? 'bg-green-500/10 border border-green-500/20 text-green-600'
                                                        : inCart
                                                            ? 'bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15'
                                                            : 'bg-gradient-to-r from-primary/90 to-cyan-500/90 text-white hover:from-primary hover:to-cyan-500 hover:shadow-[0_4px_16px_rgba(8,145,178,0.25)]'
                                                        }`}
                                                >
                                                    {justAdded ? (
                                                        <>
                                                            <Check size={16} />
                                                            Added!
                                                        </>
                                                    ) : inCart ? (
                                                        <>
                                                            <ShoppingCart size={16} />
                                                            Add More
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShoppingCart size={16} />
                                                            Add to Cart
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
