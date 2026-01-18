"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Camera, MapPin, Star, Umbrella } from "lucide-react"

const items = [
    {
        title: "Luxury Resorts",
        description: "Experience world-class service and amenities.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 to-neutral-100 dark:to-neutral-800" />,
        className: "md:col-span-2",
        icon: <Star className="h-4 w-4 text-primary" />,
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=600",
    },
    {
        title: "Urban Apartments",
        description: "Stay in the heart of the world's most vibrant cities.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 to-neutral-100 dark:to-neutral-800" />,
        className: "md:col-span-1",
        icon: <MapPin className="h-4 w-4 text-primary" />,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600",
    },
    {
        title: "Eco Retreats",
        description: "Reconnect with nature in sustainable stays.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 to-neutral-100 dark:to-neutral-800" />,
        className: "md:col-span-1",
        icon: <Umbrella className="h-4 w-4 text-primary" />,
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=600",
    },
    {
        title: "Boutique Hotels",
        description: "Unique stays with local character and charm.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 to-neutral-100 dark:to-neutral-800" />,
        className: "md:col-span-2",
        icon: <Camera className="h-4 w-4 text-primary" />,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600",
    },
];

export function BentoGridSection() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Categories</h2>
                    <p className="text-muted-foreground text-lg">Explore our diverse range of accommodations tailored for every traveler.</p>
                </div>
                <div className="grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={cn(
                                "group relative overflow-hidden rounded-3xl border bg-card p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300",
                                item.className
                            )}
                        >
                            <div
                                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-30 group-hover:opacity-50"
                                style={{ backgroundImage: `url(${item.image})` }}
                            />
                            <div className="relative z-10">
                                <div className="mb-2 p-2 bg-background/80 backdrop-blur rounded-lg w-fit">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="relative z-10 mt-4">
                                <button className="text-sm font-semibold flex items-center gap-1 group/btn">
                                    Explore <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
