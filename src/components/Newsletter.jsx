import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function Newsletter() {
    return (
        <section className="py-20 sm:py-28 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-3xl" />

                    {/* Glow orbs */}
                    <div className="absolute top-0 left-1/4 w-40 h-40 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="font-outfit font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 mb-4">
                            Stay in the <span className="text-gradient">Game</span>
                        </h2>
                        <p className="font-inter text-slate-500 text-base sm:text-lg max-w-lg mx-auto mb-8">
                            Get exclusive deals, early access to new drops, and pro gaming tips delivered to your inbox.
                        </p>

                        <form className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-5 py-3.5 rounded-xl bg-white/80 border border-slate-200 text-slate-800 font-inter text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary/50 transition-colors"
                            />
                            <button className="btn-primary whitespace-nowrap flex items-center gap-2 !py-3.5">
                                <Send size={16} />
                                <span>Subscribe</span>
                            </button>
                        </form>

                        <p className="font-inter text-xs text-slate-400 mt-4">
                            No spam, unsubscribe anytime. Join 10,000+ gamers.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
