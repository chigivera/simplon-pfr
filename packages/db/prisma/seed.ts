import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const mapData = [
  { name: "Agadir", latitude: 30.46667, longitude: -9.91667 },
  { name: "Al Hoceima", latitude: 35.13333, longitude: -3.96667 },
  { name: "Alhucema s/Al Hoceima", latitude: 35.13333, longitude: -3.08333 },
  { name: "Anti Atlas", latitude: 30, longitude: -8.5 },
  { name: "Ar Rachid iya/Er Rachidia", latitude: 31, longitude: -4.3 },
  { name: "Atlas Mts ./Haut Atlas", latitude: 32, longitude: -5 },
  { name: "Baddouza , Ras", latitude: 32, longitude: -9 },
  { name: "Beni Mall al", latitude: 32, longitude: -6 },
  { name: "Bouarfa", latitude: 32, longitude: -1 },
  { name: "Casablanca", latitude: 33, longitude: -7 },
  { name: "Dar el Bei da/Casablanca", latitude: 33, longitude: -7 },
  { name: "El Jadida", latitude: 33, longitude: -8 },
  { name: "Er Rachid ia", latitude: 31, longitude: -4 },
  { name: "Er Rif", latitude: 35, longitude: -4 },
  { name: "Essaouira", latitude: 31, longitude: -9 },
  { name: "Fedala/M ohammedia", latitude: 33, longitude: -7 },
  { name: "Fes", latitude: 34, longitude: -5 },
  { name: "Fez/Fes", latitude: 34, longitude: -5 },
  { name: "Figuig", latitude: 32, longitude: 47 },
  { name: "Goulimine", latitude: 28, longitude: -10 },
  { name: "Guelmine /Goulimine", latitude: 28, longitude: -10 },
  { name: "Haut Atla s", latitude: 32, longitude: -5 },
  { name: "High Atla s/Haut Atlas", latitude: 32, longitude: -5 },
  { name: "Juby, C.", latitude: 28, longitude: -12 },
  { name: "Kenitra ", latitude: 34, longitude: 6 },
  { name: "Khemisse t ", latitude: 33, longitude: 6 },
  { name: "Khouribga ", latitude: 32, longitude: 6 },
  { name: "Ksar el Kebir ", latitude: 35, longitude: 6 },
  { name: "Ksar es Souk/Er Rachidia ", latitude: 31, longitude: 4 },
  { name: "Marrakech ", latitude: 31, longitude: 8 },
  { name: "Mazagan /El Jadida ", latitude: 33, longitude: 8 },
  { name: "Meknes ", latitude: 33, longitude: 5 },
  { name: "Mogador/ Essauira ", latitude: 31, longitude: 9 },
  { name: "Mohammedia ", latitude: 33, longitude: 7 },
  { name: "Moulouya O.", latitude: 35, longitude: 2 },
  { name: "Moyen Atlas ", latitude: 33, longitude: 5 },
  { name: "Nador ", latitude: 35, longitude: 0 },
  { name: "Ouarzazate ", latitude: 30, longitude: 6 },
  { name: "Ouezzane", latitude: 34, longitude: 5 },
  { name: "Oujda ", latitude: 34, longitude: 1 },
  { name: "Rabat ", latitude: 34, longitude: 6 },
  { name: "Rhir cap ", latitude: 30, longitude: 9 },
  { name: "Safi ", latitude: 32, longitude: 9 },
  { name: "Settat ", latitude: 33, longitude: 7 },
  { name: "Tanger ", latitude: 35 , longitude: 5 },
  { name: "Tangier/ Tanger ", latitude: 35, longitude: 5 },
  { name: "Toubkal, Djebel ", latitude: 31, longitude: 8 },
  { name: "Villa Bens/Tarfaya ", latitude: 27, longitude: -12 },
];

