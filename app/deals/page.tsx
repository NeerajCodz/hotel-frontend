"use client"

import { useState, useMemo, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Tag, Percent, Calendar, CheckCircle2, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { getAllDeals, getDealsByType, getHotelById } from "@/lib/data"
import type { Deal } from "@/types"

export default function DealsPage() {
    const allDeals = getAllDeals()
    const [selectedType, setSelectedType] = useState<"all" | Deal["type"]>("all")

    const filteredDeals = useMemo(() => {
        if (selectedType === "all") return allDeals
        return getDealsByType(selectedType)
    }, [selectedType, allDeals])

    const activDeals = filteredDeals.filter((deal) => {
        const now = new Date()
        const validUntil = new Date(deal.validUntil)
        return validUntil >= now
    })

    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1600')",
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
                        <Badge className="mb-4 text-lg px-4 py-2 bg-primary/90 backdrop-blur">
                            <Percent className="h-4 w-4 mr-2" />
                            Limited Time Offers
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            Exclusive Deals
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                            Save big on your next vacation with our special offers and packages
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <div className="bg-background border-b py-8">
                <div className="container px-4 mx-auto">
                    <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as any)} className="w-full">
                        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 h-12">
                            <TabsTrigger value="all" className="text-sm md:text-base">
                                All Deals
                            </TabsTrigger>
                            <TabsTrigger value="seasonal" className="text-sm md:text-base">
                                Seasonal
                            </TabsTrigger>
                            <TabsTrigger value="last-minute" className="text-sm md:text-base">
                                Last Minute
                            </TabsTrigger>
                            <TabsTrigger value="package" className="text-sm md:text-base">
                                Packages
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Deals Grid */}
            <div className="container px-4 py-12 mx-auto">
                <div className="mb-6">
                    <p className="text-muted-foreground">
                        Showing <span className="font-bold text-foreground">{activDeals.length}</span> active{" "}
                        {activDeals.length === 1 ? "deal" : "deals"}
                    </p>
                </div>

                <AnimatePresence mode="popLayout">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activDeals.map((deal, index) => (
                            <motion.div
                                key={deal.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <DealCard deal={deal} />
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            </div>

            <Footer />
        </main>
    )
}

function DealCard({ deal }: { deal: Deal }) {
    const [timeLeft, setTimeLeft] = useState("")

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date()
            const validUntil = new Date(deal.validUntil)
            const diff = validUntil.getTime() - now.getTime()

            if (diff <= 0) {
                setTimeLeft("Expired")
                return
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

            if (days > 0) {
                setTimeLeft(`${days} day${days !== 1 ? "s" : ""} left`)
            } else {
                setTimeLeft(`${hours} hour${hours !== 1 ? "s" : ""} left`)
            }
        }

        calculateTimeLeft()
        const interval = setInterval(calculateTimeLeft, 60000) // Update every minute

        return () => clearInterval(interval)
    }, [deal.validUntil])

    const firstHotel = getHotelById(deal.hotelIds[0])

    return (
        <Card className="group overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 h-full flex flex-col">
            <div className="relative h-48 overflow-hidden">
                <motion.img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Discount Badge */}
                <motion.div
                    className="absolute top-4 right-4"
                    initial={{ rotate: -12 }}
                    whileHover={{ rotate: 0, scale: 1.1 }}
                >
                    <div className="bg-red-500 text-white rounded-full w-16 h-16 flex flex-col items-center justify-center font-bold shadow-lg">
                        <span className="text-2xl">{deal.discountPercent}%</span>
                        <span className="text-xs">OFF</span>
                    </div>
                </motion.div>

                {/* Featured Badge */}
                {deal.featured && (
                    <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur">
                        <Tag className="h-3 w-3 mr-1" />
                        Featured
                    </Badge>
                )}

                {/* Type Badge */}
                <Badge
                    variant="secondary"
                    className="absolute bottom-4 left-4 capitalize bg-background/90 backdrop-blur"
                >
                    {deal.type.replace("-", " ")}
                </Badge>
            </div>

            <CardContent className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {deal.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{deal.description}</p>

                {/* Savings */}
                <div className="bg-primary/10 rounded-lg p-3 mb-4">
                    <p className="text-primary font-bold text-lg">{deal.savings}</p>
                </div>

                {/* Time Left */}
                <div className="flex items-center gap-2 mb-4 text-sm">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="font-medium text-orange-500">{timeLeft}</span>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div>
                            <p className="text-muted-foreground">Travel: {deal.travelPeriod}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div>
                            <p className="text-muted-foreground">
                                Valid for {deal.hotelIds.length} {deal.hotelIds.length === 1 ? "hotel" : "hotels"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Includes (if package) */}
                {deal.includes && deal.includes.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm font-semibold mb-2">Package Includes:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            {deal.includes.slice(0, 3).map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                                    {item}
                                </li>
                            ))}
                            {deal.includes.length > 3 && (
                                <li className="text-xs text-primary">+{deal.includes.length - 3} more...</li>
                            )}
                        </ul>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-auto">
                    <Link href={firstHotel ? `/hotels/${firstHotel.id}` : "/hotels"}>
                        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            Claim This Deal
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
