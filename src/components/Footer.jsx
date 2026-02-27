import { Github, Twitter, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
    'Quick Links': ['Home', 'Products', 'Categories', 'About Us', 'Contact'],
    'Categories': ['Keyboards', 'Mice', 'Headphones', 'Controllers', 'Consoles', 'Mouse Pads'],
    'Support': ['FAQs', 'Shipping Info', 'Returns Policy', 'Track Order', 'Warranty'],
};

const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
];

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <span className="font-outfit font-black text-white text-base">Q</span>
                            </div>
                            <span className="font-outfit font-bold text-2xl text-gradient">QUANTYX</span>
                        </div>
                        <p className="font-inter text-slate-500 text-sm leading-relaxed max-w-sm mb-6">
                            Your ultimate destination for premium gaming gadgets. We equip gamers with
                            the best gear to dominate every match.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/30 hover:shadow-md transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="font-outfit font-semibold text-slate-800 text-sm uppercase tracking-wider mb-4">
                                {title}
                            </h3>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="font-inter text-sm text-slate-400 hover:text-primary transition-colors duration-300"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-inter text-xs text-slate-400">
                        © {new Date().getFullYear()} QUANTYX. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="font-inter text-xs text-slate-400 hover:text-slate-600 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="font-inter text-xs text-slate-400 hover:text-slate-600 transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
