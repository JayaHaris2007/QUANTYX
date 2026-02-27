import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart();
    const [removingId, setRemovingId] = useState(null);

    const handleRemove = (id) => {
        setRemovingId(id);
        setTimeout(() => {
            removeFromCart(id);
            setRemovingId(null);
        }, 300);
    };

    const shipping = cartTotal > 50 ? 0 : 9.99;
    const tax = +(cartTotal * 0.08).toFixed(2);
    const total = +(cartTotal + shipping + tax).toFixed(2);

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
                            Shopping <span className="text-gradient">Cart</span>
                        </h1>
                        <p className="font-inter text-slate-400 text-sm">
                            {cartCount === 0 ? 'Your cart is empty' : `${cartCount} item${cartCount > 1 ? 's' : ''} in your cart`}
                        </p>
                    </motion.div>

                    {cartItems.length === 0 ? (
                        /* Empty State */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-slate-200 flex items-center justify-center mb-6">
                                <ShoppingBag size={40} className="text-primary/40" />
                            </div>
                            <h2 className="font-outfit font-bold text-xl text-slate-800 mb-2">Your cart is empty</h2>
                            <p className="font-inter text-slate-400 text-sm mb-6 max-w-sm mx-auto">
                                Looks like you haven't added any items yet. Browse our products and find something you love!
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
                        /* Cart Content */
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                <AnimatePresence>
                                    {cartItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{
                                                opacity: removingId === item.id ? 0 : 1,
                                                y: 0,
                                                scale: removingId === item.id ? 0.95 : 1,
                                            }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-5 flex items-center gap-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                                        >
                                            {/* Product Image */}
                                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-light-800 border border-slate-100 flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] font-inter font-semibold uppercase tracking-widest text-slate-400 mb-0.5">
                                                    {item.category}
                                                </p>
                                                <h3 className="font-outfit font-bold text-slate-800 text-base truncate mb-1">
                                                    {item.name}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    {item.originalPrice && (
                                                        <span className="text-xs font-inter text-slate-400 line-through">
                                                            ${item.originalPrice}
                                                        </span>
                                                    )}
                                                    <span className="font-outfit font-bold text-slate-900">
                                                        ${item.price}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Quantity controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center font-outfit font-bold text-slate-800">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-all"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            {/* Subtotal */}
                                            <div className="text-right min-w-[80px]">
                                                <p className="font-outfit font-bold text-slate-900">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="p-2 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* Continue Shopping */}
                                <Link
                                    to="/products"
                                    className="group inline-flex items-center gap-2 font-outfit font-semibold text-primary hover:text-slate-900 transition-colors text-sm uppercase tracking-wider mt-4"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    Continue Shopping
                                </Link>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 sticky top-24"
                                >
                                    <h2 className="font-outfit font-bold text-lg text-slate-800 mb-5">Order Summary</h2>

                                    <div className="space-y-3 mb-5">
                                        <div className="flex justify-between font-inter text-sm">
                                            <span className="text-slate-400">Subtotal</span>
                                            <span className="text-slate-800 font-medium">${cartTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between font-inter text-sm">
                                            <span className="text-slate-400">Shipping</span>
                                            <span className={`font-medium ${shipping === 0 ? 'text-green-600' : 'text-slate-800'}`}>
                                                {shipping === 0 ? 'FREE' : `$${shipping}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between font-inter text-sm">
                                            <span className="text-slate-400">Tax (8%)</span>
                                            <span className="text-slate-800 font-medium">${tax.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {shipping === 0 && (
                                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-200/50 mb-5">
                                            <Zap size={14} className="text-green-600" />
                                            <span className="text-xs font-inter font-medium text-green-700">
                                                You qualify for free shipping!
                                            </span>
                                        </div>
                                    )}

                                    <div className="border-t border-slate-200 pt-4 mb-6">
                                        <div className="flex justify-between">
                                            <span className="font-outfit font-bold text-slate-800">Total</span>
                                            <span className="font-outfit font-black text-xl text-gradient">${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-inter font-semibold text-sm bg-gradient-to-r from-primary to-cyan-500 text-white hover:shadow-[0_6px_24px_rgba(8,145,178,0.35)] transition-all duration-300">
                                        <ShoppingBag size={16} />
                                        Proceed to Checkout
                                    </button>

                                    <p className="text-[10px] font-inter text-slate-400 text-center mt-3">
                                        Secure checkout • 256-bit SSL encryption
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