const popularEventTags = [
  "music",
  "festival",
  "concert",
  "comedy",
  "workshop",
  "networking",
  "business",
  "technology",
  "education",
  "health",
  "fitness",
  "food",
  "wine",
  "beer",
  "art",
  "design",
  "fashion",
  "sports",
  "outdoors",
  "travel",
  "lifestyle",
  "community",
  "family",
  "youth",
  "senior",
  "charity",
  "fundraiser",
  "holiday",
  "seasonal",
  "exclusive",
  "free",
  "paid",
  "virtual",
  "in-person",
  "interactive",
  "keynote",
  "panel",
  "conference",
  "summit",
  "expo",
  "meetup",
  "party",
  "performance",
  "screening",
  "competition",
  "tournament",
  "class",
  "workshop",
  "demonstration",
  "tour",
  "exhibition",
  "fair",
  "festival",
  "parade",
  "ceremony",
  "gala",
  "celebration",
  "symposium",
  "seminar",
  "webinar",
  "retreat",
  "camp",
  "rally",
  "protest",
  "activism",
  "volunteer",
  "nonprofit",
  "corporate",
  "private",
  "public",
  "ticketed",
  "free-to-attend",
  "youth-focused",
  "adult-only",
  "family-friendly",
  "pet-friendly",
  "sustainable",
  "eco-friendly",
  "inclusive",
  "diverse",
  "women-focused",
  "minority-focused",
  "accessibility",
  "disability-friendly",
  "educational",
  "professional",
  "social",
  "cultural",
  "historical",
  "political",
  "religious",
  "spiritual",
  "creative",
  "entrepreneurial",
  "networking",
  "learning",
  "entertainment",
  "relaxation",
  "wellness",
  "self-improvement",
  "community-building",
  "advocacy",
  "awareness",
  "fundraising",
  "charitable",
  "celebration",
  "recognition",
  "awards",
  "competition",
  "tournament",
  "gaming",
  "esports",
  "music",
  "art",
  "film",
  "theater",
  "dance",
  "literature",
  "photography",
  "technology",
  "innovation",
  "startups",
  "industry-specific",
  "product-launch",
  "career-development",
  "job-fair",
  "recruitment",
  "training",
  "certification",
  "networking",
  "social-impact",
  "environmental",
  "sustainability",
  "climate-change",
  "renewable-energy",
  "conservation",
  "activism",
  "community-service",
  "volunteer",
  "philanthropy",
  "nonprofit",
  "fundraising",
  "charity",
  "humanitarian",
  "social-justice",
  "diversity",
  "inclusion",
  "equity",
  "civil-rights",
  "LGBTQ+",
  "women's-rights",
  "racial-justice",
  "disability-rights",
  "indigenous-rights",
  "immigrant-rights",
  "youth-empowerment",
  "senior-services",
  "accessibility",
  "mental-health",
  "wellness",
  "self-care",
  "personal-growth",
  "mindfulness",
  "meditation",
  "yoga",
  "fitness",
  "sports",
  "recreation",
  "outdoor-adventure",
  "travel",
  "tourism",
  "culinary",
  "food",
  "wine",
  "beer",
  "cocktails",
  "spirits",
  "coffee",
  "tea",
  "agriculture",
  "gardening",
  "urban-farming",
  "health",
  "medicine",
  "science",
  "research",
  "technology",
  "innovation",
  "engineering",
  "robotics",
  "artificial-intelligence",
  "software",
  "cybersecurity",
  "blockchain",
  "cryptocurrency",
  "gaming",
  "esports",
  "virtual-reality",
  "augmented-reality",
  "cinema",
  "television",
  "music",
  "performing-arts",
  "visual-arts",
  "literature",
  "design",
  "fashion",
  "architecture",
  "urban-planning",
  "transportation",
  "mobility",
  "logistics",
  "government",
  "politics",
  "policy",
  "law",
  "education",
  "lifelong-learning",
  "professional-development",
  "leadership",
  "entrepreneurship",
  "small-business",
  "startups",
  "finance",
  "investing",
  "real-estate",
  "construction",
  "manufacturing",
  "energy",
  "utilities",
  "telecommunications",
  "media",
  "marketing",
  "advertising",
  "public-relations",
  "social-media",
  "digital-marketing",
  "e-commerce",
  "retail",
  "hospitality",
  "tourism",
  "transportation",
  "logistics",
  "nonprofit",
  "philanthropy",
  "social-impact",
  "community-development",
  "social-services",
  "human-rights",
  "environment",
  "sustainability",
  "conservation",
  "renewable-energy",
  "climate-change",
  "wildlife",
  "nature",
  "outdoors",
  "recreation",
  "sports",
  "fitness",
  "wellness",
  "mental-health",
  "self-care",
  "personal-growth",
  "relationships",
  "family",
  "parenting",
  "seniors",
  "youth",
  "LGBTQ+",
  "diversity",
  "inclusion",
  "equity",
  "social-justice",
  "civil-rights",
  "activism",
  "advocacy",
  "community-service",
  "volunteer",
  "nonprofit",
  "philanthropy",
  "charitable",
  "fundraising",
  "awareness",
  "education",
  "lifelong-learning",
  "professional-development",
  "leadership",
  "entrepreneurship",
  "small-business",
  "startups",
  "finance",
  "investing",
  "real-estate",
  "construction",
  "manufacturing",
  "energy",
  "utilities",
  "telecommunications",
  "media",
  "marketing",
  "advertising",
  "public-relations",
  "social-media",
  "digital-marketing",
  "e-commerce",
  "retail",
  "hospitality",
  "tourism",
  "transportation",
  "logistics"
];

async function main() {
  for (const location of mapData) {
      const existingCity = await prisma.city.findUnique({
          where: { name: location.name },
      });
      if (!existingCity) {
          await prisma.city.create({ data: location });
      } else {
          console.log(`City ${location.name} already exists.`);
      }
  }
  for (const tagName of popularEventTags) {
    const existingTag = await prisma.tag.findUnique({
      where: {
        name: tagName
      }
    });

    if (!existingTag) {
      await prisma.tag.create({
        data: {
          name: tagName
        }
      });
      console.log(`Created tag: ${tagName}`);
    } else {
      console.log(`Tag "${tagName}" already exists.`);
    }
  }
}
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });