"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Calendar, Users, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { getAllDestinations, getDestinationsByRegion } from "@/lib/data"
import type { Destination } from "@/types"

const regions = ["All", "Europe", "Asia", "North America", "Africa", "Oceania", "Middle East", "Central America"]

export default function DestinationsPage() {
    const allDestinations = getAllDestinations()
    const [search, setSearch] = useState("")
    const [selectedRegion, setSelectedRegion] = useState("All")

    const filteredDestinations = useMemo(() => {
        let filtered = allDestinations

        if (selectedRegion !== "All") {
            filtered = getDestinationsByRegion(selectedRegion)
        }

        if (search) {
            const searchTerm = search.toLowerCase()
            filtered = filtered.filter(
                (dest) =>
                    dest.name.toLowerCase().includes(searchTerm) ||
                    dest.country.toLowerCase().includes(searchTerm) ||
                    dest.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
            )
        }

        return filtered
    }, [search, selectedRegion, allDestinations])

    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1600')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="container relative z-10 px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            Explore Destinations
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                            Discover amazing places around the world and plan your next adventure
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filters */}
            <div className="bg-background border-b py-8">
                <div className="container px-4 mx-auto">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search destinations..."
                                className="pl-10 h-12 rounded-xl text-lg"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {/* Region Filter */}
                        <div className="flex flex-wrap gap-2">
                            {regions.map((region) => (
                                <Button
                                    key={region}
                                    variant={selectedRegion === region ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedRegion(region)}
                                    className="rounded-full"
                                >
                                    {region}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Destinations Grid */}
            <div className="container px-4 py-12 mx-auto">
                <div className="mb-6">
                    <p className="text-muted-foreground">
                        Showing <span className="font-bold text-foreground">{filteredDestinations.length}</span>{" "}
                        {filteredDestinations.length === 1 ? "destination" : "destinations"}
                    </p>
                </div>

                <AnimatePresence mode="popLayout">
                    {filteredDestinations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredDestinations.map((destination, index) => (
                                <motion.div
                                    key={destination.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <DestinationCard destination={destination} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20"
                        >
                            <div className="p-4 bg-muted rounded-full mb-4">
                                <MapPin className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No destinations found</h3>
                            <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearch("")
                                    setSelectedRegion("All")
                                }}
                            >
                                Clear filters
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Footer />
        </main>
    )
}

function DestinationCard({ destination }: { destination: Destination }) {
    return (
        <Link href={`/destinations/${destination.slug}`}>
            <Card className="group overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 h-full">
                <div className="relative h-64 overflow-hidden">
                    <motion.img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
                        <p className="text-white/90 text-sm">{destination.country}</p>
                    </div>
                    <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur">
                        {destination.hotelIds.length} {destination.hotelIds.length === 1 ? "Hotel" : "Hotels"}
                    </Badge>
                </div>

                <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-2">{destination.description}</p>

                    <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">Best time:</span>
                            <span className="font-medium">{destination.bestTimeToVisit}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">Top attractions:</span>
                            <span className="font-medium">{destination.attractions.length}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {destination.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <Button className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Explore Destination
                    </Button>
                </CardContent>
            </Card>
        </Link>
    )
}
