"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  ChevronLeft, 
  ChevronRight,
  Home,
  Users,
  Wrench,
  Shield,
  Map,
  Coins,
  Sparkles,
  BookOpen,
  ExternalLink,
  Copy,
  Check,
  Search,
  BadgeCheck
} from "lucide-react"

// Guide sections data
const guideSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Home,
    color: "vale-blue-light",
    items: [
      { id: "rules", title: "Server Rules", badge: "Essential" },
      { id: "mods", title: "Allowed Mods" },
      { id: "joining", title: "Joining the Server", badge: "Start Here" }
    ]
  },
  {
    id: "server-features",
    title: "Server Features", 
    icon: Sparkles,
    color: "vale-green",
    items: [
      { id: "angel-chests", title: "Angel Chests" },
      { id: "armor-stands", title: "Armor Stands" },
      { id: "gsit", title: "GSit" },
      { id: "land-claims", title: "Land Claims" },
      { id: "live-maps", title: "Live Maps" },
      { id: "shops", title: "Shops and Economy" },
      { id: "player-stats", title: "Player Stats" },
      { id: "three-worlds", title: "Three Unique Worlds" },      
      { id: "tp-system", title: "TP System" },
      { id: "vanilla-tweaks", title: "Vanilla Tweaks" },      
      { id: "svc", title: "Voice Chat" }
    ]
  },
  {
    id: "donator-features",
    title: "Patron Features",
    icon: BadgeCheck,
    color: "vale-blue",
    items: [
      { id: "chat-feelings", title: "Chat Feelings" },
      { id: "image-frame", title: "Image Frame" },
      { id: "rh-sign-item", title: "Item Signing" },
      { id: "pp", title: "Player Particles" },
      { id: "patron-customisation", title: "Vale Patron Customisations" }
    ]
  },
  {
    id: "community",
    title: "Community",
    icon: Users,
    color: "vale-green-dark",
    items: [
      { id: "suggestions", title: "Suggestions" },
      { id: "donating", title: "Donating", badge: "Support" },
      { id: "collaboration", title: "Collaboration Projects" },
      { id: "towns", title: "Towns" }
    ]
  },
  {
    id: "technical",
    title: "Technical Bits",
    icon: Shield,
    color: "vale-blue-light",
    items: [
      { id: "redstone-bits", title: "Redstone / Farm Changes", badge: "Important" },
      { id: "server-specs", title: "Server Specs" }
    ]
  }
]

