window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

let map, directionsService, directionsRenderer;
let markers = [];
let selectedLocation = "";
let selectedRating = 0;

//  Store all 80 locations in an array
const locations = [
    {
        position: { lat: 7.9573, lng: 80.7602 },
        title: "Sigiriya",
        image: "./images/sigiriya.jpg",
        description: "Sigiriya, the ancient rock fortress, is one of Sri Lanka’s most iconic landmarks.",
        wiki: "https://en.wikipedia.org/wiki/Sigiriya",
        icon: './images/star.png',
        category: "Historical Places",
    }
    // Add the remaining 79 locations here in the same format
];



function mapframe() {
    var map_ops = {
        center: new google.maps.LatLng(7.873, 80.771),
        zoom: 7.60,
        mapTypeId: google.maps.MapTypeId.ROADMAP

    };

    var theMap =
        new google.maps.Map(document.getElementById("map-frame"), map_ops);

    // Initialize Directions API services
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: false });

    // Attach route renderer to the map
    directionsRenderer.setMap(map);

    // Attach event listener for button click
    document.getElementById("route-btn").addEventListener("click", calculateRoute);



    // Locations with category information
    var locations = [
        // Historical places
        {
            position: { lat: 7.9573, lng: 80.7602 },
            title: "Sigiriya",
            image: "./images/sigiriya.jpg",
            description: "Sigiriya, the ancient rock fortress, is one of Sri Lanka’s most iconic landmarks.",
            wiki: "https://en.wikipedia.org/wiki/Sigiriya",
            icon: './images/star.png',
            category: "Historical Places",
            province: "Central"
        },
        {
            position: { lat: 7.2937, lng: 80.6413 },
            title: "Sri Dalada Maligawa",
            image: "./images/dalada maligawa.jpg",
            description: "The Temple of the Sacred Tooth Relic is a Buddhist temple in Kandy, Sri Lanka.",
            wiki: "https://en.wikipedia.org/wiki/Temple_of_the_Tooth",
            icon: './images/star.png',
            category: "Historical Places",
            province: "Central"
        },
        {
            position: { lat: 6.030, lng: 80.215 },
            title: "Galle Dutch Fort",
            image: "./images/galle fort.jpg",
            description: "Galle Dutch Fort is a 16th-century UNESCO site in Sri Lanka, showcasing colonial architecture and scenic ocean views.",
            wiki: "https://en.wikipedia.org/wiki/Galle_Fort",
            icon: './images/star.png',
            category: "Historical Places",
            province: "Southern"
        },
        {
            position: { lat: 6.904, lng: 79.867 },
            title: "Independence Square",
            image: "./images/independence square.jpg",
            description: "Independence Square in Colombo is a historic monument celebrating Sri Lanka’s 1948 independence.",
            wiki: "https://en.wikipedia.org/wiki/Independence_Memorial_Hall",
            icon: './images/star.png',
            category: "Historical Places",
            province: "Western"
        },
        {
            position: { lat: 7.966, lng: 80.761 },
            title: "Pidurangala Rock",
            image: "./images/pidurangala rock.jpg",
            description: "Pidurangala Rock is a scenic hiking spot in Sri Lanka, offering panoramic views of Sigiriya and the surrounding landscape.",
            wiki: "https://wikiceylon.com/pidurangala-rock/",
            icon: './images/star.png',
            category: "Historical Places",
            province: "Central"
        },
        {
            position: { lat: 7.942, lng: 81.000 },
            title: "Royal Palace of King Maha Parakramabahu",
            image: "./images/royal palace.jpg",
            description: "The Royal Palace of King Maha Parakramabahu in Polonnaruwa is a historic ruin of ancient grandeur.",
            wiki: "https://en.wikipedia.org/wiki/Parakramabahu_I",
            icon: './images/star.png',
            category: "Historical Places",
            province: "North Central"
        },
        {
            position: { lat: 7.401, lng: 80.384 },
            title: "Nalanda Gedige (Central point of Sri Lanka)",
            image: "./images/nalanda gedige.jpg",
            description: "Nalanda Gedige is an ancient stone temple at Sri Lanka’s geographical center, blending Hindu and Buddhist architecture.",
            wiki: "https://en.wikipedia.org/wiki/Nalanda_Gedige",
            icon: './images/star.png',
            category: "Historical Places",
            province: "Central"
        },
        {
            position: { lat: 7.874, lng: 80.651 },
            title: "Ibbankatuwa Megalithic Tombs",
            image: "./images/Ibbankatuwa tombs.jpg",
            description: "Ibbankatuwa Megalithic Tombs are ancient burial sites in Sri Lanka, dating back to the prehistoric era.",
            wiki: "https://en.wikipedia.org/wiki/Ibbankatuwa_Megalithic_Tombs",
            icon: './images/star.png',
            category: "Historical Places",
            province: "Central"
        },
        {
            position: { lat: 7.002, lng: 80.435 },
            title: "Belilena Cave",
            image: "./images/cave.jpg",
            description: "Belilena Cave is a prehistoric site in Sri Lanka, famous for ancient human remains and natural formations.",
            wiki: "https://en.wikipedia.org/wiki/Belilena_Cave",
            icon: './images/star.png',
            category: "Historical Places",
            province: "Sabaragamuwa"
        },
        {
            position: { lat: 7.161, lng: 80.547 },
            title: "Ambuluwawa Tower",
            image: "./images/tower.jpg",
            description: "Ambuluwawa Tower is a scenic observation tower in Sri Lanka, offering stunning panoramic views of the hills.",
            wiki: "https://www.wondersofceylon.com/ambuluwawa-tower/",
            icon: './images/star.png',
            category: "Historical Places",
            province: "Central"
        },

        // International Cricket Stadiums
        {
            position: { lat: 6.031, lng: 80.216 },
            title: "Galle International Cricket Stadium",
            image: "./images/galle stadium.jpg",
            description: "Galle International Cricket Stadium is a famous Sri Lankan venue known for its scenic coastal views and historic matches.",
            wiki: "https://en.wikipedia.org/wiki/Galle_International_Stadium",
            icon: './images/stadium.png',
            category: "International Cricket Stadiums",
            province: "Southern"
        },
        {
            position: { lat: 6.940, lng: 79.872 },
            title: "R. Premadasa International Cricket Stadium",
            image: "./images/rp stadium.jpg",
            description: "R. Premadasa International Cricket Stadium in Colombo is a key venue for international cricket matches.",
            wiki: "https://en.wikipedia.org/wiki/R._Premadasa_Stadium",
            icon: './images/stadium.png',
            category: "International Cricket Stadiums",
            province: "Western"
        },
        {
            position: { lat: 7.280, lng: 80.722 },
            title: "Pallekele International Cricket Stadium",
            image: "./images/kandy stadium.jpeg",
            description: "Pallekele International Cricket Stadium is a modern cricket venue in Sri Lanka, hosting international matches.",
            wiki: "https://en.wikipedia.org/wiki/Pallekele_International_Cricket_Stadium",
            icon: './images/stadium.png',
            category: "International Cricket Stadiums",
            province: "Central"
        },
        {
            position: { lat: 6.353, lng: 81.026 },
            title: "Mahinda Rajapaksa International Cricket Stadium",
            image: "./images/mr stadium.jpg",
            description: "Mahinda Rajapaksa International Cricket Stadium is a prominent cricket venue in Sri Lanka, located in Hambantota.",
            wiki: "https://en.wikipedia.org/wiki/Mahinda_Rajapaksa_International_Cricket_Stadium",
            icon: './images/stadium.png',
            category: "International Cricket Stadiums",
            province: "Southern"
        },
        {
            position: { lat: 7.858, lng: 80.633618 },
            title: "Rangiri Dambulla International Cricket Stadium",
            image: "./images/dambulla stadium.jpg",
            description: "Rangiri Dambulla International Cricket Stadium is a scenic Sri Lankan venue known for hosting international matches.",
            wiki: "https://en.wikipedia.org/wiki/Rangiri_Dambulla_International_Stadium",
            icon: './images/stadium.png',
            category: "International Cricket Stadiums",
            province: "Central"
        },

        // Temples
        {
            position: { lat: 7.855179796354981, lng: 80.65053770853557 },
            title: "Dambulla Royal Cave Temple and Golden Temple",
            image: "./images/golden temple.jpg",
            description: "Dambulla Royal Cave Temple and Golden Temple is a UNESCO site in Sri Lanka, known for its cave paintings and Buddha statues.",
            wiki: "https://en.wikipedia.org/wiki/Dambulla_cave_temple",
            icon: './images/buddhism.png',
            category: "Temples",
            province: "Central"
        },
        {
            position: { lat: 7.575, lng: 80.454 },
            title: "Pidurangala Royal Cave Temple",
            image: "./images/pidurangala.jpg",
            description: "Pidurangala Royal Cave Temple in Sri Lanka is an ancient Buddhist site known for its rock carvings and scenic views.",
            wiki: "https://en.wikipedia.org/wiki/Pidurangala_Vihara",
            icon: './images/buddhism.png',
            category: "Temples",
            province: "Central"
        },
        {
            position: { lat: 8.351, lng: 80.515 },
            title: "Mihinthalaya Rajamaha Viharaya",
            image: "./images/mihintale.jpg",
            description: "Mihintale Rajamaha Viharaya is an ancient Buddhist monastery in Sri Lanka, known as the birthplace of Buddhism on the island.",
            wiki: "https://en.wikipedia.org/wiki/Mihintale",
            icon: './images/buddhism.png',
            category: "Temples",
            province: "North Central"
        },
        {
            position: { lat: 7.234, lng: 80.564 },
            title: "Sri Lankathilake Rajamaha Viharaya",
            image: "./images/lankathilaka.jpg",
            description: "Sri Lankathilake Rajamaha Viharaya is a historic Buddhist temple in Sri Lanka, known for its unique architecture and ancient murals.",
            wiki: "https://en.wikipedia.org/wiki/Lankatilaka_Vihara",
            icon: './images/buddhism.png',
            category: "Temples",
            province: "Central"
        },
        {
            position: { lat: 6.916, lng: 79.856 },
            title: "Gangaramaya Temple",
            image: "./images/gangaramaya.jpg",
            description: "Gangaramaya Temple in Colombo is a renowned Buddhist temple, blending traditional and modern architecture with cultural significance.",
            wiki: "https://en.wikipedia.org/wiki/Gangaramaya_Temple",
            icon: './images/buddhism.png',
            category: "Temples",
            province: "Western"
        },
        {
            position: { lat: 8.582, lng: 81.245 },
            title: "Thirukoneswaram Kovil",
            image: "./images/koneswaram.jpg",
            description: "Thirukoneswaram Kovil is a historic Hindu temple in Trincomalee, dedicated to Lord Shiva with stunning coastal views.",
            wiki: "https://en.wikipedia.org/wiki/Koneswaram_Temple",
            icon: './images/hindu.png',
            category: "Temples",
            province: "Eastern"
        },
        {
            position: { lat: 9.674, lng: 80.029 },
            title: "Nallur Kandaswamy Kovil",
            image: "./images/nallur.jpg",
            description: "Nallur Kandaswamy Kovil is a historic Hindu temple in Jaffna, Sri Lanka, dedicated to Lord Murugan and known for its grand Dravidian architecture.",
            wiki: "https://en.wikipedia.org/wiki/Nallur_Kandaswamy_temple",
            icon: './images/hindu.png',
            category: "Temples",
            province: "Northern"
        },
        {
            position: { lat: 6.414, lng: 81.334 },
            title: "Kathirgama Murugan Kovil",
            image: "./images/kataragama.jpg",
            description: "Kathirgama Kanthan Aalayam is a sacred temple in Sri Lanka, dedicated to Lord Murugan, revered by both Hindus and Buddhists.",
            wiki: "https://en.wikipedia.org/wiki/Kataragama_temple",
            icon: './images/hindu.png',
            category: "Temples",
            province: "Uva"
        },
        {
            position: { lat: 6.933, lng: 80.810 },
            title: "Seetha Amman Kovil",
            image: "./images/seetha amman.jpg",
            description: "Seetha Amman Kovil is a Hindu temple in Nuwara Eliya, Sri Lanka, dedicated to Goddess Sita, associated with the Ramayana epic.",
            wiki: "https://en.wikipedia.org/wiki/Seetha_Amman_Temple",
            icon: './images/hindu.png',
            category: "Temples",
            province: "Central"
        },
        {
            position: { lat: 6.948, lng: 79.856 },
            title: "Sri Ponnambalavaneswarar Kovil",
            image: "./images/ponnambalam kovil.jpg",
            description: "Sri Ponnambalavaneswarar Kovil is a 19th-century Hindu temple in Colombo, built with solid granite and dedicated to Lord Shiva.",
            wiki: "https://www.epicsrilankaholidays.com/things-to-do/colombo/shri-ponnambalawaneswaram-kovil.html",
            icon: './images/hindu.png',
            category: "Temples",
            province: "Western"
        },
        {
            position: { lat: 8.855, lng: 80.202 },
            title: "National Shrine of Our Lady of Madhu",
            image: "./images/shrine madu.jpg",
            description: "The National Shrine of Our Lady of Madhu is a revered Catholic shrine in Sri Lanka.",
            wiki: "https://en.wikipedia.org/wiki/Shrine_of_Our_Lady_of_Madhu",
            icon: './images/cross.png',
            category: "Temples",
            province: "Northern"
        },
        {
            position: { lat: 7.218, lng: 79.839 },
            title: "St. Sebastian's Church",
            image: "./images/sebastian.jpg",
            description: "St. Sebastian's Church is a historic Catholic church in Katuwapitiya, Sri Lanka, known for its architectural beauty.",
            wiki: "https://en.wikipedia.org/wiki/St._Sebastian%27s_Church,_Wellaweediya",
            icon: './images/cross.png',
            category: "Temples",
            province: "Western"
        },
        {
            position: { lat: 6.947, lng: 79.856 },
            title: "St. Anthony's Shrine, Kochchikade",
            image: "./images/anthonys church.jpg",
            description: "St. Anthony's Shrine in Kochchikade, Sri Lanka, is a significant Catholic church known for its religious importance and architecture.",
            wiki: "https://en.wikipedia.org/wiki/St._Anthony%27s_Shrine,_Kochchikade",
            icon: './images/cross.png',
            category: "Temples",
            province: "Western"
        },
        {
            position: { lat: 6.938, lng: 79.851 },
            title: "Jami Ul-alfar Mosque",
            image: "./images/jami mosque.jpg",
            description: "Jami Ul-Alfar Mosque, also known as the Red Mosque, is a historic mosque in Colombo, Sri Lanka, famous for its unique red-and-white striped architecture.",
            wiki: "https://en.wikipedia.org/wiki/Jami_Ul-Alfar_Mosque",
            icon: './images/islam.png',
            category: "Temples",
            province: "Western"
        },
        {
            position: { lat: 6.940, lng: 79.858 },
            title: "Grand Masjid Mosque",
            image: "./images/grand masjid.jpg",
            description: "The Grand Masjid Mosque in Colombo is a prominent mosque known for its distinctive architecture and cultural significance.",
            wiki: "https://en.wikipedia.org/wiki/Grand_Mosque_of_Colombo",
            icon: './images/islam.png',
            category: "Temples",
            province: "Western"
        },

        // Beaches

        {
            position: { lat: 6.423, lng: 79.995 },
            title: "Bentota Ventura Beach",
            image: "./images/bentota.jpg",
            description: "Bentota Beach is a stunning coastal destination in Sri Lanka, known for its golden sands, water sports, and scenic beauty.",
            wiki: "https://www.travellankaconnection.com/destinations/bentota-beach/",
            icon: './images/beach.png',
            category: "Beaches",
            province: "Southern"
        },
        {
            position: { lat: 5.945, lng: 80.459 },
            title: "Mirissa Beach",
            image: "./images/mirissa.jpg",
            description: "Mirissa Beach is a picturesque Sri Lankan beach famous for its golden sands, surfing, and whale watching.",
            wiki: "https://en.wikipedia.org/wiki/Mirissa",
            icon: './images/beach.png',
            category: "Beaches",
            province: "Southern"
        },
        {
            position: { lat: 6.137, lng: 80.099 },
            title: "Hikkaduwa Beach",
            image: "./images/hikkaduwa.jpg",
            description: "Hikkaduwa Beach is a popular Sri Lankan beach known for its coral reefs, surfing, and vibrant nightlife.",
            wiki: "https://en.wikipedia.org/wiki/Hikkaduwa",
            icon: './images/beach.png',
            category: "Beaches",
            province: "Southern"
        },
        {
            position: { lat: 6.010, lng: 80.248 },
            title: "Unawatuna Beach",
            image: "./images/unawatuna.jpg",
            description: "Unawatuna Beach is a famous Sri Lankan beach known for its golden sands, turquoise waters, and vibrant nightlife.",
            wiki: "https://en.wikipedia.org/wiki/Unawatuna",
            icon: './images/beach.png',
            category: "Beaches",
            province: "Southern"
        },
        {
            position: { lat: 6.841, lng: 81.836 },
            title: "Arugam Bay Beach",
            image: "./images/arugam bay.jpg",
            description: "Arugam Bay Beach is a world-renowned surfing destination in Sri Lanka, known for its stunning coastline and relaxed atmosphere.",
            wiki: "https://en.wikipedia.org/wiki/Arugam_Bay",
            icon: './images/beach.png',
            category: "Beaches",
            province: "Eastern"
        },
        {
            position: { lat: 7.930, lng: 81.561 },
            title: "Pasikudah Beach",
            image: "./images/pasikuda beach.jpg",
            description: "Pasikudah Beach is a serene Sri Lankan beach known for its shallow turquoise waters and soft white sands.",
            wiki: "https://en.wikipedia.org/wiki/Pasikudah",
            icon: './images/beach.png',
            category: "Beaches",
            province: "Eastern"
        },
        {
            position: { lat: 8.704, lng: 81.191 },
            title: "Nilaveli Beach",
            image: "./images/nilaveli.jpg",
            description: "Nilaveli Beach is a pristine Sri Lankan beach known for its soft white sands, crystal-clear waters, and nearby Pigeon Island.",
            wiki: "https://en.wikipedia.org/wiki/Nilaveli",
            icon: './images/beach.png',
            category: "Beaches",
            province: "Eastern"
        },
        {
            position: { lat: 8.512, lng: 81.211 },
            title: "Marble Beach",
            image: "./images/marble.jpg",
            description: "Marble Beach is a tranquil beach in Sri Lanka, known for its crystal-clear waters, soft sands, and scenic beauty.",
            wiki: "https://traveltriangle.com/blog/marble-beach/",
            icon: './images/beach.png',
            category: "Beaches",
            province: "Eastern"
        },
        {
            position: { lat: 5.936, lng: 80.526 },
            title: "Polhena Beach",
            image: "./images/polhena.jpg",
            description: "Polhena Beach is a scenic Sri Lankan beach known for its calm waters, coral reefs, and sea turtle sightings.",
            wiki: "https://www.lovesrilanka.org/polhena-beach/",
            icon: './images/beach.png',
            category: "Beaches",
            province: "Southern"
        },
        {
            position: { lat: 5.995, lng: 80.288 },
            title: "Thalpe Beach",
            image: "./images/thalpe.jpg",
            description: "Thalpe Beach is a serene beach in Sri Lanka, known for its clear waters, golden sands, and rock pools.",
            wiki: "https://amazinglanka.com/wp/thalpe-beach/",
            icon: './images/beach.png',
            category: "Beaches",
            province: "Southern"
        },

        // Natural Beauty & Outdoor Attractions
        // Natural Beauty - Waterfalls
        {
            position: { lat: 7.055, lng: 80.705 },
            title: "Ramboda Falls",
            image: "./images/ramboda.jpg",
            description: "Ramboda Falls is a stunning 109m-high waterfall in Sri Lanka, surrounded by lush greenery and scenic mountain views.",
            wiki: "https://en.wikipedia.org/wiki/Ramboda_Falls",
            icon: './images/waterfalls.png',
            category: "Natural Beauty",
            province: "Central"
        },
        {
            position: { lat: 6.733, lng: 81.031 },
            title: "Diyaluma Falls",
            image: "./images/diyaluma.jpg",
            description: "Diyaluma Falls, Sri Lanka’s second-highest waterfall at 220m, is famous for its breathtaking cascades and natural rock pools.",
            wiki: "https://en.wikipedia.org/wiki/Diyaluma_Falls",
            icon: './images/waterfalls.png',
            category: "Natural Beauty",
            province: "Uva"
        },
        {
            position: { lat: 6.773, lng: 80.831 },
            title: "Bambarakanda Falls",
            image: "./images/bambarakanda.jpg",
            description: "Bambarakanda Falls, the tallest waterfall in Sri Lanka at 263m, is known for its stunning drop and scenic forest surroundings.",
            wiki: "https://en.wikipedia.org/wiki/Bambarakanda_Falls",
            icon: './images/waterfalls.png',
            category: "Natural Beauty",
            province: "Uva"
        },
        {
            position: { lat: 7.017, lng: 81.063 },
            title: "Dunhinda Falls",
            image: "./images/dunhinda.jpg",
            description: "Dunhinda Falls is a breathtaking 64m-high waterfall in Sri Lanka, known for its misty spray and lush surroundings.",
            wiki: "https://en.wikipedia.org/wiki/Dunhinda_Falls",
            icon: './images/waterfalls.png',
            category: "Natural Beauty",
            province: "Uva"
        },
        {
            position: { lat: 6.949, lng: 80.501 },
            title: "Aberdeen Waterfall",
            image: "./images/aberdeen.jpg",
            description: "Aberdeen Falls is a picturesque 98m-high waterfall in Sri Lanka, surrounded by lush greenery and rocky landscapes.",
            wiki: "https://en.wikipedia.org/wiki/Aberdeen_Falls",
            icon: './images/waterfalls.png',
            category: "Natural Beauty",
            province: "Central"
        },
        {
            position: { lat: 6.899, lng: 80.501 },
            title: "Laxapana Falls",
            image: "./images/laxapana.JPG",
            description: "Laxapana Falls is a majestic 126m-high waterfall in Sri Lanka, known for its scenic beauty and hydroelectric significance.",
            wiki: "https://en.wikipedia.org/wiki/Laxapana_Falls",
            icon: './images/waterfalls.png',
            category: "Natural Beauty",
            province: "Central"
        },
        {
            position: { lat: 6.798, lng: 80.548 },
            title: "Gartmore Falls",
            image: "./images/gartmore.jpg",
            description: "Gartmore Falls is a picturesque twin waterfall in Sri Lanka, located near Adam's Peak and surrounded by lush tea plantations.",
            wiki: "https://www.wondersofceylon.com/gartmore-falls/",
            icon: './images/waterfalls.png',
            category: "Natural Beauty",
            province: "Central"
        },
        {
            position: { lat: 6.971, lng: 80.855 },
            title: "Ravana Ella Waterfall",
            image: "./images/ravana falls.jpg",
            description: "Ravana Ella Waterfall is a stunning 25m-high cascade in Sri Lanka, linked to the Ramayana legend and surrounded by lush greenery.",
            wiki: "https://en.wikipedia.org/wiki/Ravana_Falls",
            icon: './images/waterfalls.png',
            category: "Natural Beauty",
            province: "Uva"
        },
        {
            position: { lat: 6.79295, lng: 80.78942 },
            title: "Baker's Falls",
            image: "./images/bakers falls.jpg",
            description: "Baker's Falls is a beautiful waterfall in Sri Lanka's Horton Plains National Park, known for its scenic beauty.",
            wiki: "https://www.birdingsrilanka.com/waterfall-details/baker_s-falls",
            icon: './images/waterfalls.png',
            category: "Natural Beauty",
            province: "Central"
        },
        {
            position: { lat: 6.94751, lng: 80.83117 },
            title: "Bomburu Ella Waterfall",
            image: "./images/bomburu.JPG",
            description: "Bomburu Ella Waterfall is a scenic waterfall near Nuwara Eliya, Sri Lanka, known for its lush surroundings and serene beauty.",
            wiki: "https://uk.lakpura.com/pages/bomburu-ella-waterfall",
            icon: './images/waterfalls.png',
            category: "Natural Beauty",
            province: "Central"
        },

        // Outdoor Attractions
        {
            position: { lat: 6.464, lng: 81.471 },
            title: "Yala National Park",
            image: "./images/yala.jpg",
            description: "Yala National Park is Sri Lanka’s most famous wildlife sanctuary, known for its high density of leopards, elephants, and diverse ecosystems.",
            wiki: "https://www.yalasrilanka.lk/about-yala.html",
            icon: './images/park.png',
            category: "Outdoor Attractions",
            province: "Southern"
        },
        {
            position: { lat: 6.476, lng: 80.876 },
            title: "Udawalawe National Park",
            image: "./images/udawalawe.jpg",
            description: "Udawalawe National Park in Sri Lanka is renowned for its large elephant population and diverse wildlife, offering excellent safari experiences.",
            wiki: "https://en.wikipedia.org/wiki/Udawalawe_National_Park",
            icon: './images/park.png',
            category: "Outdoor Attractions",
            province: "Sabaragamuwa"
        },
        {
            position: { lat: 6.578, lng: 81.668 },
            title: "Kumana National Park",
            image: "./images/kumana.jpg",
            description: "Kumana National Park, located in southeastern Sri Lanka, is famous for its rich birdlife, including migratory species, and diverse ecosystems.",
            wiki: "https://en.wikipedia.org/wiki/Kumana_National_Park",
            icon: './images/park.png',
            category: "Outdoor Attractions",
            province: "Eastern"
        },
        {
            position: { lat: 6.809, lng: 80.802 },
            title: "Horton Plains National Park",
            image: "./images/horton plains.jpg",
            description: "Horton Plains National Park in Sri Lanka is known for its scenic landscapes, cloud forests, and the famous World's End cliff.",
            wiki: "https://en.wikipedia.org/wiki/Horton_Plains_National_Park",
            icon: './images/park.png',
            category: "Outdoor Attractions",
            province: "Central"
        },
        {
            position: { lat: 6.811, lng: 80.499 },
            title: "Sri Pada / Adam's Peak",
            image: "./images/sripada.jpg",
            description: "Sri Pada, also known as Adam's Peak, is a sacred mountain in Sri Lanka, renowned for its religious significance and stunning sunrise views.",
            wiki: "https://en.wikipedia.org/wiki/Adam%27s_Peak",
            icon: './images/mountain.png',
            category: "Outdoor Attractions",
            province: "Sabaragamuwa"
        },
        {
            position: { lat: 6.877, lng: 81.060 },
            title: "Nine Arches Bridge",
            image: "./images/nine arch.jpg",
            description: "Nine Arches Bridge is a historic railway bridge in Sri Lanka, famous for its stunning architecture and picturesque surroundings.",
            wiki: "https://en.wikipedia.org/wiki/Nine_Arch_Bridge",
            icon: './images/bridge.png',
            category: "Outdoor Attractions",
            province: "Uva"
        },
        {
            position: { lat: 8.492, lng: 80.049 },
            title: "Wilpattu National Park",
            image: "./images/wilpattu.jpg",
            description: "Wilpattu National Park is Sri Lanka’s largest national park, known for its leopards, sloth bears, and scenic villus (natural lakes).",
            wiki: "https://en.wikipedia.org/wiki/Wilpattu_National_Park",
            icon: './images/park.png',
            category: "Outdoor Attractions",
            province: "North Western"
        },
        {
            position: { lat: 7.301099, lng: 80.38884 },
            title: "Pinnawala Elephant Orphanage",
            image: "./images/pinnawala.jpg",
            description: "Pinnawala Elephant Orphanage in Sri Lanka is a sanctuary for rescued elephants, famous for its herd bathing in the Ma Oya River.",
            wiki: "https://en.wikipedia.org/wiki/Pinnawala_Elephant_Orphanage",
            icon: './images/park.png',
            category: "Outdoor Attractions",
            province: "Sabaragamuwa"
        },
        {
            position: { lat: 8.72183, lng: 81.20375 },
            title: "Pigeon Island",
            image: "./images/pigeon.jpg",
            description: "Pigeon Island is a marine national park in Sri Lanka, known for its vibrant coral reefs, diverse marine life, and excellent snorkeling opportunities.",
            wiki: "https://en.wikipedia.org/wiki/Pigeon_Island_National_Park",
            icon: './images/park.png',
            category: "Outdoor Attractions",
            province: "Eastern"
        },
        {
            position: { lat: 6.911074, lng: 79.86342 },
            title: "Nelum Pokuna Theatre",
            image: "./images/nelum.jpg",
            description: "Nelum Pokuna Theatre is a modern performing arts center in Colombo, Sri Lanka, known for its lotus-shaped design and world-class facilities.",
            wiki: "https://en.wikipedia.org/wiki/Nelum_Pokuna_Mahinda_Rajapaksa_Theatre",
            icon: './images/building.png',
            category: "Outdoor Attractions",
            province: "Western"
        },
        {
            position: { lat: 6.92730, lng: 79.85831 },
            title: "Colombo Lotus Tower",
            image: "./images/lotus tower.jpg",
            description: "Colombo Lotus Tower, South Asia's tallest tower at 350m, is a Sri Lankan landmark with observation decks and entertainment facilities.",
            wiki: "https://en.wikipedia.org/wiki/Lotus_Tower",
            icon: './images/lotus tower.png',
            category: "Outdoor Attractions",
            province: "Western"
        },
        {
            position: { lat: 7.04133, lng: 81.02159 },
            title: "Narangala Mountain Top Point",
            image: "./images/narangala.jpg",
            description: "Narangala Mountain Top Point is a scenic peak in Sri Lanka, known for its breathtaking sunrise views and lush green landscapes.",
            wiki: "https://uk.lakpura.com/pages/narangala",
            icon: './images/mountain.png',
            category: "Outdoor Attractions",
            province: "Central"
        },
        {
            position: { lat: 6.05111, lng: 80.30453 },
            title: "Kabaragala Mountain",
            image: "./images/kabaragala.jpg",
            description: "Kabaragala Mountain, the highest peak in the Dolosbage Range, offers stunning panoramic views and a scenic hiking trail.",
            wiki: "https://vocal.media/journal/kabaragala-mountain-in-sri-lanka",
            icon: './images/mountain.png',
            category: "Outdoor Attractions",
            province: "Southern"
        },
        {
            position: { lat: 6.80553, lng: 80.84156 },
            title: "Devil’s Staircase",
            image: "./images/devil staircase.JPG",
            description: "Devil’s Staircase is a thrilling off-road trail in Sri Lanka, known for its steep slopes, hairpin bends, and breathtaking mountain views.",
            wiki: "https://uk.lakpura.com/pages/devil-s-staircase?srsltid=AfmBOorJwbwxQJV0nuTgx0PtmSVzeOnoDfRgjfR8ZrrCKeT3m-i-edtL&shpxid=c3da5795-4f41-48df-bf2f-74138851aa38",
            icon: './images/mountain.png',
            category: "Outdoor Attractions",
            province: "Sabaragamuwa"
        },
        {
            position: { lat: 6.77257, lng: 80.93107 },
            title: "Adisham Bungalow",
            image: "./images/adisham bungalow.jpg",
            description: "Adisham Bungalow is a historic English-style country house in Sri Lanka, now a monastery, known for its scenic gardens and colonial architecture.",
            wiki: "https://en.wikipedia.org/wiki/Adisham_Hall",
            icon: './images/building.png',
            category: "Outdoor Attractions",
            province: "Uva"
        },
        {
            position: { lat: 6.78079, lng: 81.01550 },
            title: "Lipton's Seat",
            image: "./images/lipton seat.jpg",
            description: "Lipton's Seat is a scenic viewpoint in Sri Lanka, offering panoramic views of tea plantations and surrounding hills.",
            wiki: "https://en.wikipedia.org/wiki/Lipton",
            icon: './images/mountain.png',
            category: "Outdoor Attractions",
            province: "Uva"
        },
        {
            position: { lat: 6.92679, lng: 80.82149 },
            title: "Hakgala Botanical Garden",
            image: "./images/hakgala.jpg",
            description: "Hakgala Botanical Garden is a scenic garden in Sri Lanka, known for its diverse plant species, cool climate, and beautiful landscapes.",
            wiki: "https://en.wikipedia.org/wiki/Hakgala_Botanical_Garden",
            icon: './images/park.png',
            category: "Outdoor Attractions",
            province: "Central"
        },
        {
            position: { lat: 6.95739, lng: 80.77824 },
            title: "Lake Gregory",
            image: "./images/gregory.jpg",
            description: "Lake Gregory is a picturesque reservoir in Nuwara Eliya, Sri Lanka, popular for boating, scenic views, and recreational activities.",
            wiki: "https://en.wikipedia.org/wiki/Lake_Gregory_(Nuwara_Eliya)",
            icon: './images/lake.png',
            category: "Outdoor Attractions",
            province: "Central"
        },
        {
            position: { lat: 7.26838, lng: 80.59662 },
            title: "Royal Botanic Gardens",
            image: "./images/peradeniya.jpg",
            description: "Royal Botanic Gardens Peradeniya is a famous botanical garden in Sri Lanka, known for its diverse plant species and scenic beauty.",
            wiki: "https://en.wikipedia.org/wiki/Royal_Botanic_Gardens,_Peradeniya",
            icon: './images/park.png',
            category: "Outdoor Attractions",
            province: "Central"
        },
        {
            position: { lat: 6.91007, lng: 79.86089 },
            title: "Colombo National Museum",
            image: "./images/national museum.jpg",
            description: "Colombo National Museum is Sri Lanka's largest museum, housing a vast collection of historical artifacts, art, and cultural exhibits.",
            wiki: "https://en.wikipedia.org/wiki/Colombo_National_Museum",
            icon: './images/building.png',
            category: "Outdoor Attractions",
            province: "Western"
        },
        {
            position: { lat: 6.85715, lng: 79.87440 },
            title: "Dehiwala Zoological Gardens",
            image: "./images/zoo.jpg",
            description: "Dehiwala Zoological Gardens is a popular zoo in Sri Lanka, known for its diverse animal species and engaging wildlife shows.",
            wiki: "https://en.wikipedia.org/wiki/National_Zoological_Gardens_of_Sri_Lanka",
            icon: './images/zoo.png',
            category: "Outdoor Attractions",
            province: "Western"
        },
        {
            position: { lat: 6.92175, lng: 80.10561 },
            title: "Leisure World Water Park",
            image: "./images/leisure world.jpg",
            description: "Leisure World Water Park in Sri Lanka is known for its exciting water rides, slides, and family-friendly attractions.",
            wiki: "http://www.leisureworld.lk/",
            icon: './images/lake.png',
            category: "Outdoor Attractions",
            province: "Western"
        },
        {
            position: { lat: 6.73722, lng: 79.98533 },
            title: "Pearl Bay Water Park",
            image: "./images/pearl bay.jpg",
            description: "Pearl Bay Water Park is a family-friendly water park in Sri Lanka, featuring exciting water slides, pools, and recreational activities.",
            wiki: "https://www.thepearlbay.com/",
            icon: './images/lake.png',
            category: "Outdoor Attractions",
            province: "Western"
        },
        {
            position: { lat: 6.93794, lng: 79.83622 },
            title: "Port City Colombo",
            image: "./images/port city.jpg",
            description: "Port City Colombo is a major development project in Sri Lanka, aimed at creating a modern city with residential, commercial, and recreational spaces.",
            wiki: "https://en.wikipedia.org/wiki/Port_City_Colombo",
            icon: './images/building.png',
            category: "Outdoor Attractions",
            province: "Western"
        },
        {
            position: { lat: 7.18037, lng: 79.88420 },
            title: "Colombo Bandaranaike International Airport",
            image: "./images/airport.jpg",
            description: "Colombo Bandaranaike International Airport is Sri Lanka's main international airport, serving as the country's primary air travel hub.",
            wiki: "https://www.airport.lk/",
            icon: './images/airport.png',
            category: "Outdoor Attractions",
            province: "Western"
        },

        // Beach Resorts

        {
            position: { lat: 7.24178, lng: 79.84178 },
            title: "Jetwing Blue",
            image: "./images/jetwing.jpg",
            description: "Jetwing Blue is a luxury beachfront resort in Negombo, Sri Lanka, known for its ocean views and modern amenities.",
            wiki: "https://www.jetwinghotels.com/jetwingblue/#gref",
            icon: './images/resort.png',
            category: "Beach Resorts",
            province: "North Western"
        },
        {
            position: { lat: 6.11222, lng: 81.06394 },
            title: "Shangri-La Hambantota",
            image: "./images/shangrila.jpg",
            description: "Shangri-La Hambantota is a luxury resort in Sri Lanka, known for its beachfront views and world-class amenities.",
            wiki: "https://www.shangri-la.com/hambantota/shangrila/",
            icon: './images/resort.png',
            category: "Beach Resorts",
            province: "Southern"
        },
        {
            position: { lat: 6.42017, lng: 79.99665 },
            title: "EKHO Surf Bentota",
            image: "./images/ekho.jpg",
            description: "EKHO Surf Bentota is a beachfront hotel in Sri Lanka, offering a blend of modern amenities, beautiful ocean views, and a relaxing atmosphere.",
            wiki: "https://www.loveholidays.com/holidays/sri-lanka/bentota/ekho-surf.html?WT.mc_id=pgo-62315454653-kwd-450695028948&ch=hn&gad_source=1&gclid=CjwKCAiAw5W-BhAhEiwApv4goINQ5fV1EwxbqErFnvVr8LwM0fXN7A977E62hM-n0TWwbMPM8x9Z_BoClHkQAvD_BwE",
            icon: './images/resort.png',
            category: "Beach Resorts",
            province: "Southern"
        },
        {
            position: { lat: 7.92573, lng: 81.56806 },
            title: "Amaya Beach Pasikudah",
            image: "./images/amaya beach.jpg",
            description: "Amaya Beach Pasikudah is a luxury resort in Sri Lanka, known for its pristine beach, crystal-clear waters, and tranquil atmosphere.",
            wiki: "https://www.amayaresorts.com/amayabeach/",
            icon: './images/resort.png',
            category: "Beach Resorts",
            province: "Eastern"
        },
        {
            position: { lat: 6.12967, lng: 80.10303 },
            title: "Citrus Hikkaduwa",
            image: "./images/citrus.jpg",
            description: "Citrus Hikkaduwa is a beachfront hotel in Sri Lanka, offering modern amenities, beautiful ocean views, and a vibrant atmosphere.",
            wiki: "https://www.booking.com/hotel/lk/citrus-hikkaduwa.en-gb.html",
            icon: './images/resort.png',
            category: "Beach Resorts",
            province: "Southern"
        }


    ];


    // Loop through locations and add markers with enhanced info windows
    locations.forEach(function (location) {
        var marker = new google.maps.Marker({
            position: location.position,
            icon: location.icon,  // Use the custom icon from the location object
            title: location.title,
            animation: google.maps.Animation.DROP, // Drop animation
            map: theMap

        });

        marker.province = location.province; // Ensure the province is stored in the marker object
        markers.push(marker);

        // Assign category to marker
        marker.category = location.category;



        // Custom Info Window content with Wikipedia link
        var infoWindowContent = `
                    <div class="info-window">
                        <h3>${location.title}</h3>
                        <img src="${location.image}" alt="${location.title}">
                        <p>${location.description}</p>
                        <a href="${location.wiki}" target="_blank">Read More</a>
                    </div>`;

        var infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
        });

        // Open Info Window on marker click
        marker.addListener("click", function () {
            // Stop bouncing any active marker
            markers.forEach(m => m.setAnimation(null));

            // Toggle bounce animation
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(() => marker.setAnimation(null), 1500); // Stop bouncing after 1.5 seconds
            }
            infoWindow.open(theMap, marker);
            updateRatingTab(location.title); // Update the rating tab with the location name
            clearRating();  // Clear rating when clicking a new location
        });



        markers.push(marker);
    });

    function filterByProvince(selectedProvince) {
        console.log("Selected Province:", selectedProvince); // Debugging

        markers.forEach(marker => {
            console.log("Marker Province:", marker.province); // Debugging

            if (selectedProvince === "all") {
                marker.setVisible(true); // Show all markers
            } else {
                if (marker.province === selectedProvince) {
                    marker.setVisible(true); // Show only selected province markers
                } else {
                    marker.setVisible(false); // Hide others
                }
            }
        });
    }

    // Attach event listener to the province filter dropdown
    document.getElementById("province-filter").addEventListener("change", function () {
        filterByProvince(this.value);
    });




    populateDropdowns();

    function populateDropdowns() {
        let startSelect = document.getElementById("start-location");
        let endSelect = document.getElementById("end-location");
        locations.forEach(location => {
            let option = new Option(location.title, JSON.stringify(location.position));
            startSelect.add(option.cloneNode(true));
            endSelect.add(option);
        });
    }

    function calculateRoute() {
        let startValue = document.getElementById("start-location").value;
        let endValue = document.getElementById("end-location").value;

        if (!startValue || !endValue) {
            alert("Please select both start and end locations.");
            return;
        }

        let start = JSON.parse(startValue);
        let end = JSON.parse(endValue);

        let request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function (result, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
                let duration = result.routes[0].legs[0].duration.text;
                let route = result.routes[0].legs[0];
                document.getElementById("travel-time").innerHTML = `<span style="font-size: 16px; font-weight: bold;">Estimated Drive Time: ${duration}</span>`;
                document.getElementById("route-info").innerHTML =
                    `<div style="font-size: 17px; font-weight: bold;">🚗 Distance: ${route.distance.text} <br> ⏳ Duration: ${route.duration.text}</div>`;
            } else {
                alert("Could not find a route. Please check the locations and try again.");
                console.error("Directions request failed due to " + status);
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("route-btn").addEventListener("click", calculateRoute);
    });

    document.querySelectorAll(".star").forEach(star => {
        star.addEventListener("click", function () {
            selectedRating = parseInt(this.getAttribute("data-value"));
            updateStars(selectedRating);
        });
    });
    // Filtering system
    document.getElementById("category-filter").addEventListener("change", function () {
        filterMarkers(this.value);
    });



    document.querySelectorAll(".star").forEach(star => {
        star.addEventListener("click", function () {
            selectedRating = parseInt(this.getAttribute("data-value"));
            updateStars(selectedRating);
        });
    });

    function updateStars(rating) {
        document.querySelectorAll(".star").forEach(star => {
            let starValue = parseInt(star.getAttribute("data-value"));
            star.classList.toggle("active", starValue <= rating);
        });
    }

    function submitRating() {
        if (selectedRating === 0) {
            alert("Please select a star rating!");
            return;
        }
        alert(`You rated ${selectedLocation} with ${selectedRating} stars!`);
        clearRating();  // Clear rating after submission
    }


    function filterMarkers(selectedCategory) {
        markers.forEach(function (marker) {
            console.log(`Checking Marker: ${marker.title}, Category: ${marker.category}, Selected: ${selectedCategory}`);

            if (selectedCategory === "all") {
                marker.setVisible(true);  // Show all markers
            } else {
                marker.setVisible(marker.category === selectedCategory);  // Show only selected category markers
            }
        });
    }


    function updateRatingTab(locationName) {
        selectedLocation = locationName;
        document.getElementById("selected-location").textContent = selectedLocation;
    }

    function clearRating() {
        selectedRating = 0;
        document.querySelectorAll(".star").forEach(star => {
            star.classList.remove("active");
        });
    }

}
