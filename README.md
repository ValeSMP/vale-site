<div align="center">
  
  # 🌟 ValeSMP Website
  
  <p align="center">
    <strong>The official website for ValeSMP - A semi-vanilla Minecraft survival experience</strong>
  </p>
  
  <p align="center">
    <a href="https://valesmp.com">
      <img src="https://img.shields.io/badge/🌐_Website-valesmp.com-5E91CC?style=for-the-badge" alt="Website">
    </a>
    <a href="https://discord.gg/ut7KJgANkY">
      <img src="https://img.shields.io/badge/Discord-Join_Us-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Discord">
    </a>
    <a href="https://patreon.com/ValeSMP">
      <img src="https://img.shields.io/badge/Patreon-Support_Us-FF424D?style=for-the-badge&logo=patreon&logoColor=white" alt="Patreon">
    </a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-15.1-black?style=flat-square&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind">
    <img src="https://img.shields.io/badge/Minecraft-1.21.7-62B47A?style=flat-square&logo=minecraft&logoColor=white" alt="Minecraft Version">
    <img src="https://img.shields.io/badge/Status-Online-success?style=flat-square" alt="Status">
    <img src="https://img.shields.io/badge/Players-Lots-informational?style=flat-square" alt="Players">
  </p>
</div>

<br>

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🎮 Server Information](#-server-information)
- [🔧 Configuration](#-configuration)
- [📊 API Endpoints](#-api-endpoints)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [💖 Support](#-support)
- [🙏 Acknowledgments](#-acknowledgments)

## ✨ Features

### 🌐 Core Features
- 🗺️ **Live World Maps** - Real-time Pl3xmap integration
- 📊 **Player Statistics** - Stats tracking & leaderboards
- 📖 **Server Guide** - Comprehensive and up-to-date documentation for players
- 🎯 **Awards System** - 200+ achievement categories
- 👥 **Hall of Fame** - Top player rankings for stats
- 🌙 **Dark Mode** - Dark theme by default

### 🔧 Technical Features
- ⚡ **Next.js 15** - Latest React framework
- 🎨 **Tailwind CSS** - Utility-first styling
- 📱 **Fully Responsive** - Multi-OS compatible design
- 🚀 **Fast Performance** - Optimized builds
- 🐳 **Docker Ready** - Containerized deployment

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white) ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?logo=shadcnui&logoColor=white) |
| **Icons** | ![Lucide](https://img.shields.io/badge/Lucide-Icons-4A5568) |
| **Deployment** | ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white) |
| **Minecraft** | ![Purpur](https://img.shields.io/badge/Purpur-1.21.7-purple) ![Velocity](https://img.shields.io/badge/Velocity-Proxy-blue) |

</div>

## 📁 Project Structure

```
valesmp-website/
├── 📂 public/
│   ├── 🎨 cursors/         # Custom minecraft cursors
│   ├── 🔤 fonts/           # Ranyth custom fonts
│   ├── 🖼️ images/          # Static images
│   └── 📄 favicon.ico
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📄 layout.tsx    # Root layout
│   │   ├── 📄 page.tsx      # Homepage
│   │   ├── 📂 guide/        # Server guide
│   │   ├── 📂 maps/         # Live maps
│   │   ├── 📂 stats/        # Player statistics
│   │   ├── 📂 privacy/      # Privacy policy
│   │   ├── 📂 terms/        # Terms of use
│   │   └── 📂 api/
│   │       └── 📂 stats/    # Stats API
│   ├── 📂 components/
│   │   ├── 📂 ui/           # shadcn/ui components
│   │   └── 📄 *.tsx         # Custom components
│   └── 📂 lib/
│       └── 📄 minecraft-stats.js
├── 📄 tailwind.config.ts
├── 📄 next.config.ts
└── 📄 package.json
```

## 🎮 Server Information

<div align="center">

| Server | Address | Version | Description |
|--------|---------|---------|-------------|
| **Main Server** | `play.valesmp.com` | 1.21.7 | Velocity proxy endpoint |
| **Survival** | Internal | 1.21.7 | Main survival world |
| **Creative** | Internal | 1.21.7 | Creative plots |
| **Resource** | Internal | 1.21.7 | Monthly resetting world |

</div>

### 🗺️ Live Maps

- **Survival**: [survival.valesmp.com](https://survival.valesmp.com)
- **Creative**: [creative.valesmp.com](https://creative.valesmp.com)
- **Resource**: [resource.valesmp.com](https://resource.valesmp.com)

## 🔧 Configuration

### Custom Fonts

The site uses custom Minecraft-style fonts by [@em.il](https://emil.art/) located in `/public/fonts/`:
- `Ranyth_uppercase.ttf` - For headings
- `Ranyth_upperlower.ttf` - For mixed case text

## 📊 API Endpoints

### Stats API Proxy

All stats API calls are proxied through Next.js for security

### External APIs Used

- **Minecraft Server Status**: `https://api.mcsrvstat.us/2/play.valesmp.com`
- **Player Avatars**: `https://crafatar.com/avatars/:username`

## 🤝 Contributing

We love ideas for contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
6. If our staff team like it, we may just implement your feature :D

### Development Guidelines

- 🎯 Follow the existing code style
- 📝 Update documentation for new features
- ✅ Ensure all tests pass
- 🎨 Match the dark theme aesthetic
- 📱 Test responsive design

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Support

<div align="center">

### Love ValeSMP? Here's how you can support us:

<a href="https://patreon.com/ValeSMP">
  <img src="https://img.shields.io/badge/Become_a_Patron-FF424D?style=for-the-badge&logo=patreon&logoColor=white" alt="Patreon">
</a>

<a href="https://discord.gg/ut7KJgANkY">
  <img src="https://img.shields.io/badge/Join_our_Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Discord">
</a>

<a href="https://github.com/ValeSMP/website">
  <img src="https://img.shields.io/badge/Star_on_GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</a>

</div>

### Server Costs

Current monthly costs: **~£110**
- 🖥️ **Server Hosting**: Takes up the main chunk of that cost
- 🌐 **Domain & related IP**: Additional annual costs, difficult to accumulate into that cost, so we don't
- 💾 **Backup Storage**: Redundant backups

## 🙏 Acknowledgments

- **[Mojang Studios](https://mojang.com)** - For creating Minecraft
- **[PurpurMC](https://purpurmc.org)** - Fork of PaperMC
- **[Velocity](https://velocitypowered.com)** - PaperMC's Proxy software
- **[Next.js](https://nextjs.org)** - React framework
- **[shadcn/ui](https://ui.shadcn.com)** - UI components
- **Our Amazing Community** - For making ValeSMP special! 💚

---

<div align="center">
  <p>
    <strong>Made with ❤️ by the ValeSMP Team</strong>
  </p>
  <p>
    <a href="https://valesmp.com">Website</a> •
    <a href="https://discord.gg/ut7KJgANkY">Discord</a> •
    <a href="https://github.com/ValeSMP">GitHub</a> •
    <a href="https://patreon.com/ValeSMP">Patreon</a>
  </p>
</div>