// Guide Content
const guideContent = {
  
// Getting Started Section

  "rules": {
    title: "Rules",
    content: `
# Server Rules
Please read and follow these rules to ensure everyone has a great time on ValeSMP :D

## Core Rules
### 1. Be Respectful
- Treat all players and staff with respect
- No harassment, discrimination, or hate speech
- No NSFW content or Gore

### 2. No Griefing
- Don't destroy or modify other players' builds without permission
- Don't steal from other players, regardless of claims
- Don't kill other players, their pets or their animals
- If you see a farm that isn't yours, do not mess with it

### 3. No Cheating
- No hacked clients, x-ray, or unfair advantages
- No exploiting bugs or glitches
- Ask staff if you're unsure about something, better to be safe
- Ignorance is not an excuse, you should have read these rules!

### 4. Build Responsibly
- Don't build too close to other players without permission, you will be relocated
- No inappropriate builds or offensive content, it will be removed without warning
- Don't completely ruin environments in the overworld, we have a resource server!

# Chat Rules
- **English Only**: Keep chat in English, for moderation
- **No Spam**: Don't repeat messages or use excessive caps
- **No Advertising**: Don't advertise other servers or Discord servers
- **Stay On Topic**: Use appropriate channels for different topics

# Land Claims
- **Claim Your Builds**: Always protect your builds with claims
- **Respect Claims**: Don't try to claim over or too close to others
- **Expand Gradually**: Don't claim massive areas you won't use

# Consequences
1. **First Offense**: Warning
2. **Second Offense**: Temporary mute
3. **Third Offense**: Temporary ban
4. **Further Offenses**: Permanent ban
5. **Severe Violations**: Permanent ban

*Staff have discretion to adjust punishments based on severity*

# Reporting Issues
If you see rule violations:
- Contact staff on Discord
- Submit a ticket via the appropriate channels
- Don't take matters into your own hands, please
`,
    lastUpdated: "22nd July 2025"
  },
  "mods": {
    title: "Allowed Mods",
    content: `
# Allowed Mods
We're pretty relaxed in regards to mods, as we appreciate everybody has their own way of playing the game, however this page aim's to just outline what the categorically *allowed* and *disallowed* mods are
Please note, this is **NOT** an exhaustive list, only for frequently used/asked mods. Just because you are using a mod not on this list, does *not* mean it's automatically then allowed. If you're concerned, just ask :)

## Allowed
- Litematica: easy place *is* allowed, but we don't allow litematica printer
- Freecam / CameraUtils style mods
- Item Scroller
- MiniHUD and other such HUD alteration mods
- Map mods such as Xaero's, JourneyMap etc.
- Inventory sorting mods (please mojang update the inventory management)
- Pretty much all optimisation/client side cosmetic mods as per the suggested mods below

##### Grey Areas
- Tweakeroo (way too many toggles to go through exhaustively, but we only allow ones found elsewhere and allowed such as autoclickers, hud changes etc. We **don't** allow obvious cheating game mechanics like lava visbility, mining speed, fly speed alterations etc.)

#### Not Allowed
- Anything altering game mechanics that we don't support in our server plugins / rules
- Any movement alteration mods like flying, move speed, water/lava movement, slowness blocking etc.
- X-ray, Baritone, and other such game hacks
- Resource packs akin to the above mentions, lava visbility etc.

# Suggested mods / modpack
Most of the people who play on Vale use [Prism Launcher](https://prismlauncher.org/), and some degree of [Fabulously Optimised](https://modrinth.com/modpack/fabulously-optimized) / other such modpacks. We do have a semi-regularly updated modpack of our own available through Modrinth linked [here](https://modrinth.com/) 
`,
    lastUpdated: "22nd July 2025"
  },
  "joining": {
    title: "Joining the Server",
    content: `
# Joining ValeSMP
Welcome to ValeSMP! Here's everything you need to know to get started on our server.

## Server Information
- **Server Address:** \`play.valesmp.com\`
- **Version:** 1.21.7 - Purpur
- **Type:** Semi-Vanilla Survival
- **Location:** Based in EU, ran by a UK team

## First Time Joining?
1. **Discord Application**: You'll need to get whitelisted to join, head over to the [discord](http://www.discord.gg/ut7KJgANkY) to get started
2. **Spawn Tutorial**: Check out our quick fire guide at spawn
3. **Find your forever home**: Hit /wild, and see where the game takes you 

## Getting Help
If you encounter any issues:
- Check out our quick command cheatsheet below
- Ask in #community-support on Discord, or submit a ticket for more assistance
- Contact a staff member in general or in game chat
`,
    lastUpdated: "22nd July 2025"
  },

// Server Features

  "angel-chests": {
    title: "Angel Chests",
    content: `
# Angel Chests
This our plugin for graves on the ValeSMP. I've used several throughout multiple servers, and this has always just felt the most suitable for the use case, so here we are

## Concept
For those unfamiliar with graves, or Angel Chests, the idea is: instead of your stuff being splurged all over the floor when you die, it goes into a miniature unbreakable "chest" that resembles your player head
Then, when you're ready to collect it, you right click the head, and it puts it all back where it was when you died (no re-equipping or resorting the inventory etc.)

## Vale Specific Settings
Every server does it different, but we have the following:
- 10 minutes timer before the chest breaks (then the additional vanilla 5 minutes, as it puts your items on the floor when breaking)
- Locked chests, meaning people cannot pick up your loot whilst you run back 
- Limited to 5, after which the oldest will break

## Getting Help
If you encounter any issues:
- Check if any staff are online to help you out
- Ask in #community-support on Discord, or submit a ticket for more assistance
- Try keep note of what you think you've lost, in the case of a bug / issue, in case an inventory rollback is permitted

## OPT OUT
By default, all players **will** have Angel Chests enabled. At the moment, we don't have an in game toggle for turning them off, but we can remove your permissions manually, so if for whatever reason you don't want Angel Chests anymore, please submit a ticket
`,
    lastUpdated: "24th July 2025"
  },
  "armor-stands": {
    title: "Armor Stands",
    content: `
# Armor Stands
A plugin enabling armor stand customisation
To get started, you just need to rename a piece of flint to ArmorStandTool, and right click

## Concept
For those unfamiliar with Armor Stand editing, there will be a video up here soon™ explaining the features more indepth
I personally recommend checking content by Hermitcraft youtubers such as [Xisuma](https://www.youtube.com/@xisumavoid), [ZombieCleo](https://www.youtube.com/@ZombieCleo) and [GoodTimeWithScar](https://www.youtube.com/@GoodTimesWithScar). I'm sure there are plenty others, but these are ones i'm personally familiar with :D 

## Vale Specific Settings
We do limit some features to donating ranks such as size, invulnerability and invisibility, just in an attempt to assist with the lag situation that armor stands pose
That said, if everybody uses them sparingly, and only where needed, we may be able to bring these features back into the domain of all players soon

## Getting Help
If you encounter any issues:
- Check if any staff are online to help you out
- Ask in #community-support on Discord, or submit a ticket for more assistance
- Don't keep moving / editing the armor stand, or adding more to try fix the issue
`,
    lastUpdated: "24th July 2025"
  },
  "gsit": {
    title: "GSit",
    content: `
# GSit
A simple plugin to allow sitting, laying, crawling and spinning

## Commands
\`/sit\`
\`/crawl\`
\`/lay\`
\`/spin\` *- only available to Patron members*

## Getting Help
If you encounter any issues:
- Check if any staff are online to help you out
- Ask in #community-support on Discord, or submit a ticket for more assistance
- Try relogging
`,
    lastUpdated: "24th July 2025"
  },
  "land-claims": {
    title: "Land Claims",
    content: `
# Land Claims
In depth guide to the Lands plugin, which we use for all claiming on ValeSMP

## Concept
The Land Claim plugin allows you to protect your land (and chests) more effectively, highlight your 'base' building area, and stop people from interacting / entering certain areas unless you specifically trust them
Claims aren't currently limited in terms of chunks, just in terms of seperate lands. That said, if this is abused then staff can unclaim your land without warning, so be sensible and don't go claiming half the server

## Commands
\`/lands create ExampleName\`- create a land called ExampleName, and claim the chunk you're stood in
\`/lands edit ExampleName\`- changes the selected land for editing to ExampleName
\`/lands claim radius 3\`- claims a radius of 3 chunks for the land you're currently editing
\`/lands unclaim radius 3\`- **un**claims a radius of 3 chunks for the land you're currently editing
\`/lands trust Player1\`- trust Player1 in the currently selected land
\`/lands untrust Player1\`- **un**trust Player1 in the selected land

\`/lands menu\` - open the lands menu of the land you've currently got selected, this will give a whole GUI with lots of various options for all of the above, as well as for toggling flags, areas etc.

## Vale Specific Settings
We do have a couple of things disabled for normal players in natural flags, but you'll find these out through playing, will be a little overwhelming to list it all. In essence the flags will just stop people turning off mobs etc. :) 

## Getting Help
If you encounter any issues:
- Check if any staff are online to help you out
- Ask in #community-support on Discord, or submit a ticket for more assistance
`,
    lastUpdated: "24th July 2025"
  },
  "live-maps": {
    title: "Live Maps",
    content: `
# Live Maps
Explore the ValeSMP worlds with our real-time interactive maps!

## Accessing the Maps
### Web Browser
- **Survival World**: [survival.valesmp.com](https://survival.valesmp.com)
- **Creative World**: [creative.valesmp.com](https://creative.valesmp.com)  
- **Resource World**: [resource.valesmp.com](https://resource.valesmp.com)
### In-Game Access
- Use \`/maps\` command for quick access

## Map Features
### Real-Time Updates
- Player locations shown in real-time
- New builds appear within minutes
- Claim boundaries and world border visible

### Interactive Controls
- Zoom in/out with scroll wheel
- Click and drag to pan around
- Switch between different viewing modes
- View co-ordinates

### Information Display
- Player names and locations
- Claim ownership information
- Coordinate display
- World spawn locations

## Map Layers
### Basic
- Default overworld view
- Shows terrain, builds, and players
- Best for general exploration

### Night View
- View light coverage in a night environment
- Nice way to find uninhabited areas based on torch placeage

### Flower Map
- Color-coded flower spawn information
- Plan flower gathering / farms
`,
    lastUpdated: "22nd July 2025"
  },
  "shops": {
    title: "Shops and Economy",
    content: `
# Player Shops and ValeSMP Economy
We use a plugin to enable shop creation on the main SMP server, to enable the creation of shops in our main shopping district at spawn 

## Concept
The general concept of our player formed economy is based around diamonds. We choose to use a diamonds > $ conversion, which currently translates to 1 diamond = $100. This way, it's easier for people to store their economy, and to also view how everybody else is doing using commands such as \`/baltop\`
To turn your diamonds into currency, or vice versa to turn your currency back into diamonds, just head to the market stall on your left when you use \`/warp shop\`

## Commands
\`/shop browse\`- lets you view all shops on the server
\`/shop create 100\`- turn the chest you are looking at into a shop chest, with the price set at $100, selling the item you are holding in your hand
\`/shop remove\`- turn the chest shop you are looking at back into a normal chest
\`/shop sell\`- changes the selected shop to sell mode
\`/shop buy\`- changes the selected shop to buy mode *(understand the risks first)*
\`/shop price\`- change the price of your shop
\`/shop item\`- change the item your shop is selling
\`/shop freeze\`- temporarily freeze your shop sales / purchases

## Getting Help
If you encounter any issues:
- Check if any staff are online to help you out
- Ask in #community-support on Discord, or submit a ticket for more assistance
- Don't keep doing whatever the problem is, it will only make the situ worse!
`,
    lastUpdated: "24th July 2025"
  },
  "player-stats": {
    title: "Player Stats",
    content: `
# Player Stats
We have custom plugins on each server to pool the stats from the public server and resource server together, and make them accessible outside of the game

## Concept
We run events, alongside having leaderboards for pretty much anything you can think of when it comes to in-game stats. If you find one we don't have, let us know!
Head [here](/stats) to check them out!
`,
    lastUpdated: "24th July 2025"
  },
  "three-worlds": {
    title: "Three Unique Worlds",
    content: `
# Three Unique Worlds
ValeSMP features three servers, with the ability to switch between them using \`/server [name]\`
Each has it's own purpose and gameplay style

## 🏡 Survival World \`/server smp\`
The main world where most players spend their time building communities and long-term projects
- **Purpose**: Permanent builds and towns, no resets planned, a true SMP experience
- **Protection**: Land claiming available
- **PvP**: Disabled in protected areas, unless chosen otherwise *(we see you PvP arenas)*
- **Resource Gathering**: Focused on just the essentials, don't ruin your friends garden!
- **Size**: 15k world border, growing with each new update (each way from spawn)

## ⛏️ Resource World \`/server resource\`
A renewable world that resets monthly for resource gathering and exploration
- **Purpose**: Mining and resource collection, grabbing structure based resources etc.
- **Reset Schedule**: First weekend of each month
- **Size**: 5k world border (each way from spawn)

## 🎨 Creative World \`/server creative\`
Unlimited resources for testing builds and creative expression
- **Purpose**: Building prototypes and creative projects
- **Plots**: Individual creative plots available, permissions management included
`,
    lastUpdated: "22nd July 2025"
  },
  "tp-system": {
    title: "TP System",
    content: `
# TP System
Using EssentialsX's warp, and tpa system, we are able to get people around the server nice and quick.

## Concept
This is particularly handy as we're a public server with a large map, and so people may not be super close to each other, like you'd see on servers like Hermitcraft
You can use the command system below to request to tp to somebody, tp them to you, or head to one of our several public warps

## Commands
\`/tpa Player1\`- request to tp to Player1
\`/tpahere Player1\`- request Player1 to tp to **you**
\`/tpaccept\`- accept an incoming tp or tphere request
\`/tpadeny\`- deny an incoming tp or tphere request
\`/warp ExampleName\`- lets you warp to the ExampleName warp

*note, warp's are only set by staff
if you feel that a project you've worked on should get a public warp, please submit a general support ticket to that effect and we will look into it :)*

## Getting Help
If you encounter any issues:
- Check if any staff are online to help you out
- Ask in #community-support on Discord, or submit a ticket for more assistance
- See if another player can tp you in, if you're facing issues, or if its walkable/flyable
`,
    lastUpdated: "24th July 2025"
  },
  "vanilla-tweaks": {
    title: "Vanilla Tweaks",
    content: `
# Vanilla Tweaks
For anybody familiar with the [Vanilla Tweaks](https://vanillatweaks.net/) website, they have several datapacks of use, that we employ on the server using a plugin version

## Datapacks we use
- **Anti Enderman Grief**: stops endermen picking up blocks, it's a stupid mechanic, we don't like it
- **Armored Elytra**: drop an elytra and chestplate onto an anvil with Q to get it linked, and drop the armored elytra onto a grindstone to unlink
- **Cauldron Concrete**: right click a water cauldron with concrete to harden it, nice QoL that assists the server by removing the need for laggier TNT based concrete farms
- **Collectible Budding Amethyst**: allows you to use silk touch on budding amethyst blocks to collect them, makes farming again much simpler and avoids laggy flying machine based farms
- **Custom Nether Portals**: currently set to allow crying obsidian nether portals, size between the default minimum 2x3 and the default maximum 23x23
- **Fast Leaf Decay**: slight delay intentionally set, but after 5 seconds, tree leaves will fast decay
- **Keep Small**: use a nametag named 'small' on a mob to keep it in its child form, or let it grow again using 'grow' *(please note this is a patron★ only cosmetic perk)*
- **Mini-Blocks**: put any block in a stoncutter to get 4 of it's 'mini' variant
- **More Mob Heads**: adds chance for any mob to drop its head upon killing it, along with an achievements page to track which mob heads you have
- **Painting Picker**: lets you use a stonecutter to choose the painting version
- **Player Head Drops**: players will drop their head when killed by another player
- **Silence Mobs**: make annoying mobs be quiet using a 'Silence Me' nametag
- **Track Raw Stats**: lets us track pretty much every stat in the game, for our Player Stats pages

## Crafting Packs we use 
- **Blackstone Cobblestone**: anything needing cobble, can use blackstone
- **Craftable Coral Blocks**: allows coral blocks to be crafted using their coral plant in a 2x2
- **Dropper to Dispenser**: allows you to convert a dropper to a dispenser using a bow
- **More Trapdoors**: all trapdoor recipes make 12 instead of 2
- **Universal Dyeing**: allows dying any dyeable block to another colour, regardless of current colour

## Getting Help
If you encounter any issues:
- Check if any staff are online to help you out
- Ask in #community-support on Discord, or submit a ticket for more assistance
`,
    lastUpdated: "24th July 2025"
  },
  "svc": {
    title: "Voice Chat",
    content: `
# Voice Chat
Another plugin straight from Hermitcraft, SVC is pretty much the staple for voice chat on servers these days. For more info on setting it up, i'd recommend checking out the mod page [here](https://modrinth.com/plugin/simple-voice-chat)

## Vale's Setup
Seeing as we run through a proxy server network, across our Survival, Resource and Creative worlds, you may notice some slight hiccups on SVC cross servers
This is something we're actively investigating, to see if we can support, but for the meantime single sever groups or discord may be better for those purposes :)

*(please note, all server rules and discord rules **do** also apply when conversing over SVC, and we do have monitoring tools in place to prevent abuse)*

## Getting Help
If you encounter any issues:
- Check if any staff are online to help you out
- Ask in #community-support on Discord, or submit a ticket for more assistance
`,
    lastUpdated: "24th July 2025"
  },
  "commands": {
    title: "Essential Commands",
    content: `
# Essential Commands

Here are the most important commands you'll need to know on ValeSMP.

## Teleportation Commands

- \`/spawn\` - Return to spawn
- \`/home [name]\` - Teleport to your home
- \`/sethome [name]\` - Set a new home location
- \`/delhome [name]\` - Delete a home
- \`/homes\` - List all your homes

## Player Interaction

- \`/tpa <player>\` - Request teleport to player
- \`/tpaccept\` - Accept teleport request
- \`/tpdeny\` - Deny teleport request
- \`/tpahere <player>\` - Request player teleport to you

## World Commands

- \`/survival\` - Go to Survival world
- \`/creative\` - Go to Creative world
- \`/resource\` - Go to Resource world

## Protection Commands

- \`/claim\` - Claim land where you stand
- \`/unclaim\` - Remove claim where you stand
- \`/trust <player>\` - Give player build access to your claims
- \`/untrust <player>\` - Remove player's build access

## Economy Commands

- \`/balance\` - Check your money
- \`/pay <player> <amount>\` - Send money to player
- \`/shop\` - Open server shop menu
- \`/ah\` - Open auction house

## Utility Commands

- \`/back\` - Return to your last location
- \`/suicide\` - Kill yourself (useful if stuck)
- \`/help\` - View all available commands
- \`/rules\` - Read server rules
`,
    lastUpdated: "22-07-2025"
  },
  
  // Patron Features

  "chat-feelings": {
    title: "Chat Feelings",
    content: `
# Chat Feelings *(patron and above)*
A plugin to allow you to mess around a little in chat by sharing emotes / actions relating to different emotions

## Different Commands
Way to many to list them all here, but check out their [plugin page](https://www.spigotmc.org/resources/chatfeelings.12987/) or use \`/feelings\` in game to check 'em all out
*(please note, all server rules and discord rules **do** also apply when using the feelings in game, they are actively monitored and staff have the ability to block your usage if abused)*

## Getting Help
If you encounter any issues:
- Check if any staff are online to help you out
- Ask in #community-support on Discord, or submit a ticket for more assistance
`,
    lastUpdated: "24th July 2025"
  },
  "image-frame": {
    title: "Image Frame",
    content: `
# Image Frame *(patron+ and above)*
A plugin to allow you to add custom photo's to the game in the form of maps, to be displayed in item frames

## Usage
This is not the easiest to use, and i have a tutorial video in the works to help, but please ask if you face any issues in the meantime
Best approach is as follows:
- Get your image, and upload it to imgur or discord to get either an imgur link or a cdn discord link to the image
- In game, make an area on a flat surface of choice using item frames, the size that you want your image to be (e.g. 2x2)
- Run the command \`/imageframe create ExampleName ExampleURL 2 2 combined\`
- Place the provided map/paper in the item frame, and voila!

Please note the example above is for creating an imageframe image with the name 'ExampleName', the url link being 'ExampleURL', height of 2, width of 2 
*(as with all plugins, server rules and discord rules **do** also apply when using the imageframes in game, they are actively monitored and staff have the ability to block your usage, temp ban or permanently ban you if abused)*

## Getting Help
If you encounter any issues:
- Check if any staff are online to help you out
- Ask in #community-support on Discord, or submit a ticket for more assistance
- Don't try to remake maps, it will use up your limit
`,
    lastUpdated: "24th July 2025"
  },
  "rh-sign-item": {
    title: "Image Frame",
    content: `
# Item Signing *(patron+ and above)*
A plugin to allow signing and renaming of items, without using an Anvil

## Usage
Best use case for this particular plugin is it's support of RGB colouring and other similar formatting on item names
Check out the text generator the team at [RGB Birdflop](https://www.birdflop.com/resources/rgb/) have put together, and make sure your colour format is set to \`&#rrggbb&l\`
Then it's quite literally as simple as \`/rename &#E43A96&lA&#F08579&lB&#FCD05C&lC\` when holding the item that you wish to rename *(where &#E43A96&lA&#F08579&lB&#FCD05C&lC is the text ouput RGB Birdflop provides)*
When it comes to signing, the same applies, but you can also choose to sign without giving a message

*(item names are still subject to filters, and will be caught in them as text messages in chat would. abuse of this tool will result in a ban)*

## Getting Help
If you encounter any issues:
- Check if any staff are online to help you out
- Ask in #community-support on Discord, or submit a ticket for more assistance
- Double check you have the permission for this command, as well as the correct colour format on RGB Birdflop's site
`,
    lastUpdated: "24th July 2025"
  },
  "pp": {
    title: "Player Particles",
    content: `
# Player Particles *(patron★ and above)*
Cosmetic plugin that allows vast customisation over different particle effects that surround, follow or exist near the player

## Usage
Use the command \`/pp\` in game to get the GUI menu for the plugin
It can feel a little overwhelming but to break it down the GUI for you:
- **Player Head**: overview of your particles, clickable to toggle viewing particles on and off
- **Blaze Powder**: manage your saved particles, create new ones
- **Chest**: manage your particles into groups, for easier toggling
- **Ender Chest**: load in premade particle groups (although we don't currently have any outside the defaults)
- **Firework**: edit the effect (think of this as what *particle* you want to be displayed)
- **Nether Star**: edit the style (think of this as how you want the particle to *appear*)
- **Book**: edit the data (think of this as a colour picker for colour based particles, or a block picker for block based particles. this one *wont* be available for every style or particle)

Ultimately if you see someones particles you like, ask 'em how they did it, we're all pretty friendly here :)

## Getting Help
If you encounter any issues:
- Check if any staff are online to help you out
- Ask in #community-support on Discord, or submit a ticket for more assistance
- If you are facing performance issues, please note that particles can cause these. Every rank has access to the /pp toggle option to toggle visibility, so if you don't want to see any for performance or other reasons, go ahead and toggle them off
`,
    lastUpdated: "24th July 2025"
  },
  "patron-customisation": {
    title: "Vale Patron Customisations",
    content: `
# Vale Patron Customisations *(patron and above)*
A Vale specific custom plugin to allow customisation of chat names, prefixes, and tab names for donating members of the Vale <3

## Usage
It's pretty standard to be honest with you, follows the patterns i'm sure you've all seen many times before:
- \`/nick\` will allow you to customise the name shown (i.e. my username is hxrry27, but i have my nick set to \`/nick harry\` to show as harry in game)
- \`/color\` will allow you to customise the colour of your name (check the patreon for full details)
- \`/prefix\` will allow you to customise the prefix colour or gradient before your name
  - *note that Patron★ has the ability to request a custom prefix, just either drop me a DM or send a support ticket in, and we will get that sorted ASAP for you*

## Getting Help
If you encounter any issues:
- Check if any staff are online to help you out
- Ask in #community-support on Discord, or submit a ticket for more assistance
- This is a plugin coded by me, so if there are issues let me know, I can *probably* fix them
`,
    lastUpdated: "24th July 2025"
  },
  // Community
  "suggestions": {
    title: "Suggestions",
    content: `
# Suggestions 
I founded this server with the sole intention of making a vanilla plus, community accessible and transparently ran server, for like minded people
This might be my passion project, but it doesn't mean i've thought of everything, and we love suggestions being sent through for the server, so head on over to the discord and pop something into the suggestions forum, it may just end up being implemented
`,
    lastUpdated: "24th July 2025"
  },
  "donating": {
    title: "Donating",
    content: `
# Donating
If you want to consider supporting ValeSMP and help with the running costs of the server, it's greatly appreciated <3 I'm currently solo funding this out my own pocket, and all donated money will go directly to the servers upkeep

## What does my donation go towards?
I try to be as transparent as possible on the costs of the server, so please always feel free to drop me a DM, or ask in chat. Your donations help cover:
- Server hosting costs
- Custom Plugin development
- Website maintenance

## Donation Tiers
- Patron - £3/month
- Patron+ - £5/month
- Patron★ - £10/month

## How to Donate
Visit our patreon: [ValeSMP Patreon](https://patreon.com/ValeSMP)
- Reccomended to **not** use the iOS app for Patreon
- Contact staff if you don't receive perks within 24 hours

## Donation Rules
- All benefits will be non PTW
- Benefits are non-transferable between accounts
- Server rules still apply to all donors, we don't treat you any different <3

## Transparency
We're committed to transparency:
- Monthly server costs: ~£70
- Excess donations go to server improvements, we may be able to upgrade soon :D
- Annual financial summary on costs posted on Discord every year
`,
    lastUpdated: "22nd July 2025"
  },
  "collaboration": {
    title: "Suggestions",
    content: `
# Collaborations 
If you ever want to organise a specific event, offer to assist with something, get involved with some Staff organised server events, keep an eye on the announcements channel in the discord, where any requests for partaking will be posted :)
Equally, we thoroughly encourage collaborations between people outside the staff events! Community events are great, showcase the awesome builders, redstoners, storytellers and more that we have here on ValeSMP`,
    lastUpdated: "24th July 2025"
  },
  "towns": {
    title: "Towns",
    content: `
# Towns
Creating and managing communities

## What are Towns?
Towns are player-created communities that often offer things such as:
- Shared resources and projects
- Protected group areas
- Community governance
- Shared goals and events

## Creating a Town
- We don't have any town specific plugins on this server, but if you want to create a town, or a settlement of some sort, you are still more than welcome to!
- Sharing lands access can be done using /Lands trust <user> and the /Lands menu management menu for specific permissions and area allowance
- Being in communities/towns does *not* exempt people from general server rules, nor does it allow cross group PvP without consent, or wars etc.

### Conflicts
- Contact staff for rule violations or if you feel the town isn't operating fairly
- Towns cannot claim over existing player claims
- Minimum 100 block distance between towns
- Note, we cannot monitor or act in relation to messages not in the server, so please use in game chats if you want us to assist with moderation

## Starting Your Own Town
Tips for new town founders:
- Plan your town layout before claiming
- Establish clear rules and expectations
- Create community projects to bring residents together
- Consider specializing in certain activities
- Be active and welcoming to new members
`,
    lastUpdated: "22nd July 2025"
  },
  
  // Technical Bits

  "redstone-bits": {
    title: "Redstone and Farm Changes",
    content: `
# Redstone and Farm Changes
Ultimately, many redstone things on the more technical side, may not work on this server, due to the fact it runs on [Purpur](https://purpurmc.org/) (a fork of [Paper](https://papermc.io/))

That said, as a technically minded minecraft player myself, i'm aware of the want / need to try emulate vanilla minecraft mechanics as much as possible for farms, and bonkers bedrock breaking projects, whilst maintaining the scalability of playerbase that paper provides from a TPS perspective

Our server properties are all available on the server's [Github](https://github.com/ValeSMP/Server-Properties), and we are always open to reviewing these if you have a project in mind. Please note, we can't always make the changes you / others may want, but we will review all requests and try to compromise what we can to ensure the player base gets the best experience possible

Below, i will link some videos and guides on adapting common youtube farms to work on paper, and other such relevant material, for those interested :)

Coming Soon™
`,
    lastUpdated: "22nd July 2025"
  },
  "server-specs": {
    title: "Server Specs",
    content: `
# Server Specs
For the time being our main SMP server specs are as follows, but we are hoping to update soon! Please feel free to check out our [Patreon](https://patreon.com/ValeSMP) to help us move towards the goal of upgrading our server hardware <3

**Hosting Location**: Western Europe
**CPU**: AMD Ryzen 7 Pro 8700GE
**RAM**: 64GB DDR5 ECC
**Storage**: 2x 1TB NVMe SSD's running RAID 1
**Connection**: Dedicated 1Gbps Ethernet

If you are experiencing any lag, check the #server-status channel in the info section on discord, any issues should be reported there. If not, then it may be a ping issue, which would likely be client side. This can be fixed through various methods including free VPN's, checking your routers settings and other such generic troubleshooting bits outside my scope!
`,
    lastUpdated: "24th July 2025"
  },
}

