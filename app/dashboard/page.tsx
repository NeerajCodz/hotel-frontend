"use client"

import { useAuth } from "@/context/auth-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MOCK_BOOKINGS } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Calendar, MapPin, CreditCard, ChevronRight,
    Settings, LogOut, Package, User as UserIcon,
    Clock, CheckCircle2, XCircle
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

export default function DashboardPage() {
    const { user, logout } = useAuth()

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Please login to view dashboard</p>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-muted/20">
            <Navbar />

            <div className="container px-4 py-8 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-6">
                        <Card className="overflow-hidden border-0 shadow-xl">
                            <CardHeader className="bg-primary text-white pb-10">
                                <div className="flex flex-col items-center">
                                    <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold mb-4">
                                        {user.avatar}
                                    </div>
                                    <CardTitle>{user.name}</CardTitle>
                                    <p className="text-white/70 text-sm">{user.email}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 -mt-6 bg-background rounded-t-3xl relative z-10">
                                <nav className="space-y-1">
                                    <Button variant="ghost" className="w-full justify-start text-primary bg-primary/5">
                                        <Package className="mr-2 h-4 w-4" /> My Bookings
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        <UserIcon className="mr-2 h-4 w-4" /> Profile Details
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        <Settings className="mr-2 h-4 w-4" /> Account Settings
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={logout}>
                                        <LogOut className="mr-2 h-4 w-4" /> Logout
                                    </Button>
                                </nav>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
                                <p className="text-muted-foreground">Manage your upcoming and past stays.</p>
                            </div>
                        </div>

                        <Tabs defaultValue="upcoming" className="w-full">
                            <TabsList className="bg-transparent border-b rounded-none w-full justify-start h-auto p-0 mb-8">
                                <TabsTrigger value="upcoming" className="data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-8 py-4 transition-all">
                                    Upcoming <Badge variant="secondary" className="ml-2">1</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="past" className="data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-8 py-4 transition-all">
                                    Past Stays
                                </TabsTrigger>
                                <TabsTrigger value="cancelled" className="data-[state=active]:border-primary border-b-2 border-transparent rounded-none px-8 py-4 transition-all">
                                    Cancelled
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="upcoming">
                                <div className="space-y-6">
                                    {MOCK_BOOKINGS.filter(b => b.status === "upcoming").map((booking) => (
                                        <BookingCard key={booking.id} booking={booking} />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="past">
                                <div className="space-y-6">
                                    {MOCK_BOOKINGS.filter(b => b.status === "past").map((booking) => (
                                        <BookingCard key={booking.id} booking={booking} />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="cancelled">
                                <div className="flex flex-col items-center justify-center py-20 bg-background rounded-3xl border border-dashed text-center">
                                    <p className="text-muted-foreground">No cancelled bookings.</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}

function BookingCard({ booking }: { booking: any }) {
    const isUpcoming = booking.status === "upcoming"

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-64 h-48 relative">
                        <img src={booking.hotelImage} alt={booking.hotelName} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4">
                            <Badge className={isUpcoming ? "bg-green-500" : "bg-muted text-muted-foreground"}>
                                {isUpcoming ? "Confirmed" : "Completed"}
                            </Badge>
                        </div>
                    </div>
                    <CardContent className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold mb-1 hover:text-primary transition-colors cursor-pointer">{booking.hotelName}</h3>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <MapPin className="h-3 w-3 mr-1" /> Paris, France
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-muted-foreground">Booking ID</p>
                                <p className="font-mono text-sm font-bold uppercase">{booking.id}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4 border-y text-sm">
                            <div className="space-y-1">
                                <p className="text-muted-foreground flex items-center"><Calendar className="h-3 w-3 mr-1" /> Check-in</p>
                                <p className="font-bold">{booking.checkIn}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground flex items-center"><Calendar className="h-3 w-3 mr-1" /> Check-out</p>
                                <p className="font-bold">{booking.checkOut}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground">Guests</p>
                                <p className="font-bold">{booking.guests} Adults</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-muted-foreground">Total Paid</p>
                                <p className="text-lg font-bold text-primary">${booking.totalPrice}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <div className="flex items-center gap-4">
                                {isUpcoming ? (
                                    <div className="flex items-center text-sm text-green-600 font-bold">
                                        <CheckCircle2 className="h-4 w-4 mr-1" /> Check-in in 5 days
                                    </div>
                                ) : (
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4 mr-1" /> Stay completed
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" size="sm">Manage</Button>
                                <Button size="sm">Get Receipt</Button>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </motion.div>
    )
}
