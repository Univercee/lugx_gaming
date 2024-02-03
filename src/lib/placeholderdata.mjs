import bcrypt from 'bcryptjs';
export const users = [
    {
        id: "2349a680-64fc-4d01-9169-b23eee3aecc4",
        name: "admin",
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        email: "user@nextmail.com",
        password: await bcrypt.hash("123456", 10)
    }
]

export const statuses = [
    {
        id: "9d82adee-2d04-4b70-9364-5004bc08fe72",
        name: "Approved",
    },
    {
        id: "663f323f-1f87-4119-8a93-680d809ebc9e",
        name: "Dislined",
    },
    {
        id: "8a4202a7-97bf-4384-93ca-ce5f54ad7511",
        name: "Pending",
    }
]

export const tags = [
    {
        id: "57e61950-e865-4a77-a550-498a95351a89",
        name: "Trending",
    },
    {
        id: "16d311b4-5464-45d5-8a98-9646a9e67a52",
        name: "Most played",
    },
    {
        id: "4015bac2-3abe-416d-b0a9-2ebf210ae0c5",
        name: "Top",
    }
]

export const genres = [
    {
        id: "9637fdca-8b4d-454b-9b4d-c2e08916b517",
        name: "Action",
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        tags: [tags[2]],
    },
    {
        id: "dd0194f5-e638-48cf-9251-bfa509cbf6ac",
        name: "Adventure",
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        tags: [tags[2]],
    },
    {
        id: "783a22d2-f656-430c-9b77-2b48e48bf095",
        name: "Strategy",
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        tags: [tags[2]],
    },
    {
        id: "8cc74b69-9f3a-4d41-a5d2-e833a1e08d63",
        name: "Racing",
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        tags: [tags[2]],
    },
    {
        id: "5f5184ba-eae9-4252-8358-b8d4e1ae0d5c",
        name: "Shooter",
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        tags: [tags[2]],
    },
    {
        id: "da1158f5-46c1-41af-b34a-5eb4db3082ae",
        name: "Platform",
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        tags: [],
    },
    {
        id: "4bc4b27b-a7dd-4865-9d4b-cf54364aae86",
        name: "Sport",
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        tags: [],
    },
    {
        id: "d3c5c336-06d0-47f1-8126-cf7a13f00ea7",
        name: "Indie",
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        tags: [],
    }
]