export default function GuidePage() {
  const [selectedSection, setSelectedSection] = useState("getting-started")
  const [selectedItem, setSelectedItem] = useState("rules")
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedCommand, setCopiedCommand] = useState("")

  const currentContent = guideContent[selectedItem as keyof typeof guideContent] || guideContent.rules

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(id)
    setTimeout(() => setCopiedCommand(""), 2000)
  }

  // Filter guide sections based on search
  const filteredSections = guideSections.map(section => ({
    ...section,
    items: section.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0)

  return (
    <main className="min-h-screen bg-[#0F1216]">
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-80 bg-[#161b22] border-r border-white/10 h-screen sticky top-0 overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <Link href="/">
                <Button variant="ghost" className="mb-4 text-vale-blue-light hover:bg-vale-blue/10">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              
              <h1 className="text-2xl font-bold mb-2 font-ranyth">
                <span className="bg-gradient-to-r from-vale-blue-light to-vale-green bg-clip-text text-transparent">
                  VALESMP GUIDE
                </span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Everything you need to know about our server
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search guide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d1117] border border-white/10 rounded-md pl-10 pr-4 py-2 text-sm focus:border-vale-blue-light focus:outline-none"
              />
            </div>

            {/* Navigation Sections */}
            <nav className="space-y-4">
              {filteredSections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => setSelectedSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      selectedSection === section.id 
                        ? 'bg-vale-blue-light/10 text-vale-blue-light' 
                        : 'hover:bg-white/5 text-muted-foreground'
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    <span className="font-ranyth">{section.title}</span>
                    <ChevronRight className={`h-4 w-4 ml-auto transition-transform ${
                      selectedSection === section.id ? 'rotate-90' : ''
                    }`} />
                  </button>
                  
                  {selectedSection === section.id && (
                    <div className="ml-8 mt-2 space-y-1">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSelectedItem(item.id)}
                          className={`w-full flex items-center justify-between p-2 text-sm rounded-md transition-colors text-left ${
                            selectedItem === item.id
                              ? 'bg-white/10 text-white'
                              : 'text-muted-foreground hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                item.badge === 'Essential' ? 'border-vale-green/50 text-vale-green' :
                                item.badge === 'Important' ? 'border-yellow-500/50 text-yellow-500' :
                                'border-vale-blue/50 text-vale-blue'
                              }`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="container mx-auto max-w-4xl px-8 py-12">
            {/* Content Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4 font-ranyth">
                {currentContent.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Last updated: {currentContent.lastUpdated}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-vale-blue-light hover:bg-vale-blue/10"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Suggest Changes
                </Button>
              </div>
            </div>

            {/* Content Body */}
            <div className="prose prose-invert max-w-none">
              <Card className="bg-[#161b22] border-white/10">
                <CardContent className="p-8">
                  <div 
                    className="leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{
                      __html: currentContent.content
                        // Split into lines and process each one
                        .split('\n')
                        .map(line => {
                          // Skip empty lines
                          if (line.trim() === '') return '<div class="h-4"></div>';
                          
                          // Main headings (# )
                          if (line.startsWith('# ')) {
                            return `<h1 class="text-2xl font-bold text-vale-blue-light font-ranyth mb-4 mt-6">${line.substring(2)}</h1>`;
                          }
                          
                          // Sub headings (## )
                          if (line.startsWith('## ')) {
                            return `<h2 class="text-xl font-semibold text-vale-green font-ranyth mb-3 mt-8">${line.substring(3)}</h2>`;
                          }
                          
                          // Small headings (### )
                          if (line.startsWith('### ')) {
                            return `<h3 class="text-lg font-medium text-vale-green font-ranyth mb-2 mt-6">${line.substring(4)}</h3>`;
                          }

                          // Red headings (#### )
                          if (line.startsWith('#### ')) {
                            return `<h2 class="text-xl font-semibold text-vale-red font-ranyth mb-3 mt-8">${line.substring(5)}</h2>`;
                          }

                          // Grey headings (##### )
                          if (line.startsWith('##### ')) {
                            return `<h2 class="text-xl font-semibold text-vale-grey font-ranyth mb-3 mt-8">${line.substring(5)}</h2>`;
                          }
                          
                          // Bullet points (- )
                          if (line.startsWith('- ')) {
                            return `<div class="flex items-start gap-2 mb-0"><div class="w-2 h-2 bg-vale-blue-light rounded-full mt-2.5 flex-shrink-0"></div><span>${line.substring(2)}</span></div>`;
                          }

                          // Sub-bullets (indented with spaces)
                          if (line.match(/^  - /)) {
                            return `<div class="flex items-start gap-2 mb-2 ml-6"><div class="w-1.5 h-1.5 bg-vale-green rounded-full mt-2.5 flex-shrink-0"></div><span>${line.substring(4)}</span></div>`;
                          }
                          
                          // Regular paragraph
                          return `<p class="mb-3">${line}</p>`;
                        })
                        .join('')
                        // Now apply inline formatting
                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-vale-blue-light hover:text-vale-blue font-semibold" target="_blank" rel="noopener noreferrer">$1</a>')
                        .replace(/`([^`]+)`/g, '<code class="bg-[#0d1117] text-vale-blue-light px-2 py-1 rounded text-sm font-mono">$1</code>')
                        .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
                        .replace(/\*([^*]+)\*/g, '<em class="text-vale-green">$1</em>')
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#161b22] border-white/10 hover:border-vale-blue/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-vale-blue-light font-ranyth">
                    <Map className="h-5 w-5" />
                    Explore Live Maps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    View real-time maps of all our worlds
                  </p>
                  <Link href="/maps">
                    <Button size="sm" className="bg-vale-blue-light hover:bg-vale-blue">
                      View Maps
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-[#161b22] border-white/10 hover:border-vale-green/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-vale-green font-ranyth">
                    <Users className="h-5 w-5" />
                    Join Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with other players on Discord
                  </p>
                  <Link href="https://discord.gg/ut7KJgANkY" target="_blank">
                    <Button size="sm" className="bg-vale-green hover:bg-vale-green-dark">
                      Join Discord
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Server Commands Reference */}
            <Card className="mt-12 bg-[#161b22] border-white/10">
              <CardHeader>
                <CardTitle className="text-vale-blue-light font-ranyth">Quick Command Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { cmd: "/spawn", desc: "return to spawn" },
                    { cmd: "/back", desc: "go back on death or tp" },
                    { cmd: "/tpa <player>", desc: "request teleport to a player" },
                    { cmd: "/tpaccept or /tpdeny", desc: "accept or deny teleport from a player" },
                    { cmd: "/map", desc: "get links to the maps" },
                    { cmd: "/guide", desc: "get a link back here!" },
                    { cmd: "/lands", desc: "use the claiming system" },
                    { cmd: "/server <name>", desc: "View all commands" }
                  ].map((command, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#0d1117] rounded-lg">
                      <div>
                        <code className="text-vale-blue-light font-mono text-sm">{command.cmd}</code>
                        <p className="text-xs text-muted-foreground">{command.desc}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(command.cmd, command.cmd)}
                        className="ml-2"
                      >
                        {copiedCommand === command.cmd ? 
                          <Check className="h-4 w-4 text-vale-green" /> : 
                          <Copy className="h-4 w-4" />
                        }
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}