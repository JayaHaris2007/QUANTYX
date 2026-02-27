import { motion } from 'framer-motion';
import Ballpit from './Animations/Ballpit/Ballpit';

export default function HeroSection() {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Ballpit Background */}
            <div className="absolute inset-0 z-0">
                <Ballpit
                    count={90}
                    gravity={0.05}
                    friction={0.997}
                    wallBounce={0.9}
                    followCursor={false}
                    colors={[0x0891B2, 0x7C3AED, 0x6366F1, 0x06b6d4, 0x8b5cf6]}
                    ambientColor={0xE8EDF5}
                    ambientIntensity={0.8}
                    lightIntensity={120}
                    minSize={0.25}
                    maxSize={0.8}
                    materialParams={{
                        metalness: 0.4,
                        roughness: 0.3,
                        clearcoat: 1,
                        clearcoatRoughness: 0.1,
                    }}
                />
            </div>

            {/* Light Overlay for readability — keep subtle so ballpit shows through */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-light-900/10 via-transparent to-light-900/30" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-xs font-outfit font-semibold uppercase tracking-widest mb-6">
                        ⚡ Premium Gaming Gear
                    </span>
                </motion.div>

                <motion.h1
                    className="font-outfit font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] mb-6"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <span className="text-slate-900">LEVEL UP</span>
                    <br />
                    <span className="text-gradient">YOUR GAME</span>
                </motion.h1>

                <motion.p
                    className="font-inter text-slate-500 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    Discover the ultimate collection of gaming keyboards, mice, headphones,
                    controllers, consoles & more. Engineered for champions.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <a href="#products" className="btn-primary text-base">
                        Shop Now
                    </a>
                    <a href="#categories" className="btn-secondary text-base">
                        Explore Categories
                    </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 mt-16 pt-8 border-t border-slate-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    {[
                        { value: '50K+', label: 'Gamers Trust Us' },
                        { value: '200+', label: 'Products' },
                        { value: '4.9', label: 'Avg Rating' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="font-outfit font-bold text-2xl sm:text-3xl text-gradient">{stat.value}</div>
                            <div className="font-inter text-xs sm:text-sm text-slate-400 mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-light-900/60 to-transparent z-[2]" />
        </section>
    );
}
