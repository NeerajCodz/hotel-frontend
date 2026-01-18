export interface Hotel {
    id: string;
    name: string;
    location: string;
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
}

export const AMENITIES = [
    "WiFi",
    "Pool",
    "Parking",
    "AC",
    "Gym",
    "Spa",
    "Restaurant",
    "Bar",
];

export const HOTELS: Hotel[] = [
    {
        id: "1",
        name: "The Grand Regal",
        location: "Paris, France",
        price: 450,
        rating: 4.9,
        reviewsCount: 1240,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1200",
        ],
        amenities: ["WiFi", "Pool", "Spa", "Restaurant", "AC"],
        category: "Hotel",
        description: "Experience unparalleled luxury in the heart of Paris. The Grand Regal offers world-class service, gourmet dining, and stunning views of the Eiffel Tower.",
        coordinates: { lat: 48.8566, lng: 2.3522 },
    },
    {
        id: "2",
        name: "Azure Cove Resort",
        location: "Maldives",
        price: 850,
        rating: 5.0,
        reviewsCount: 850,
        image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200",
        ],
        amenities: ["WiFi", "Pool", "Spa", "Bar", "Gym"],
        category: "Resort",
        description: "Our overwater villas provide direct access to the crystal clear lagoon. Indulge in private dining, water sports, and absolute serenity.",
        coordinates: { lat: 3.2028, lng: 73.2207 },
    },
    {
        id: "3",
        name: "Urban Loft Suites",
        location: "New York, USA",
        price: 320,
        rating: 4.7,
        reviewsCount: 2100,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1200",
        ],
        amenities: ["WiFi", "Gym", "Kitchenette", "AC"],
        category: "Apartment",
        description: "Modern, spacious apartments in the heart of Manhattan. perfect for business travelers and families who want a home-away-from-home experience.",
        coordinates: { lat: 40.7128, lng: -74.0060 },
    },
    {
        id: "4",
        name: "Mountain Whisper Lodge",
        location: "Swiss Alps, Switzerland",
        price: 550,
        rating: 4.8,
        reviewsCount: 620,
        image: "https://images.unsplash.com/photo-1512918730906-836746815332?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1512918730906-836746815332?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=1200",
        ],
        amenities: ["WiFi", "Spa", "Restaurant", "Fireplace"],
        category: "Resort",
        description: "A cozy retreat surrounded by snow-capped peaks. Enjoy skiing, hiking, and relaxing by the fire in our traditional Alpine lodge.",
        coordinates: { lat: 46.8182, lng: 8.2275 },
    },
    {
        id: "5",
        name: "Sunrise Sands Hotel",
        location: "Santorini, Greece",
        price: 400,
        rating: 4.9,
        reviewsCount: 1540,
        image: "https://images.unsplash.com/photo-1515404929826-76fff9fef204?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1515404929826-76fff9fef204?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1469796466635-455ede028ca2?auto=format&fit=crop&q=80&w=1200",
        ],
        amenities: ["WiFi", "Pool", "Restaurant", "Bar"],
        category: "Hotel",
        description: "White-washed luxury overlooking the caldera. Sunrise Sands offers the quintessential Santorini experience with breathtaking sunset views.",
        coordinates: { lat: 36.3932, lng: 25.4615 },
    },
    {
        id: "6",
        name: "Eco Jungle Retreat",
        location: "Ubud, Bali",
        price: 250,
        rating: 4.6,
        reviewsCount: 980,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1537953773345-d142cc4cc7ab?auto=format&fit=crop&q=80&w=1200",
        ],
        amenities: ["WiFi", "Pool", "Spa", "Organic Garden"],
        category: "Resort",
        description: "Disconnect and reconnect with nature. Our eco-friendly resort is tucked away in the lush jungles of Ubud, offering yoga and meditation.",
        coordinates: { lat: -8.5069, lng: 115.2625 },
    }
];

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
}

export const MOCK_BOOKINGS: Booking[] = [
    {
        id: "b1",
        hotelId: "1",
        hotelName: "The Grand Regal",
        hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
        checkIn: "2024-06-15",
        checkOut: "2024-06-20",
        guests: 2,
        totalPrice: 2250,
        status: "upcoming",
        createdAt: "2024-01-10",
    },
    {
        id: "b2",
        hotelId: "3",
        hotelName: "Urban Loft Suites",
        hotelImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
        checkIn: "2023-12-01",
        checkOut: "2023-12-05",
        guests: 1,
        totalPrice: 1280,
        status: "past",
        createdAt: "2023-11-15",
    }
];
