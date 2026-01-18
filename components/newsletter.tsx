"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"

export function Newsletter() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background with Gradient */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#ffffff1a,transparent)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            {/* Decorative Blurs */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]" />

            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Exclusive Offers
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Extraordinary</span>
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        Join our elite travel community. Get access to secret deals, member-only rates, and curated experiences delivered straight to your inbox.
                    </p>

                    <div className="relative max-w-lg mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-3xl blur opacity-20 transform scale-105" />
                        <form className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-2xl" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative flex-1">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <Input
                                    placeholder="Enter your email address"
                                    className="h-14 pl-12 bg-transparent border-0 text-white placeholder:text-slate-500 focus-visible:ring-0 rounded-xl"
                                />
                            </div>
                            <Button size="lg" className="h-14 px-8 rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
                                Subscribe
                            </Button>
                        </form>
                    </div>

                    <p className="text-slate-500 text-sm mt-8">
                        Join 10,000+ travelers. No spam, ever.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
