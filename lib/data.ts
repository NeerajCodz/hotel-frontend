import { Hotel, Room, Review, Destination, Deal, Amenity, SearchFilters } from "@/types";

// Import JSON data
import hotelsData from "@/config/hotels.json";
import roomsData from "@/config/rooms.json";
import reviewsData from "@/config/reviews.json";
import destinationsData from "@/config/destinations.json";
import dealsData from "@/config/deals.json";
import amenitiesData from "@/config/amenities.json";

// Type assertions
const hotels = hotelsData as Hotel[];
const rooms = roomsData as Room[];
const reviews = reviewsData as Review[];
const destinations = destinationsData as Destination[];
const deals = dealsData as Deal[];
const amenities = amenitiesData as Amenity[];

// Hotels
export function getAllHotels(): Hotel[] {
    return hotels;
}

export function getHotelById(id: string): Hotel | undefined {
    return hotels.find((hotel) => hotel.id === id);
}

export function searchHotels(filters: SearchFilters): Hotel[] {
    return hotels.filter((hotel) => {
        // Location filter
        if (filters.location) {
            const searchTerm = filters.location.toLowerCase();
            const matchesLocation =
                hotel.name.toLowerCase().includes(searchTerm) ||
                hotel.location.toLowerCase().includes(searchTerm) ||
                hotel.city.toLowerCase().includes(searchTerm) ||
                hotel.country.toLowerCase().includes(searchTerm);
            if (!matchesLocation) return false;
        }

        // Price range filter
        if (filters.priceRange) {
            const [min, max] = filters.priceRange;
            if (hotel.price < min || hotel.price > max) return false;
        }

        // Category filter
        if (filters.categories && filters.categories.length > 0) {
            if (!filters.categories.includes(hotel.category)) return false;
        }

        // Amenities filter
        if (filters.amenities && filters.amenities.length > 0) {
            const hasAllAmenities = filters.amenities.every((amenity) =>
                hotel.amenities.includes(amenity)
            );
            if (!hasAllAmenities) return false;
        }

        // Rating filter
        if (filters.rating) {
            if (hotel.rating < filters.rating) return false;
        }

        return true;
    });
}

export function getHotelsByDestination(destinationId: string): Hotel[] {
    const destination = destinations.find((d) => d.id === destinationId);
    if (!destination) return [];
    return hotels.filter((hotel) => destination.hotelIds.includes(hotel.id));
}

// Rooms
export function getAllRooms(): Room[] {
    return rooms;
}

export function getRoomsByHotelId(hotelId: string): Room[] {
    return rooms.filter((room) => room.hotelId === hotelId);
}

export function getRoomById(id: string): Room | undefined {
    return rooms.find((room) => room.id === id);
}

// Reviews
export function getAllReviews(): Review[] {
    return reviews;
}

export function getReviewsByHotelId(hotelId: string): Review[] {
    return reviews.filter((review) => review.hotelId === hotelId);
}

export function getReviewStats(hotelId: string) {
    const hotelReviews = getReviewsByHotelId(hotelId);

    if (hotelReviews.length === 0) {
        return {
            averageRating: 0,
            totalReviews: 0,
            distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        };
    }

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    hotelReviews.forEach((review) => {
        distribution[review.rating as keyof typeof distribution]++;
    });

    const averageRating =
        hotelReviews.reduce((sum, review) => sum + review.rating, 0) /
        hotelReviews.length;

    return {
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: hotelReviews.length,
        distribution,
    };
}

export function filterReviews(
    hotelId: string,
    options: {
        rating?: number;
        sortBy?: "recent" | "helpful" | "rating";
    }
): Review[] {
    let filtered = getReviewsByHotelId(hotelId);

    // Filter by rating
    if (options.rating) {
        filtered = filtered.filter((review) => review.rating === options.rating);
    }

    // Sort
    if (options.sortBy === "recent") {
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (options.sortBy === "helpful") {
        filtered.sort((a, b) => b.helpful - a.helpful);
    } else if (options.sortBy === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
}

// Destinations
export function getAllDestinations(): Destination[] {
    return destinations;
}

export function getDestinationBySlug(slug: string): Destination | undefined {
    return destinations.find((dest) => dest.slug === slug);
}

export function getDestinationById(id: string): Destination | undefined {
    return destinations.find((dest) => dest.id === id);
}

export function searchDestinations(query: string): Destination[] {
    const searchTerm = query.toLowerCase();
    return destinations.filter(
        (dest) =>
            dest.name.toLowerCase().includes(searchTerm) ||
            dest.country.toLowerCase().includes(searchTerm) ||
            dest.region.toLowerCase().includes(searchTerm) ||
            dest.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
}

export function getDestinationsByRegion(region: string): Destination[] {
    return destinations.filter((dest) => dest.region === region);
}

// Deals
export function getAllDeals(): Deal[] {
    return deals;
}

export function getActivDeals(): Deal[] {
    const now = new Date();
    return deals.filter((deal) => {
        const validFrom = new Date(deal.validFrom);
        const validUntil = new Date(deal.validUntil);
        return now >= validFrom && now <= validUntil;
    });
}

export function getFeaturedDeals(): Deal[] {
    return getActivDeals().filter((deal) => deal.featured);
}

export function getDealsByType(type: Deal["type"]): Deal[] {
    return getActivDeals().filter((deal) => deal.type === type);
}

export function getDealById(id: string): Deal | undefined {
    return deals.find((deal) => deal.id === id);
}

export function getHotelDeals(hotelId: string): Deal[] {
    return getActivDeals().filter((deal) => deal.hotelIds.includes(hotelId));
}

// Amenities
export function getAllAmenities(): Amenity[] {
    return amenities;
}

export function getAmenityById(id: string): Amenity | undefined {
    return amenities.find((amenity) => amenity.id === id);
}

export function getAmenitiesByCategory(category: string): Amenity[] {
    return amenities.filter((amenity) => amenity.category === category);
}

// Utility functions
export function calculateNights(checkIn: Date, checkOut: Date): number {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export function calculateTotalPrice(
    basePrice: number,
    nights: number,
    extras: number[] = []
): number {
    const roomTotal = basePrice * nights;
    const extrasTotal = extras.reduce((sum, extra) => sum + extra, 0);
    return roomTotal + extrasTotal;
}

export function applyDiscount(price: number, discountPercent: number): number {
    return Math.round(price * (1 - discountPercent / 100));
}

export function formatPrice(price: number): string {
    return `$${price.toLocaleString()}`;
}

export function formatDate(date: string | Date): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

// Get popular destinations (by number of hotels)
export function getPopularDestinations(limit: number = 6): Destination[] {
    return destinations
        .sort((a, b) => b.hotelIds.length - a.hotelIds.length)
        .slice(0, limit);
}

// Get featured hotels (highest rated)
export function getFeaturedHotels(limit: number = 6): Hotel[] {
    return hotels
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}
