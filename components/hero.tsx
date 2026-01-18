"use client"

import { useState } from "react"
import { Search, Calendar, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function Hero() {
    const router = useRouter()
    const [location, setLocation] = useState("")
    const [checkIn, setCheckIn] = useState<Date | undefined>(new Date())
    const [checkOut, setCheckOut] = useState<Date | undefined>()
    const [guests, setGuests] = useState(2)

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (location) params.set("location", location)
        if (checkIn) params.set("checkIn", checkIn.toISOString())
        if (checkOut) params.set("checkOut", checkOut.toISOString())
        if (guests) params.set("guests", guests.toString())

        router.push(`/hotels?${params.toString()}`)
    }

    return (
        <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1600')",
                }}
            >
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="container relative z-10 px-4 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                        Discover Your Perfect <br />
                        <span className="text-primary italic">Getaway</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Book luxury hotels, cozy apartments, and exotic resorts at the best prices worldwide.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl mx-auto bg-background/95 backdrop-blur shadow-2xl rounded-2xl p-2 md:p-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 items-center">
                        {/* Destination */}
                        <motion.div
                            className="flex items-center px-3 py-2 border rounded-xl bg-muted/50 hover:border-primary/50 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <MapPin className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                            <div className="text-left w-full">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground">Location</span>
                                <Input
                                    placeholder="Where are you going?"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="h-7 border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-muted-foreground/60"
                                />
                            </div>
                        </motion.div>

                        {/* Check-in */}
                        <motion.div
                            className="flex items-center px-3 py-2 border rounded-xl bg-muted/50 hover:border-primary/50 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Calendar className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                            <div className="text-left w-full">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground">Check-in</span>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className={cn(
                                            "w-full h-7 text-left text-sm font-medium focus:outline-none",
                                            !checkIn && "text-muted-foreground"
                                        )}>
                                            {checkIn ? format(checkIn, "MMM dd") : "Select date"}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarComponent
                                            mode="single"
                                            selected={checkIn}
                                            onSelect={setCheckIn}
                                            initialFocus
                                            disabled={(date) => date < new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </motion.div>

                        {/* Check-out */}
                        <motion.div
                            className="flex items-center px-3 py-2 border rounded-xl bg-muted/50 hover:border-primary/50 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Calendar className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                            <div className="text-left w-full">
                                <span className="text-[10px] uppercase font-bold text-muted-foreground">Check-out</span>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className={cn(
                                            "w-full h-7 text-left text-sm font-medium focus:outline-none",
                                            !checkOut && "text-muted-foreground"
                                        )}>
                                            {checkOut ? format(checkOut, "MMM dd") : "Select date"}
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <CalendarComponent
                                            mode="single"
                                            selected={checkOut}
                                            onSelect={setCheckOut}
                                            initialFocus
                                            disabled={(date) => !checkIn || date <= checkIn}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </motion.div>

                        <div className="flex items-center gap-2">
                            <motion.div
                                className="flex-1 flex items-center px-3 py-2 border rounded-xl bg-muted/50 hover:border-primary/50 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Users className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                                <div className="text-left w-full">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Guests</span>
                                    <Input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={guests}
                                        onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                                        className="h-7 border-0 bg-transparent p-0 focus-visible:ring-0"
                                    />
                                </div>
                            </motion.div>

                            {/* Search Button */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="icon"
                                    className="h-14 w-14 rounded-full shadow-lg"
                                    onClick={handleSearch}
                                >
                                    <Search className="h-6 w-6" />
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
