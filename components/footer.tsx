import Link from "next/link"
import { Hotel, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-muted/50 border-t">
            <div className="container px-4 py-12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <Hotel className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold tracking-tighter">LuxeStay</span>
                        </Link>
                        <p className="text-muted-foreground text-sm mb-6">
                            Making your travel dreams come true with the world's most luxurious and comfortable accommodations.
                        </p>
                        <div className="flex space-x-4">
                            <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/hotels" className="hover:text-primary transition-colors">Search Hotels</Link></li>
                            <li><Link href="/destinations" className="hover:text-primary transition-colors">Popular Destinations</Link></li>
                            <li><Link href="/deals" className="hover:text-primary transition-colors">Special Deals</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" /> support@luxestay.com
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" /> +1 (800) LUXE-STAY
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-1" />
                                123 Luxury Ave, <br />
                                Suite 500, New York, NY
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} LuxeStay Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
