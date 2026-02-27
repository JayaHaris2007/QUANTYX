import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Alex Rivera',
        role: 'Pro Esports Player',
        avatar: '🧑‍💻',
        rating: 5,
        text: "The Phantom Strike keyboard changed my game completely. The response time is insane and the build quality is leagues above anything I've used before.",
        product: 'Phantom Strike MK-X',
    },
    {
        id: 2,
        name: 'Sarah Chen',
        role: 'Content Creator',
        avatar: '👩‍🎨',
        rating: 5,
        text: "I stream 8 hours a day and the Cloud Nine Pro headset is the most comfortable headset I've ever worn. Crystal clear audio and my viewers love the mic quality.",
        product: 'Cloud Nine Pro',
    },
    {
        id: 3,
        name: 'Marcus Johnson',
        role: 'Competitive FPS Gamer',
        avatar: '🎮',
        rating: 5,
        text: "Switched to the Vortex Pro mouse and instantly climbed two ranks. The sensor is flawless and at 49g, it feels like nothing is in my hand. Absolute beast.",
        product: 'Vortex Pro Wireless',
    },
    {
        id: 4,
        name: 'Yuki Tanaka',
        role: 'Game Developer',
        avatar: '👨‍💻',
        rating: 4,
        text: "QUANTYX's gear is what I recommend to everyone on my team. Premium quality, fast shipping, and their support team actually knows what they're talking about.",
        product: 'Apex Pro 65%',
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">
                        Loved by <span className="text-gradient">Gamers</span>
                    </h2>
                    <p className="section-subtitle">
                        Don't just take our word for it — hear from the pros and everyday gamers who trust QUANTYX.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.id}
                            className="group rounded-2xl bg-white border border-slate-200/80 shadow-sm p-6 transition-all duration-500 hover:shadow-xl hover:shadow-secondary/10 hover:-translate-y-2 hover:border-secondary/30 flex flex-col"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Quote icon */}
                            <div className="mb-4">
                                <Quote size={24} className="text-primary/30" />
                            </div>

                            {/* Review text */}
                            <p className="font-inter text-sm text-slate-600 leading-relaxed mb-5 flex-1">
                                "{t.text}"
                            </p>

                            {/* Rating stars */}
                            <div className="flex gap-0.5 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={
                                            i < t.rating
                                                ? 'text-yellow-400 fill-yellow-400'
                                                : 'text-slate-300'
                                        }
                                    />
                                ))}
                            </div>

                            {/* Product badge */}
                            <div className="mb-4">
                                <span className="text-[10px] font-inter font-semibold uppercase tracking-widest text-primary/70 bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                                    {t.product}
                                </span>
                            </div>

                            {/* Author info */}
                            <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-slate-200 flex items-center justify-center text-lg">
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="font-outfit font-semibold text-slate-800 text-sm">
                                        {t.name}
                                    </p>
                                    <p className="font-inter text-xs text-slate-400">
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
