export interface Hotel {
    id: string;
    name: string;
    location: string;
    city: string;
    country: string;
    region: string;
    price: number;
    rating: number;
    reviewsCount: number;
    image: string;
    images: string[];
    amenities: string[];
    category: "Hotel" | "Resort" | "Apartment";
    description: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    checkInTime: string;
    checkOutTime: string;
    policies: {
        cancellation: string;
        pets: string;
        smoking: string;
    };
    nearbyAttractions: string[];
}

export interface Room {
    id: string;
    hotelId: string;
    name: string;
    type: string;
    price: number;
    size: string;
    maxGuests: number;
    beds: string;
    image: string;
    amenities: string[];
    description: string;
}

export interface Review {
    id: string;
    hotelId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
    helpful: number;
    notHelpful: number;
    roomType: string;
    stayDuration: string;
    travelType: string;
}

export interface Destination {
    id: string;
    name: string;
    country: string;
    region: string;
    slug: string;
    description: string;
    image: string;
    heroImage: string;
    bestTimeToVisit: string;
    averageTemp: string;
    currency: string;
    language: string;
    hotelIds: string[];
    attractions: string[];
    activities: string[];
    tags: string[];
}

export interface Deal {
    id: string;
    title: string;
    description: string;
    type: "seasonal" | "last-minute" | "package";
    discountPercent: number;
    hotelIds: string[];
    validFrom: string;
    validUntil: string;
    bookingPeriod: string;
    travelPeriod: string;
    image: string;
    terms: string[];
    featured: boolean;
    savings: string;
    includes?: string[];
}

export interface Amenity {
    id: string;
    name: string;
    category: string;
    icon: string;
    description: string;
}

export interface SearchFilters {
    location?: string;
    checkIn?: Date;
    checkOut?: Date;
    guests?: number;
    priceRange?: [number, number];
    categories?: string[];
    amenities?: string[];
    rating?: number;
}

export interface Booking {
    id: string;
    hotelId: string;
    hotelName: string;
    hotelImage: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
    status: "upcoming" | "past" | "cancelled";
    createdAt: string;
    roomType?: string;
    extras?: string[];
}
