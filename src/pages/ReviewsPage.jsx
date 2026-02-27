import { motion } from 'framer-motion';
import { Star, Quote, ThumbsUp, MessageCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const allReviews = [
    {
        id: 1,
        name: 'Alex Rivera',
        role: 'Pro Esports Player',
        avatar: '🧑‍💻',
        rating: 5,
        text: "The Phantom Strike keyboard changed my game completely. The response time is insane and the build quality is leagues above anything I've used before.",
        product: 'Phantom Strike MK-X',
        helpful: 48,
        date: 'Feb 20, 2026',
    },
    {
        id: 2,
        name: 'Sarah Chen',
        role: 'Content Creator',
        avatar: '👩‍🎨',
        rating: 5,
        text: "I stream 8 hours a day and the Cloud Nine Pro headset is the most comfortable headset I've ever worn. Crystal clear audio and my viewers love the mic quality.",
        product: 'Cloud Nine Pro',
        helpful: 73,
        date: 'Feb 18, 2026',
    },
    {
        id: 3,
        name: 'Marcus Johnson',
        role: 'Competitive FPS Gamer',
        avatar: '🎮',
        rating: 5,
        text: "Switched to the Vortex Pro mouse and instantly climbed two ranks. The sensor is flawless and at 49g, it feels like nothing is in my hand. Absolute beast.",
        product: 'Vortex Pro Wireless',
        helpful: 91,
        date: 'Feb 15, 2026',
    },
    {
        id: 4,
        name: 'Yuki Tanaka',
        role: 'Game Developer',
        avatar: '👨‍💻',
        rating: 4,
        text: "QUANTYX's gear is what I recommend to everyone on my team. Premium quality, fast shipping, and their support team actually knows what they're talking about.",
        product: 'Apex Pro 65%',
        helpful: 35,
        date: 'Feb 12, 2026',
    },
    {
        id: 5,
        name: 'Elena Vasquez',
        role: 'Twitch Streamer',
        avatar: '🎙️',
        rating: 5,
        text: "The Echo Realm 7.1 headset is a game-changer for streaming. Noise cancellation is top-notch, and the surround sound makes every game feel immersive.",
        product: 'Echo Realm 7.1',
        helpful: 62,
        date: 'Feb 10, 2026',
    },
    {
        id: 6,
        name: 'David Park',
        role: 'Console Gamer',
        avatar: '🕹️',
        rating: 5,
        text: "Quantum Console X is the real deal. 8K gaming looks incredible, load times are non-existent with the SSD. Best console I've ever owned, hands down.",
        product: 'Quantum Console X',
        helpful: 124,
        date: 'Feb 8, 2026',
    },
    {
        id: 7,
        name: 'Aisha Mohammed',
        role: 'Casual Gamer',
        avatar: '👩‍🦱',
        rating: 4,
        text: "Got the Nexus Controller Elite for my PS5 and wow, the hall effect triggers feel amazing. Back paddles took some getting used to but now I can't go back.",
        product: 'Nexus Controller Elite',
        helpful: 44,
        date: 'Feb 5, 2026',
    },
    {
        id: 8,
        name: 'Jake Wilson',
        role: 'Tech Reviewer',
        avatar: '📱',
        rating: 5,
        text: "I've reviewed hundreds of gaming peripherals. QUANTYX consistently delivers premium quality at competitive prices. The Shadow Keys TKL is my daily driver now.",
        product: 'Shadow Keys TKL',
        helpful: 87,
        date: 'Feb 3, 2026',
    },
    {
        id: 9,
        name: 'Priya Sharma',
        role: 'Esports Team Manager',
        avatar: '👩‍💼',
        rating: 5,
        text: "We outfitted our entire team with QUANTYX gear. The Scuf Rival Pro controllers and Apex keyboards give us a genuine competitive edge in tournaments.",
        product: 'Scuf Rival Pro',
        helpful: 56,
        date: 'Jan 28, 2026',
    },
    {
        id: 10,
        name: 'Chris Anderson',
        role: 'Desktop Setup Enthusiast',
        avatar: '🖥️',
        rating: 5,
        text: "The Flux Desk Mat Pro ties my entire setup together. The wireless charging zone is genius — no more cable clutter. Looks amazing under my monitors.",
        product: 'Flux Desk Mat Pro',
        helpful: 38,
        date: 'Jan 25, 2026',
    },
    {
        id: 11,
        name: 'Lily Zhang',
        role: 'Graphic Designer & Gamer',
        avatar: '🎨',
        rating: 4,
        text: "Using the Nano Deck Portable for both gaming and light design work on the go. The OLED screen is gorgeous, and battery life easily lasts my daily commute.",
        product: 'Nano Deck Portable',
        helpful: 29,
        date: 'Jan 22, 2026',
    },
    {
        id: 12,
        name: 'Tom Reeves',
        role: 'MMO Veteran',
        avatar: '⚔️',
        rating: 5,
        text: "The Titan Grip MMO mouse is perfect for my WoW raids. 12 side buttons all within thumb reach, and the adjustable weight lets me dial in the exact feel I want.",
        product: 'Titan Grip MMO',
        helpful: 41,
        date: 'Jan 18, 2026',
    },
];

const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);
const fiveStarCount = allReviews.filter(r => r.rating === 5).length;

