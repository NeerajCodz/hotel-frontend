"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { HOTELS } from "@/lib/mock-data"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Users, CreditCard, ShieldCheck, CheckCircle2, ChevronRight, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { useAuth } from "@/context/auth-context"

function BookingContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { user } = useAuth()

    const hotelId = searchParams.get("hotelId")
    const roomName = searchParams.get("room") || "Deluxe King Room"
    const extraIds = searchParams.get("extras")?.split(",") || []

    const hotel = HOTELS.find(h => h.id === hotelId)

    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [bookingId, setBookingId] = useState("")

    if (!hotel) return <div>Hotel not found</div>

    const extraFacilities = [
        { id: "e1", name: "Buffet Breakfast", price: 45 },
        { id: "e2", name: "Spa Access", price: 120 },
        { id: "e3", name: "Private WiFi", price: 15 },
    ]

    const selectedFacilities = extraFacilities.filter(f => extraIds.includes(f.id))
    const extrasTotal = selectedFacilities.reduce((acc, f) => acc + f.price, 0)
    const accommodationTotal = hotel.price * 5
    const finalTotal = accommodationTotal + 170 + extrasTotal

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) {
            alert("Please login to proceed with booking.")
            router.push("/login")
            return
        }

        setIsSubmitting(true)
        // Mock API call
        await new Promise(r => setTimeout(r, 2000))

        const id = "BK-" + Math.random().toString(36).substr(2, 9).toUpperCase()
        setBookingId(id)
        setStep(4)
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        })
        setIsSubmitting(false)
    }

    return (
        <div className="container px-4 py-12 mx-auto">
            {/* Progress Bar */}
            <div className="max-w-4xl mx-auto mb-12">
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10" />
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500",
                            step >= i ? "bg-primary text-white scale-110 shadow-lg" : "bg-muted text-muted-foreground"
                        )}>
                            {step > i ? <CheckCircle2 className="h-6 w-6" /> : i}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                {/* Left Side: Form Steps */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h1 className="text-3xl font-bold">Review your trip</h1>
                                <Card className="overflow-hidden border-2 border-primary/20">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="w-full md:w-48">
                                            <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover" />
                                        </div>
                                        <CardContent className="p-6">
                                            <Badge className="mb-2">{hotel.category}</Badge>
                                            <h3 className="text-xl font-bold mb-1">{hotel.name}</h3>
                                            <p className="text-sm text-muted-foreground mb-4">{hotel.location}</p>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-muted-foreground">Dates</p>
                                                    <p className="font-bold">June 15 - 20, 2024</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground">Guests</p>
                                                    <p className="font-bold">2 Guests</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>

                                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-4">
                                    <ShieldCheck className="h-6 w-6 text-primary shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-bold">Luxe Protection</h4>
                                        <p className="text-sm text-muted-foreground">Your booking is protected by our global safety and support guarantee.</p>
                                    </div>
                                </div>

                                <Button className="w-full h-12 rounded-xl text-lg" onClick={() => setStep(2)}>
                                    Next: Guest Details <ChevronRight className="ml-2 h-5 w-5" />
                                </Button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h1 className="text-3xl font-bold">Guest details</h1>
                                <Card>
                                    <CardContent className="p-6 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>First Name</Label>
                                                <Input placeholder="John" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Last Name</Label>
                                                <Input placeholder="Doe" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Email Address</Label>
                                            <Input placeholder="john@example.com" value={user?.email || ""} readOnly />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Phone Number</Label>
                                            <Input placeholder="+1 (555) 000-0000" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Special Requests (Optional)</Label>
                                            <textarea className="w-full min-h-[100px] rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Late check-in, dietary requirements..." />
                                        </div>
                                    </CardContent>
                                </Card>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                                    <Button className="flex-[2] h-12 rounded-xl" onClick={() => setStep(3)}>Next: Payment</Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h1 className="text-3xl font-bold">Payment details</h1>
                                <Card>
                                    <CardContent className="p-6 space-y-6">
                                        <div className="flex gap-4 p-1 bg-muted rounded-lg">
                                            <Button variant="secondary" className="flex-1 bg-background shadow-sm">Credit Card</Button>
                                            <Button variant="ghost" className="flex-1">PayPal</Button>
                                            <Button variant="ghost" className="flex-1">Apple Pay</Button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Card Number</Label>
                                                <div className="relative">
                                                    <CreditCard className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                                    <Input className="pl-10" placeholder="0000 0000 0000 0000" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Expiry Date</Label>
                                                    <Input placeholder="MM/YY" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>CVV</Label>
                                                    <Input placeholder="123" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                                    <Button
                                        className="flex-[2] h-12 rounded-xl relative overflow-hidden"
                                        disabled={isSubmitting}
                                        onClick={handleSubmit}
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            `Pay $${finalTotal.toLocaleString()}`
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12 space-y-6"
                            >
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="h-12 w-12" />
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight">Booking Confirmed!</h1>
                                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                                    Your stay at <span className="text-foreground font-bold">{hotel.name}</span> has been confirmed. We've sent the confirmation details to your email.
                                </p>
                                <Card className="max-w-md mx-auto bg-muted/50 border-0">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between mb-4">
                                            <span className="text-muted-foreground">Booking ID</span>
                                            <span className="font-mono font-bold">{bookingId}</span>
                                        </div>
                                        <div className="flex justify-between mb-4">
                                            <span className="text-muted-foreground">Room</span>
                                            <span className="font-bold">{roomName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Total Paid</span>
                                            <span className="font-bold text-primary">${finalTotal.toLocaleString()}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                                    <Button className="rounded-xl px-8 h-12" onClick={() => router.push("/dashboard")}>View My Bookings</Button>
                                    <Button variant="outline" className="rounded-xl px-8 h-12" onClick={() => router.push("/")}>Return Home</Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Summary Card */}
                {step < 4 && (
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 overflow-hidden border-0 shadow-2xl rounded-3xl">
                            <CardHeader className="bg-primary text-white pb-8">
                                <CardTitle className="text-lg opacity-90 font-medium">Order Summary</CardTitle>
                                <p className="text-2xl font-bold">{roomName}</p>
                            </CardHeader>
                            <CardContent className="p-6 -mt-6 bg-background rounded-t-3xl relative z-10 space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Accommodation (5 nights)</span>
                                        <span className="text-foreground font-medium">${accommodationTotal}</span>
                                    </div>
                                    {selectedFacilities.map(f => (
                                        <div key={f.id} className="flex justify-between text-muted-foreground">
                                            <span>{f.name}</span>
                                            <span className="text-foreground font-medium">+${f.price}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between text-muted-foreground pt-3 border-t">
                                        <span>Cleaning & Service</span>
                                        <span className="text-foreground font-medium">$170</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-6 border-t">
                                        <div className="text-lg font-bold">Total (USD)</div>
                                        <div className="text-2xl font-bold text-primary">${finalTotal.toLocaleString()}</div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-6 bg-muted/30">
                                <div className="text-xs text-muted-foreground flex gap-2">
                                    <ShieldCheck className="h-4 w-4 shrink-0" />
                                    <span>Prices include all taxes and fees. Secure SSL encrypted payment.</span>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-muted/20">
            <Navbar />
            <Suspense fallback={<div className="flex items-center justify-center p-20"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>}>
                <BookingContent />
            </Suspense>
            <div className="mt-20">
                <Footer />
            </div>
        </main>
    )
}

import { cn } from "@/lib/utils"
