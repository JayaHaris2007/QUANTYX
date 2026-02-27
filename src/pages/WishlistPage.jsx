import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, Star, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function WishlistPage() {
    const { wishlist, toggleWishlist, addToCart, isInCart } = useCart();
    const [addedId, setAddedId] = useState(null);

    const wishlistProducts = products.filter(p => wishlist.includes(p.id));

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 1500);
    };

    return (
        <div className="min-h-screen bg-light-900">
            <Navbar />

            <section className="pt-28 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="font-outfit font-black text-3xl md:text-4xl text-slate-900 mb-2">
                            My <span className="text-gradient">Wishlist</span>
                        </h1>
                        <p className="font-inter text-slate-400 text-sm">
                            {wishlistProducts.length === 0 ? 'Your wishlist is empty' : `${wishlistProducts.length} item${wishlistProducts.length > 1 ? 's' : ''} saved`}
                        </p>
                    </motion.div>

                    {wishlistProducts.length === 0 ? (
                        /* Empty State */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-slate-200 flex items-center justify-center mb-6">
                                <Heart size={40} className="text-red-400/40" />
                            </div>
                            <h2 className="font-outfit font-bold text-xl text-slate-800 mb-2">No items in your wishlist</h2>
                            <p className="font-inter text-slate-400 text-sm mb-6 max-w-sm mx-auto">
                                Save your favorite items here by clicking the heart icon on any product. They'll be waiting for you!
                            </p>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-inter font-semibold text-sm bg-gradient-to-r from-primary to-cyan-500 text-white hover:shadow-[0_4px_20px_rgba(8,145,178,0.3)] transition-all duration-300"
                            >
                                <ShoppingCart size={16} />
                                Browse Products
                            </Link>
                        </motion.div>
                    ) : (
                        <>
                            {/* Wishlist Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {wishlistProducts.map((product, index) => {
                                    const inCart = isInCart(product.id);
                                    const justAdded = addedId === product.id;
                                    const discountPct = product.originalPrice
                                        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                                        : 0;

                                    return (
                                        <motion.div
                                            key={product.id}
                                            className="group relative bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.06 }}
                                        >
                                            {/* Image Area */}
                                            <div className="relative overflow-hidden bg-light-800 flex items-center justify-center min-h-[160px]">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-500" />

                                                {/* Discount badge */}
                                                {discountPct > 0 && (
                                                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-inter font-black uppercase tracking-wider bg-red-500/10 border border-red-500/20 text-red-500 rounded-full">
                                                        {discountPct}% OFF
                                                    </span>
                                                )}

                                                {/* Remove from wishlist */}
                                                <button
                                                    onClick={() => toggleWishlist(product.id)}
                                                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                                                    aria-label="Remove from wishlist"
                                                >
                                                    <Heart size={14} className="fill-red-500" />
                                                </button>
                                            </div>

                                            {/* Info */}
                                            <div className="p-5">
                                                <p className="text-[10px] font-inter font-semibold uppercase tracking-widest text-slate-400 mb-1">
                                                    {product.category}
                                                </p>
                                                <h3 className="font-outfit font-bold text-slate-800 text-base mb-1 group-hover:text-primary transition-colors">
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
                                                <div className="flex items-center gap-2 mb-4">
                                                    {product.originalPrice && (
                                                        <span className="text-xs font-inter text-slate-400 line-through">
                                                            ${product.originalPrice}
                                                        </span>
                                                    )}
                                                    <span className="font-outfit font-black text-xl text-slate-900">
                                                        ${product.price}
                                                    </span>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleAddToCart(product)}
                                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-inter font-semibold transition-all duration-300 ${justAdded
                                                            ? 'bg-green-500/10 border border-green-500/20 text-green-600'
                                                            : inCart
                                                                ? 'bg-primary/10 border border-primary/20 text-primary hover:bg-primary/15'
                                                                : 'bg-gradient-to-r from-primary to-cyan-500 text-white hover:shadow-[0_4px_20px_rgba(8,145,178,0.3)]'
                                                            }`}
                                                    >
                                                        {justAdded ? (
                                                            <><Check size={14} /> Added!</>
                                                        ) : inCart ? (
                                                            <><ShoppingCart size={14} /> In Cart</>
                                                        ) : (
                                                            <><ShoppingCart size={14} /> Add to Cart</>
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => toggleWishlist(product.id)}
                                                        className="w-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
                                                        aria-label="Remove from wishlist"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Back link */}
                            <motion.div
                                className="flex justify-center mt-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Link
                                    to="/products"
                                    className="group flex items-center gap-2 font-outfit font-semibold text-primary hover:text-slate-900 transition-colors text-sm uppercase tracking-wider"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    Continue Shopping
                                </Link>
                            </motion.div>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