export default function ReviewsPage() {
    return (
        <div className="min-h-screen bg-light-900">
            <Navbar />

            {/* Hero */}
            <section className="pt-28 pb-10 px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto text-center relative">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-outfit font-black text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-4"
                    >
                        Customer <span className="text-gradient">Reviews</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-inter text-slate-500 text-base md:text-lg max-w-xl mx-auto mb-8"
                    >
                        Real feedback from real gamers who trust QUANTYX for their competitive edge.
                    </motion.p>

                    {/* Stats Row */}
                    <motion.div
                        className="flex flex-wrap items-center justify-center gap-8 sm:gap-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {[
                            { value: avgRating, label: 'Avg Rating', icon: '⭐' },
                            { value: `${allReviews.length}`, label: 'Total Reviews' },
                            { value: `${fiveStarCount}`, label: '5-Star Reviews' },
                            { value: '97%', label: 'Recommend' },
                        ].map(stat => (
                            <div key={stat.label} className="text-center">
                                <div className="font-outfit font-bold text-2xl sm:text-3xl text-gradient">
                                    {stat.icon || ''}{stat.value}
                                </div>
                                <div className="font-inter text-xs text-slate-400 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Rating Distribution */}
            <section className="px-4 pb-8">
                <div className="max-w-xl mx-auto">
                    <motion.div
                        className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="font-outfit font-bold text-slate-800 mb-4 text-center">Rating Distribution</h3>
                        {[5, 4, 3, 2, 1].map(stars => {
                            const count = allReviews.filter(r => r.rating === stars).length;
                            const pct = Math.round((count / allReviews.length) * 100);
                            return (
                                <div key={stars} className="flex items-center gap-3 mb-2">
                                    <span className="text-sm font-inter text-slate-600 w-8">{stars}★</span>
                                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-700"
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-inter text-slate-400 w-10 text-right">{count}</span>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Reviews Grid */}
            <section className="px-4 pb-20">
                <div className="max-w-7xl mx-auto">
                    <p className="text-sm font-inter text-slate-400 mb-6">
                        Showing <span className="text-slate-800 font-medium">{allReviews.length}</span> reviews
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {allReviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                className="group rounded-2xl bg-white border border-slate-200/80 shadow-sm p-6 transition-all duration-500 hover:shadow-xl hover:shadow-secondary/10 hover:-translate-y-1 hover:border-secondary/30 flex flex-col"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                {/* Header: Avatar + Info */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-slate-200 flex items-center justify-center text-xl">
                                        {review.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-outfit font-semibold text-slate-800 text-sm">{review.name}</p>
                                        <p className="font-inter text-xs text-slate-400">{review.role}</p>
                                    </div>
                                    <span className="text-[10px] font-inter text-slate-400">{review.date}</span>
                                </div>

                                {/* Rating stars */}
                                <div className="flex gap-0.5 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}
                                        />
                                    ))}
                                </div>

                                {/* Quote icon + Review text */}
                                <div className="mb-4 flex-1">
                                    <Quote size={18} className="text-primary/20 mb-2" />
                                    <p className="font-inter text-sm text-slate-600 leading-relaxed">
                                        "{review.text}"
                                    </p>
                                </div>

                                {/* Product badge */}
                                <div className="mb-4">
                                    <span className="text-[10px] font-inter font-semibold uppercase tracking-widest text-primary/70 bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                                        {review.product}
                                    </span>
                                </div>

                                {/* Footer: Helpful + Reply */}
                                <div className="flex items-center gap-4 pt-3 border-t border-slate-100">
                                    <button className="flex items-center gap-1.5 text-xs font-inter text-slate-400 hover:text-primary transition-colors">
                                        <ThumbsUp size={13} />
                                        <span>Helpful ({review.helpful})</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 text-xs font-inter text-slate-400 hover:text-primary transition-colors">
                                        <MessageCircle size={13} />
                                        <span>Reply</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
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
