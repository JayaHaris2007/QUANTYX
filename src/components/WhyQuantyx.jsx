import { motion } from 'framer-motion';
import { Truck, Headset, ShieldCheck, RefreshCw } from 'lucide-react';
import { features } from '../data/products';

const iconMap = {
    Truck,
    Headset,
    ShieldCheck,
    RefreshCw,
};

export default function WhyQuantyx() {
    return (
        <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 relative">
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">
                        Why <span className="text-gradient">QUANTYX</span>?
                    </h2>
                    <p className="section-subtitle">
                        We're not just a store — we're your competitive edge.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                    {features.map((feature, index) => {
                        const Icon = iconMap[feature.icon];
                        return (
                            <motion.div
                                key={feature.title}
                                className="group rounded-2xl bg-white border border-slate-200/80 shadow-sm p-6 sm:p-8 text-center transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.12 }}
                            >
                                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-slate-200 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                    <Icon size={24} className="text-primary" />
                                </div>
                                <h3 className="font-outfit font-bold text-slate-800 text-lg mb-2">
                                    {feature.title}
                                </h3>
                                <p className="font-inter text-slate-500 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
