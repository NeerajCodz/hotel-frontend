"use client"

import { motion } from "framer-motion"
import { Star, MapPin, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { getFeaturedHotels } from "@/lib/data"
import type { Hotel } from "@/types"

export function HotelCard({ hotel }: { hotel: Hotel }) {
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative bg-card rounded-2xl overflow-hidden border transition-all hover:shadow-2xl"
        >
            {/* Favorite Button */}
            <button
                onClick={(e) => {
                    e.preventDefault()
                    setIsFavorite(!isFavorite)
                }}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 backdrop-blur hover:bg-background transition-colors"
            >
                <Heart className={cn("h-5 w-5 transition-colors", isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
            </button>

            {/* Image Section */}
            <Link href={`/hotels/${hotel.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute bottom-4 left-4 z-10">
                        <Badge variant="secondary" className="backdrop-blur-md bg-white/30 text-white border-0">
                            {hotel.category}
                        </Badge>
                    </div>
                </div>
            </Link>

            {/* Content Section */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <Link href={`/hotels/${hotel.id}`}>
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{hotel.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-lg">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-bold text-primary">{hotel.rating}</span>
                    </div>
                </div>

                <div className="flex items-center text-muted-foreground text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hotel.location}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {hotel.amenities.slice(0, 3).map((amenity: string) => (
                        <span key={amenity} className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground border px-2 py-0.5 rounded">
                            {amenity}
                        </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">+ {hotel.amenities.length - 3}</span>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold">${hotel.price}</span>
                        <span className="text-muted-foreground text-sm"> / night</span>
                    </div>
                    <Link href={`/hotels/${hotel.id}`}>
                        <Button size="sm" className="rounded-xl">View Details</Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export function FeaturedHotels() {
    const hotels = getFeaturedHotels(3)

    return (
        <section className="py-20">
            <div className="container px-4 mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Featured Stays</h2>
                        <p className="text-muted-foreground text-lg">Hand-picked luxurious accommodations for your next trip.</p>
                    </div>
                    <Link href="/hotels">
                        <Button variant="outline" className="hidden md:flex">View All Hotels</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                </div>
            </div>
        </section>
    )
}