export const games  = [
    {
        id: "5b870e87-b128-4f1f-bf70-e26c51b08bf3",
        name: "Assassin's Creed II",
        description: `Assassin’s Creed® 2 is the follow-up to the title that became the fastest-selling new IP in video game history. The highly anticipated title features a new hero, Ezio Auditore da Firenze, a young Italian noble, and a new era, the Renaissance.
        Assassin’s Creed 2 retains the core gameplay experience that made the first opus a resounding success and features new experiences that will surprise and challenge players.
        Assassin’s Creed 2 is an epic story of family, vengeance and conspiracy set in the pristine, yet brutal, backdrop of a Renaissance Italy. Ezio befriends Leonardo da Vinci, takes on Florence’s most powerful families and ventures throughout the canals of Venice where he learns to become a master assassin.`,
        price: 5.49,
        tags: [tags[2]],
        genres: [genres[0], genres[1]],
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        isActive: true,
        status: statuses[0],
        createdBy: users[0]
    },
    {
        id: "46ecf095-e261-47fa-9608-a81d39d019ee",
        name: "Need for Speed Shift",
        description: `Need for Speed™ SHIFT is an award-winning authentic racing game that combines the true driver’s experience with real-world physics, pixel-perfect car models, and a wide range of authentic race tracks. Need for Speed SHIFT takes players in a different direction to create a simulation experience that replicates the true feeling of driving high-end performance cars.

        Players are thrust into the loud, visceral, intense, athletic experience of racing a car on the edge of control from the driver’s perspective through the combination of perception based G-forces, the hyper reality of the cockpit view, and the brutal experience of a first person crash dynamic. Need for Speed SHIFT features an accurate, accessible physics-based driving model that allows you to feel every impact, every change of track surface and every last bit of grip as you push yourself to the edge.`,
        genres: [genres[3]],
        price: 7.49,
        tags: [],
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        isActive: true,
        status: statuses[0],
        createdBy: users[0]
    },
    {
        id: "deabcf92-68b1-40ae-b284-331b8698c10d",
        name: "Heroes of Might and Magic III - HD Edition",
        description: `Important note: Heroes III – HD Edition content is based on the original 1999 game: The Restoration of Erathia.


        Do you remember all those sleepless nights spent fighting Black Dragons and Archangels, Demons and Necromancers? Were you a true fan of Heroes® of Might & Magic® III? We have great news for you!
        
        The most popular Heroes® title of all time is back in HD! Fifteen years later, rediscover the epic tale of Queen Catherine Ironfist, as she re-embarks on her critically acclaimed quest to unite her ravaged homeland and re-conquer the kingdom of Erathia.
        
        Forge the destinies of mighty and magical heroes, leading fantastic and ferocious creatures in a game that still stands today as the landmark opus of the Might & Magic: Heroes’ franchise.
        
        Heroes® of Might & Magic® III is a turn-based strategy game, originally released in February 1999.`,
        genres: [genres[2]],
        price: 8.25,
        tags: [tags[1], tags[2]],
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        isActive: true,
        status: statuses[0],
        createdBy: users[0]
    },
    {
        id: "41a6ada6-6d01-4609-8047-d68dfb3eacd5",
        name: "Broken Age",
        description: `Broken Age is a family friendly, hand-animated, puzzle-filled adventure game with an all-star cast, including Elijah Wood, Jack Black and Masasa Moyo. Funded by a record breaking crowdfunding campaign and designed by industry legend Tim Schafer, Broken Age is a timeless coming-of-age story of barfing trees and talking spoons.

        Vella Tartine and Shay Volta are two teenagers in strangely similar situations, but radically different worlds. The player can freely switch between their stories, helping them take control of their own lives, and dealing with the unexpected adventures that follow.`,
        genres: [genres[1], genres[7]],
        price: 8.49,
        tags: [],
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        isActive: true,
        status: statuses[0],
        createdBy: users[0]
    },
    {
        id: "7437aed6-39b4-4bad-9bbd-cbb66670fe26",
        name: "The Witcher 3 - Wild Hunt",
        description: `You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.`,
        genres: [genres[0], genres[1]],
        price: 19.99,
        tags: [tags[0], tags[1], tags[2]],
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        isActive: true,
        status: statuses[0],
        createdBy: users[0]
    },
    {
        id: "4b53f840-b3b8-4e79-b88b-193e50f666b6",
        name: "The Witcher",
        description: `The Witcher represents the pinnacle of storytelling in role-playing games, shattering the line between good and evil with a world where moral ambiguity reigns. In a beautiful, rich game universe created by artists first, technology second, the player becomes his own hero in an epic, action-packed narrative uniquely defined by his actions. Returning to the roots of the role-playing genre with a fresh and modern approach, The Witcher emphasizes story and character development in a vibrant world, while incorporating tactically-deep real-time combat like no game before it.
        Immersed in a vivid but harsh fantasy world, the player assumes the role of a white-haired witcher named Geralt, a renowned monster-slayer-for-hire and master swordsman with superhuman strength and reflexes. While trying to regain his lost memory, Geralt unwillingly becomes involved in a world-shaking power struggle. Created to provide entertainment for both fans of role-playing games and those seeking fast-paced action, The Witcher brings together epic storytelling and dynamic, visually stunning, and tactically deep action.`,
        genres: [genres[0], genres[1]],
        price: 7.49,
        tags: [tags[2]],
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        isActive: true,
        status: statuses[0],
        createdBy: users[0]
    },
    {
        id: "67c73b70-939e-467b-be95-ec1c53eb47d6",
        name: "Grand Theft Auto V",
        description: `Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.`,
        genres: [genres[0], genres[4]],
        tags: [tags[0], tags[1], tags[2]],
        price: 15.37,
        image: "https://res.cloudinary.com/dvmssvqsi/image/upload/v1706382441/trending-01_bsklff.jpg",
        isActive: true,
        status: statuses[0],
        createdBy: users[0]
    }
]



















