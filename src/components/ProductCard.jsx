import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ product, index = 0 }) {
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <motion.div
            className="group relative rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {/* Badge */}
            {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                    <span className={`
            px-2.5 py-1 rounded-md text-[10px] font-outfit font-bold uppercase tracking-wider
            ${product.badge === 'HOT' ? 'bg-red-500/90 text-white' :
                            product.badge === 'NEW' ? 'bg-primary/90 text-white' :
                                product.badge === 'SALE' ? 'bg-secondary/90 text-white' :
                                    'bg-accent/90 text-white'}
          `}>
                        {product.badge}
                    </span>
                </div>
            )}

            {/* Image Area */}
            <div className="relative h-48 sm:h-56 flex items-center justify-center bg-light-800 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover absolute inset-0 group-hover:scale-110 transition-transform duration-500" />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <button className="btn-primary text-xs !py-2 !px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="p-4 sm:p-5">
                <span className="text-xs font-inter text-slate-400 uppercase tracking-wider">
                    {product.category}
                </span>
                <h3 className="font-outfit font-semibold text-slate-800 text-base sm:text-lg mt-1 mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                <p className="font-inter text-slate-500 text-xs sm:text-sm line-clamp-2 mb-3">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={12}
                                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
                            />
                        ))}
                    </div>
                    <span className="text-xs font-inter text-slate-400">
                        {product.rating} ({product.reviews})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                    <span className="font-outfit font-bold text-xl text-slate-900">
                        ${product.price}
                    </span>
                    {product.originalPrice && (
                        <>
                            <span className="font-inter text-sm text-slate-400 line-through">
                                ${product.originalPrice}
                            </span>
                            <span className="text-xs font-outfit font-semibold text-green-600">
                                -{discount}%
                            </span>
                        </>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button className="w-full mt-4 py-2.5 rounded-xl font-outfit font-semibold text-sm text-white bg-gradient-to-r from-primary to-accent opacity-90 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                    🛒 Add to Cart
                </button>
            </div>
        </motion.div>
    );
}
