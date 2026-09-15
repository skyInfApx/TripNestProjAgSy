package com.tripnest.backend.config;

import com.tripnest.backend.entity.Attraction;
import com.tripnest.backend.entity.Destination;
import com.tripnest.backend.entity.Role;
import com.tripnest.backend.repository.AttractionRepository;
import com.tripnest.backend.repository.DestinationRepository;
import com.tripnest.backend.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * DataInitializer populates essential roles and rich sample destinations
 * along with their attractions if the database is initially empty.
 */
@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabaseData(
            RoleRepository roleRepository,
            DestinationRepository destinationRepository,
            AttractionRepository attractionRepository) {

        return args -> {
            // 1. Ensure basic user roles exist
            if (roleRepository.findByName("TRAVELER").isEmpty()) {
                Role traveler = new Role();
                traveler.setName("TRAVELER");
                roleRepository.save(traveler);
            }

            if (roleRepository.findByName("ADMIN").isEmpty()) {
                Role admin = new Role();
                admin.setName("ADMIN");
                roleRepository.save(admin);
            }

            // 2. Seed Destinations & Attractions if empty
            if (destinationRepository.count() == 0) {
                System.out.println("TripNest: Seeding destinations and attractions...");

                // 1. Bangalore, Karnataka
                Destination blr = createDestination(
                        "Bangalore",
                        "India",
                        "Metropolis & Garden Heritage",
                        "India's vibrant tech capital known for historic palaces, botanical gardens, lively cafe culture, and craft microbreweries.",
                        "October to March",
                        "Well-connected by Kempegowda International Airport (BLR) and Namma Metro. Ideal for cafe trails in Indiranagar and Koramangala.",
                        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80"
                );
                destinationRepository.save(blr);
                attractionRepository.saveAll(List.of(
                        createAttraction("Bangalore Palace", "Tudor-style royal residence with wooden carvings and gardens.", "Vasanth Nagar", "Sightseeing", 250.0, blr),
                        createAttraction("Lalbagh Botanical Garden", "240-acre historic botanical garden with centuries-old glasshouse.", "Mavalli", "Nature", 30.0, blr),
                        createAttraction("Cubbon Park & Vidhana Soudha", "Lush central park adjacent to Karnataka's neo-Dravidian state legislature.", "Central Bangalore", "Heritage", 0.0, blr)
                ));

                // 2. Pune, Maharashtra
                Destination pune = createDestination(
                        "Pune",
                        "India",
                        "Cultural Heritage & Hill Forts",
                        "A historic Maratha cultural capital nestled against the Sahyadri mountains, famous for hill forts, street food, and academic institutions.",
                        "July to February",
                        "Scenic 3-hour expressway drive from Mumbai or via Pune Airport (PNQ). Famous for Misal Pav, Bakarwadi, and mountain treks.",
                        "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80"
                );
                destinationRepository.save(pune);
                attractionRepository.saveAll(List.of(
                        createAttraction("Shaniwar Wada", "Historic 18th-century fortified palace headquarters of the Peshwa rulers.", "Shaniwar Peth", "Heritage", 25.0, pune),
                        createAttraction("Aga Khan Palace", "Italian-arched historical monument with serene lawns significant to the freedom movement.", "Kalyani Nagar", "Historical", 25.0, pune),
                        createAttraction("Sinhagad Fort", "Clifftop fortress offering sweeping Sahyadri vistas and famous village cuisine.", "Sinhagad Ghat", "Adventure", 50.0, pune)
                ));

                // 3. Munnar, Kerala
                Destination munnar = createDestination(
                        "Munnar",
                        "India",
                        "Hill Station & Tea Plantations",
                        "Emerald rolling tea estates, mist-covered mountain valleys, and cascading waterfalls tucked in the Western Ghats.",
                        "September to March",
                        "Scenic 3.5-hour mountain drive from Cochin Airport (COK). Ideal for tea tasting, Ayurvedic retreats, and nature photography.",
                        "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"
                );
                destinationRepository.save(munnar);
                attractionRepository.saveAll(List.of(
                        createAttraction("Eravikulam National Park", "High-altitude sanctuary home to the rare Nilgiri Tahr and Anamudi peak.", "Munnar Hills", "Wildlife", 200.0, munnar),
                        createAttraction("Tata Tea Museum", "Historic tea-processing museum showcasing artisanal leaf cultivation.", "Nullatanni", "Cultural", 150.0, munnar),
                        createAttraction("Mattupetty Dam & Echo Point", "Picturesque reservoir lake offering speedboats and forest trails.", "Mattupetty", "Leisure", 50.0, munnar)
                ));

                // 4. Coorg (Kodagu), Karnataka
                Destination coorg = createDestination(
                        "Coorg",
                        "India",
                        "Coffee Estates & Nature Escape",
                        "Mist-cloaked hills, fragrant Arabica coffee estates, spice plantations, and the warm hospitality of the Kodava community.",
                        "October to April",
                        "5 hours from Bangalore or 2.5 hours from Mysore. Best explored through cozy estate homestays and forest treks.",
                        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
                );
                destinationRepository.save(coorg);
                attractionRepository.saveAll(List.of(
                        createAttraction("Abbey Falls", "Roaring waterfall dropping through lush coffee groves and pepper vines.", "Madikeri", "Sightseeing", 15.0, coorg),
                        createAttraction("Namdroling Monastery (Golden Temple)", "Tibetan Buddhist monastery featuring 40-foot golden statues and tranquil chants.", "Bylakuppe", "Spiritual", 0.0, coorg),
                        createAttraction("Raja's Seat", "Historic seasonal garden where Kodagu kings watched sunset panoramas.", "Madikeri", "Scenic View", 20.0, coorg)
                ));

                // 5. Shillong, Meghalaya
                Destination shillong = createDestination(
                        "Shillong",
                        "India",
                        "Eco-Tourism & Waterfalls",
                        "The peaceful, safe, and pristine Scotland of the East, famous for living root bridges, pine hills, live music, and Khasi culture.",
                        "September to May",
                        "Fly to Guwahati (GAU) followed by a 3-hour scenic drive past Umiam Lake into Shillong. Very welcoming to travelers.",
                        "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
                );
                destinationRepository.save(shillong);
                attractionRepository.saveAll(List.of(
                        createAttraction("Umiam Lake (Barapani)", "Vast crystal-blue reservoir surrounded by pines, offering kayaking and boat rides.", "Ri-Bhoi", "Adventure", 100.0, shillong),
                        createAttraction("Elephant Falls", "Three-tier mountain waterfall with paved walking trails surrounded by rare ferns.", "Upper Shillong", "Nature", 50.0, shillong),
                        createAttraction("Laitlum Canyons", "Breathtaking canyon edge overlooking deep misty gorges and tribal villages.", "Laitlum", "Hiking", 0.0, shillong)
                ));

                // 6. Mussoorie, Uttarakhand
                Destination mussoorie = createDestination(
                        "Mussoorie",
                        "India",
                        "Himalayan Hill Station",
                        "The Queen of the Hills perched high on a ridge facing snow-capped Himalayan peaks and the lush Doon Valley.",
                        "March to June & December to February",
                        "1.5-hour uphill mountain drive from Dehradun Railway Station or Jolly Grant Airport (DED).",
                        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
                );
                destinationRepository.save(mussoorie);
                attractionRepository.saveAll(List.of(
                        createAttraction("Kempty Falls", "Famous mountain waterfall cascading into a plunge pool surrounded by cliffs.", "Kempty", "Leisure", 0.0, mussoorie),
                        createAttraction("Mall Road & Gun Hill", "Colonial promenade with handicraft shops, historic bakeries, and cable car ride.", "The Mall", "Sightseeing", 150.0, mussoorie),
                        createAttraction("Lal Tibba & Landour", "Highest point in Mussoorie with telescopes facing the high Himalayas.", "Landour", "Scenic Point", 50.0, mussoorie)
                ));

                // 7. Goa, India
                Destination goa = createDestination(
                        "Goa",
                        "India",
                        "Coastal Beaches & Nightlife",
                        "Sun-kissed beaches, coastal cuisine, Portuguese architecture, water sports, and tranquil backwaters.",
                        "November to February",
                        "Served by Dabolim and MOPA international airports. Renowned for beach shacks, scootering, and sunset cruises.",
                        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
                );
                destinationRepository.save(goa);
                attractionRepository.saveAll(List.of(
                        createAttraction("Baga Beach", "Vibrant sandy shoreline known for water sports, beach shacks, and evening music.", "North Goa", "Adventure", 0.0, goa),
                        createAttraction("Basilica of Bom Jesus", "UNESCO World Heritage 16th-century church holding the relics of St. Francis Xavier.", "Old Goa", "Heritage", 0.0, goa),
                        createAttraction("Dudhsagar Falls", "Four-tiered majestic white waterfall nestled deep in Bhagwan Mahaveer Sanctuary.", "Sonaulim", "Nature", 100.0, goa)
                ));

                // 8. Paris, France
                Destination paris = createDestination(
                        "Paris",
                        "France",
                        "Art, Romance & Architecture",
                        "The City of Lights, celebrated for world-class art museums, grand boulevards, sidewalk bistros, and iconic monuments.",
                        "April to October",
                        "Charles de Gaulle Airport (CDG) and Paris Metro make navigation seamless.",
                        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
                );
                destinationRepository.save(paris);
                attractionRepository.saveAll(List.of(
                        createAttraction("Eiffel Tower", "The global symbol of France with observation decks overlooking Paris.", "Champ de Mars", "Sightseeing", 35.0, paris),
                        createAttraction("Louvre Museum", "World's largest art museum holding the Mona Lisa and Venus de Milo.", "Rue de Rivoli", "Cultural", 22.0, paris),
                        createAttraction("Arc de Triomphe", "Monumental triumphal arch honoring French history at the top of the Champs-Élysées.", "Place Charles de Gaulle", "Sightseeing", 16.0, paris)
                ));

                // 9. Tokyo, Japan
                Destination tokyo = createDestination(
                        "Tokyo",
                        "Japan",
                        "Futuristic City & Ancient Traditions",
                        "A dazzling blend of neon skyscrapers, cutting-edge robotics, ancient Shinto shrines, and Michelin-starred gastronomy.",
                        "March to May & September to November",
                        "Served by Haneda (HND) and Narita (NRT). The Tokyo Subway is world-famous for speed and punctuality.",
                        "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
                );
                destinationRepository.save(tokyo);
                attractionRepository.saveAll(List.of(
                        createAttraction("Senso-ji Temple", "Tokyo's oldest Buddhist temple located in the historic Asakusa district.", "Asakusa", "Spiritual", 0.0, tokyo),
                        createAttraction("Shibuya Crossing & Hachiko", "World's busiest pedestrian scramble crossing and shopping hub.", "Shibuya", "Sightseeing", 0.0, tokyo),
                        createAttraction("Meiji Jingu Shrine", "Serene Shinto shrine dedicated to Emperor Meiji surrounded by dense forest.", "Shibuya", "Heritage", 0.0, tokyo)
                ));

                // 10. Varanasi, India
                Destination varanasi = createDestination(
                        "Varanasi",
                        "India",
                        "Spiritual & Heritage Capital",
                        "One of the world's oldest continuously inhabited cities, revered for sacred Ganges ghats, temples, and evening aartis.",
                        "October to March",
                        "Lal Bahadur Shastri Airport (VNS). Early morning boat rides along the ghats are unforgettable.",
                        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"
                );
                destinationRepository.save(varanasi);
                attractionRepository.saveAll(List.of(
                        createAttraction("Dashashwamedh Ghat", "Main sacred ghat on the river Ganges where the grand evening Ganga Aarti takes place.", "Ganga Ghats", "Spiritual", 0.0, varanasi),
                        createAttraction("Kashi Vishwanath Temple", "Historic golden-spire temple dedicated to Lord Shiva in the heart of old Varanasi.", "Vishwanath Gali", "Spiritual", 0.0, varanasi),
                        createAttraction("Sarnath Deer Park", "Revered pilgrimage site where Lord Buddha delivered his first sermon.", "Sarnath", "Historical", 25.0, varanasi)
                ));

                // 11. Rome, Italy
                Destination rome = createDestination(
                        "Rome",
                        "Italy",
                        "Ancient History & Gastronomy",
                        "The Eternal City with nearly 3,000 years of globally influential art, architecture, and culinary traditions.",
                        "April to June & September to October",
                        "Rome Fiumicino Airport (FCO). A walkable open-air museum filled with piazzas and gelaterias.",
                        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80"
                );
                destinationRepository.save(rome);
                attractionRepository.saveAll(List.of(
                        createAttraction("Colosseum", "Iconic ancient Roman amphitheatre that hosted gladiatorial contests.", "Piazza del Colosseo", "Sightseeing", 18.0, rome),
                        createAttraction("Trevi Fountain", "Baroque marble fountain where travelers toss coins to ensure their return to Rome.", "Piazza di Trevi", "Sightseeing", 0.0, rome),
                        createAttraction("Pantheon", "Ancient Roman temple converted into a church with a magnificent unreinforced concrete dome.", "Piazza della Rotonda", "Heritage", 5.0, rome)
                ));

                // 12. Bali, Indonesia
                Destination bali = createDestination(
                        "Bali",
                        "Indonesia",
                        "Tropical Temples & Island Retreat",
                        "The Island of the Gods, renowned for forested volcanic mountains, iconic rice paddies, beaches, and coral reefs.",
                        "April to October",
                        "Ngurah Rai International Airport (DPS). Excellent for surfing, wellness yoga, and cultural exploration.",
                        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
                );
                destinationRepository.save(bali);
                attractionRepository.saveAll(List.of(
                        createAttraction("Tanah Lot Temple", "Ancient Hindu pilgrimage temple perched on a dramatic rock formation in the sea.", "Tabanan", "Spiritual", 5.0, bali),
                        createAttraction("Tegallalang Rice Terraces", "Step-like emerald green valleys offering dramatic valley views and zip lines.", "Ubud", "Nature", 2.0, bali),
                        createAttraction("Ubud Sacred Monkey Forest", "Sanctuary and temple complex inhabited by hundreds of playful Balinese long-tailed macaques.", "Padangtegal", "Wildlife", 6.0, bali)
                ));

                System.out.println("TripNest: Successfully seeded 12 destinations and their attractions!");
            }
        };
    }

    private Destination createDestination(String name, String country, String type,
                                          String description, String bestTime,
                                          String travelInfo, String imageUrl) {
        Destination d = new Destination();
        d.setName(name);
        d.setCountry(country);
        d.setType(type);
        d.setDescription(description);
        d.setBestTimeToVisit(bestTime);
        d.setTravelInformation(travelInfo);
        d.setImageUrl(imageUrl);
        return d;
    }

    private Attraction createAttraction(String name, String description, String location,
                                       String category, Double entryFee, Destination destination) {
        Attraction a = new Attraction();
        a.setName(name);
        a.setDescription(description);
        a.setLocation(location);
        a.setCategory(category);
        a.setEntryFee(entryFee);
        a.setDestination(destination);
        return a;
    }
}
