"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HotelCard } from "@/components/featured-hotels"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, LayoutGrid, List, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { searchHotels } from "@/lib/data"
import type { SearchFilters } from "@/types"

export default function HotelsPage() {
    const searchParams = useSearchParams()

    // Initialize from URL params
    const [search, setSearch] = useState(searchParams.get("location") || "")
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
    const [sortBy, setSortBy] = useState("popularity")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    // Apply URL params on mount
    useEffect(() => {
        const locationParam = searchParams.get("location")
        if (locationParam) {
            setSearch(locationParam)
        }
    }, [searchParams])

    const filteredHotels = useMemo(() => {
        const filters: SearchFilters = {
            location: search || undefined,
            priceRange: priceRange,
            categories: selectedCategories.length > 0 ? selectedCategories : undefined,
            amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
        }

        let results = searchHotels(filters)

        // Apply sorting
        results.sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price
            if (sortBy === "price-high") return b.price - a.price
            if (sortBy === "rating") return b.rating - a.rating
            return 0
        })

        return results
    }, [search, priceRange, selectedCategories, selectedAmenities, sortBy])

    const toggleArrayItem = (array: string[], item: string) => {
        return array.includes(item) ? array.filter(i => i !== item) : [...array, item]
    }

    return (
        <main className="min-h-screen bg-muted/20">
            <Navbar />

            {/* Search Header */}
            <div className="bg-background border-b py-8">
                <div className="container px-4 mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Find your next stay</h1>
                    <div className="relative max-w-2xl">
                        <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search by hotel name or destination..."
                            className="pl-10 h-12 rounded-xl text-lg"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="container px-4 py-8 mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Filters Sidebar (Desktop) */}
                    <aside className="hidden lg:block w-64 shrink-0 space-y-8 sticky top-24 self-start">
                        <div>
                            <h3 className="font-bold mb-4">Price Range</h3>
                            <Slider
                                defaultValue={[0, 1000]}
                                max={1000}
                                step={50}
                                onValueChange={(value) => setPriceRange(value as [number, number])}
                                className="mb-2"
                            />
                            <div className="flex justify-between text-sm text-muted-foreground font-medium">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}+</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold mb-4">Property Type</h3>
                            <div className="space-y-3">
                                {["Hotel", "Resort", "Apartment"].map(category => (
                                    <div key={category} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`cat-${category}`}
                                            checked={selectedCategories.includes(category)}
                                            onCheckedChange={() => setSelectedCategories(toggleArrayItem(selectedCategories, category))}
                                        />
                                        <Label htmlFor={`cat-${category}`} className="text-sm font-medium cursor-pointer">{category}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                            <div className="text-sm text-muted-foreground font-medium">
                                Showing <span className="text-foreground font-bold">{filteredHotels.length}</span> results
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                {/* Mobile Filter Trigger */}
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" size="sm" className="lg:hidden shrink-0">
                                            <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-[300px]">
                                        <SheetHeader>
                                            <SheetTitle>Filters</SheetTitle>
                                            <SheetDescription>Refine your hotel search</SheetDescription>
                                        </SheetHeader>
                                        <div className="py-6 space-y-8 text-left">
                                            <div>
                                                <h3 className="font-bold mb-4">Price Range</h3>
                                                <Slider defaultValue={[0, 1000]} max={1000} step={50} onValueChange={(value) => setPriceRange(value as [number, number])} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold mb-4">Property Type</h3>
                                                <div className="space-y-3">
                                                    {["Hotel", "Resort", "Apartment"].map(c => (
                                                        <div key={c} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`m-cat-${c}`}
                                                                checked={selectedCategories.includes(c)}
                                                                onCheckedChange={() => setSelectedCategories(toggleArrayItem(selectedCategories, c))}
                                                            />
                                                            <Label htmlFor={`m-cat-${c}`}>{c}</Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>

                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="w-[180px] h-9">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="popularity">Popularity</SelectItem>
                                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                                        <SelectItem value="rating">Top Rated</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="hidden md:flex border rounded-lg p-1 bg-background">
                                    <Button
                                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => setViewMode("grid")}
                                    >
                                        <LayoutGrid className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === "list" ? "secondary" : "ghost"}
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => setViewMode("list")}
                                    >
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Grid of Hotels */}
                        {filteredHotels.length > 0 ? (
                            <div className={cn(
                                "grid gap-8",
                                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                            )}>
                                <AnimatePresence mode="popLayout">
                                    {filteredHotels.map((hotel) => (
                                        <motion.div
                                            layout
                                            key={hotel.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <HotelCard hotel={hotel} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-background rounded-3xl border border-dashed">
                                <div className="p-4 bg-muted rounded-full mb-4">
                                    <X className="h-10 w-10 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">No hotels found</h3>
                                <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms.</p>
                                <Button variant="outline" onClick={() => {
                                    setSearch("")
                                    setPriceRange([0, 1000])
                                    setSelectedCategories([])
                                    setSelectedAmenities([])
                                }}>Clear all filters</Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recently Viewed */}
                {filteredHotels.length > 0 && (
                    <div className="mt-24">
                        <h2 className="text-2xl font-bold mb-8">Recently Viewed</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {filteredHotels.slice(0, 4).map(hotel => (
                                <div key={hotel.id} className="group cursor-pointer">
                                    <div className="aspect-square rounded-xl overflow-hidden mb-3">
                                        <img src={hotel.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                                    </div>
                                    <h4 className="font-bold group-hover:text-primary transition-colors">{hotel.name}</h4>
                                    <p className="text-sm text-muted-foreground">{hotel.location}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    )
}
