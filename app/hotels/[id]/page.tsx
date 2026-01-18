"use client"

import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
    Star, MapPin, Share2, Heart, Check, Wifi,
    Car, Wind, Waves, Coffee, Utensils, Shield,
    CheckCircle2, ChevronRight
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getHotelById, getRoomsByHotelId, getReviewsByHotelId, getReviewStats } from "@/lib/data"

export default function HotelDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const hotel = getHotelById(params.id as string)
    const rooms = getRoomsByHotelId(params.id as string)
    const reviews = getReviewsByHotelId(params.id as string)
    const reviewStats = getReviewStats(params.id as string)

    const [selectedRoom, setSelectedRoom] = useState(rooms[0]?.id || "")
    const [isFavorite, setIsFavorite] = useState(false)
    const [selectedExtras, setSelectedExtras] = useState<string[]>([])

    if (!hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Hotel not found</h1>
                    <Button onClick={() => router.push("/hotels")}>Back to Listings</Button>
                </div>
            </div>
        )
    }

    const extraFacilities = [
        { id: "e1", name: "Buffet Breakfast", price: 45 },
        { id: "e2", name: "Spa Access", price: 120 },
        { id: "e3", name: "Private WiFi", price: 15 },
    ]

    const toggleExtra = (id: string) => {
        setSelectedExtras(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        )
    }

    const handleReserve = () => {
        const extraIds = selectedExtras.join(",")
        router.push(`/booking?hotelId=${hotel.id}&extras=${extraIds}&room=${selectedRoom}`)
    }

    const extrasTotal = extraFacilities
        .filter(f => selectedExtras.includes(f.id))
        .reduce((acc, f) => acc + f.price, 0)

    const totalPrice = (hotel.price * 5) + 170 + extrasTotal

    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="container px-4 py-8 mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{hotel.category}</Badge>
                            <div className="flex items-center gap-1 text-sm font-bold">
                                <Star className="h-4 w-4 fill-primary text-primary" />
                                {hotel.rating} ({hotel.reviewsCount} reviews)
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-2">{hotel.name}</h1>
                        <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            {hotel.location}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
                            <Heart className={isFavorite ? "fill-red-500 text-red-500" : ""} />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Share2 />
                        </Button>
                        <Button className="rounded-xl px-8" onClick={handleReserve}>
                            Book Now
                        </Button>
                    </div>
                </div>

                {/* Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[400px] md:h-[600px] mb-12 rounded-3xl overflow-hidden">
                    <div className="md:col-span-2 md:row-span-2 relative">
                        <img
                            src={hotel.images[0] || hotel.image}
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {hotel.images.slice(1, 5).map((img, i) => (
                        <div key={i} className="relative hidden md:block">
                            <img src={img} alt={hotel.name} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">About the Property</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {hotel.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6">Popular Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {hotel.amenities.map((amenity) => (
                                    <div key={amenity} className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            {getAmenityIcon(amenity)}
                                        </div>
                                        <span className="font-medium">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <Tabs defaultValue="details">
                                <TabsList className="w-full justify-start border-b rounded-none py-6 bg-transparent h-auto p-0">
                                    <TabsTrigger value="details" className="data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-8 py-4 transition-all">Details</TabsTrigger>
                                    <TabsTrigger value="rooms" className="data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-8 py-4 transition-all">Rooms</TabsTrigger>
                                    <TabsTrigger value="reviews" className="data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-8 py-4 transition-all">Reviews</TabsTrigger>
                                </TabsList>
                                <TabsContent value="details" className="py-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                                        <div>
                                            <h4 className="font-bold mb-4">Check-in / Check-out</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Check-in</span>
                                                    <span className="font-medium">After 3:00 PM</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Check-out</span>
                                                    <span className="font-medium">Before 11:00 AM</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-4">House Rules</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-center gap-2 text-muted-foreground"><Check className="h-4 w-4 text-primary" /> No smoking</li>
                                                <li className="flex items-center gap-2 text-muted-foreground"><Check className="h-4 w-4 text-primary" /> Pets allowed ($50 fee)</li>
                                                <li className="flex items-center gap-2 text-muted-foreground"><Check className="h-4 w-4 text-primary" /> No parties or events</li>
                                            </ul>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="rooms" className="py-8">
                                    <div className="space-y-4">
                                        {[
                                            { name: "Deluxe King Room", price: hotel.price, size: "45 sqm" },
                                            { name: "Executive Suite", price: hotel.price + 150, size: "75 sqm" },
                                            { name: "Presidential Villa", price: hotel.price * 2, size: "120 sqm" },
                                        ].map((room) => (
                                            <Card key={room.name} className={cn("overflow-hidden border-2 transition-all", selectedRoom === room.name ? "border-primary" : "border-transparent")}>
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="w-full md:w-48 bg-muted">
                                                        <img src={hotel.image} alt={room.name} className="h-full w-full object-cover" />
                                                    </div>
                                                    <CardContent className="flex-1 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                                                        <div>
                                                            <h4 className="font-bold text-lg">{room.name}</h4>
                                                            <p className="text-sm text-muted-foreground">{room.size} • 1 King Bed • Max 2 Guests</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold">${room.price}<span className="text-sm text-muted-foreground font-normal">/night</span></div>
                                                            <Button
                                                                size="sm"
                                                                variant={selectedRoom === room.name ? "default" : "outline"}
                                                                className="mt-2"
                                                                onClick={() => setSelectedRoom(room.name)}
                                                            >
                                                                {selectedRoom === room.name ? "Selected" : "Select Room"}
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="reviews" className="py-8">
                                    <div className="space-y-8">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="border-b pb-8 last:border-0">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">JD</div>
                                                    <div>
                                                        <h4 className="font-bold">John Doe</h4>
                                                        <p className="text-xs text-muted-foreground">June 2024</p>
                                                    </div>
                                                    <div className="ml-auto flex items-center gap-1">
                                                        <Star className="h-3 w-3 fill-primary text-primary" />
                                                        <span className="text-sm font-bold">5.0</span>
                                                    </div>
                                                </div>
                                                <p className="text-muted-foreground">
                                                    Amazing stay! The staff was incredibly helpful and the views were breathtaking. Will definitely come back again.
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </section>
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 shadow-xl border-t-4 border-t-primary rounded-2xl">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <span className="text-3xl font-bold">${hotel.price}</span>
                                        <span className="text-muted-foreground"> / night</span>
                                    </div>
                                    <div className="flex items-center gap-1 font-bold">
                                        <Star className="h-4 w-4 fill-primary text-primary" />
                                        {hotel.rating}
                                    </div>
                                </div>

                                {/* Extra Facilities */}
                                <div className="mb-6 space-y-4">
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Add Extras</h4>
                                    <div className="space-y-3">
                                        {extraFacilities.map((facility) => (
                                            <div key={facility.id} className="flex items-center justify-between group">
                                                <div className="flex items-center gap-3">
                                                    <Checkbox
                                                        id={`extra-${facility.id}`}
                                                        checked={selectedExtras.includes(facility.id)}
                                                        onCheckedChange={() => toggleExtra(facility.id)}
                                                    />
                                                    <Label htmlFor={`extra-${facility.id}`} className="text-sm font-medium cursor-pointer">
                                                        {facility.name}
                                                    </Label>
                                                </div>
                                                <span className="text-sm font-bold text-primary group-hover:scale-110 transition-transform">
                                                    +${facility.price}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button className="w-full h-12 rounded-xl text-lg font-bold mb-4" onClick={handleReserve}>
                                    Reserve
                                </Button>

                                <p className="text-center text-sm text-muted-foreground mb-6">You won't be charged yet</p>

                                <div className="space-y-3 pt-4 border-t">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>${hotel.price} x 5 nights</span>
                                        <span>${hotel.price * 5}</span>
                                    </div>
                                    {extraFacilities.filter(f => selectedExtras.includes(f.id)).map(extra => (
                                        <div key={extra.id} className="flex justify-between text-muted-foreground">
                                            <span>{extra.name}</span>
                                            <span>+${extra.price}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Cleaning & Service</span>
                                        <span>$170</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                        <span>Total</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    )
}

function getAmenityIcon(amenity: string) {
    switch (amenity) {
        case "WiFi": return <Wifi className="h-4 w-4 text-primary" />
        case "Pool": return <Waves className="h-4 w-4 text-primary" />
        case "Parking": return <Car className="h-4 w-4 text-primary" />
        case "AC": return <Wind className="h-4 w-4 text-primary" />
        case "Gym": return <Coffee className="h-4 w-4 text-primary" />
        case "Spa": return <Waves className="h-4 w-4 text-primary" />
        case "Restaurant": return <Utensils className="h-4 w-4 text-primary" />
        case "Bar": return <Coffee className="h-4 w-4 text-primary" />
        default: return <Shield className="h-4 w-4 text-primary" />
    }
}

import { cn } from "@/lib/utils"
// trigger rebuild
