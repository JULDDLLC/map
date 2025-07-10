# Where's Panda? 🐼 - Interactive USA Map Adventure

A beautiful, interactive map application where kids and families can help Panda explore every corner of the United States! Pin your city, earn digital rewards, and watch as Panda travels from coast to coast collecting memories and making friends.

![Where's Panda Banner](https://via.placeholder.com/800x400/001c30/00fff0?text=Where%27s+Panda%3F+🐼)

## ✨ Features

- 🗺️ **Interactive USA Map** - Beautiful, responsive map with real-time pin visualization
- 📍 **City Pinning** - Add your city to help Panda's journey across America
- 🎁 **Instant Digital Rewards** - Download coloring sheets and digital postcards
- 🏆 **State Leaderboards** - See which states are leading Panda's adventure
- 📧 **Email Rewards** - Optional parent email for bonus digital content
- 🔒 **Privacy-First** - COPPA compliant with minimal data collection
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **Real-Time Updates** - Live ticker showing Panda's latest visits
- 🎨 **Beautiful Animations** - Smooth, engaging user experience

## 🛠️ Technologies Used

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion animations
- **UI Components**: shadcn/ui, Radix UI primitives
- **Database**: Supabase (PostgreSQL)
- **Maps**: react-simple-maps with TopoJSON
- **Icons**: Lucide React
- **Deployment**: Static export ready for any hosting platform

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, make sure you have the following installed on your computer:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A **Supabase account** - [Sign up free](https://supabase.com/)

### Step 1: Clone or Download the Project

If you have Git installed:
```bash
git clone <your-repository-url>
cd wheres-panda
```

Or download the project files and extract them to a folder.

### Step 2: Install Dependencies

Open your terminal/command prompt in the project folder and run:

```bash
npm install
```

This will download all the necessary packages for the project.

### Step 3: Set Up Supabase Database

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com/)
   - Click "Start your project"
   - Sign up or log in
   - Click "New Project"
   - Choose your organization and give your project a name
   - Set a strong database password
   - Choose a region close to you
   - Click "Create new project"

2. **Get Your API Keys**:
   - Once your project is created, go to **Settings** → **API**
   - Copy the **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - Copy the **anon public** key (starts with `eyJ...`)

3. **Set Up the Database**:
   - Go to **SQL Editor** in your Supabase dashboard
   - Copy the contents of `supabase/migrations/20250709175549_broad_shape.sql`
   - Paste it into the SQL editor and click "Run"
   - This creates the `pins` table and sets up security policies

### Step 4: Configure Environment Variables

**Option A: Direct in package.json (Recommended for Development)**

Since you're experiencing issues with `.env.local` files being removed, we'll embed the environment variables directly in the development script:

1. Open `package.json`
2. Find the `"dev"` script in the `"scripts"` section
3. Replace it with:

```json
"dev": "NEXT_PUBLIC_SUPABASE_URL=your_project_url NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key next dev"
```

Replace:
- `your_project_url` with your actual Supabase Project URL
- `your_anon_key` with your actual Supabase anon key

**Example:**
```json
"dev": "NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... next dev"
```

**Option B: Using .env.local (Standard Method)**

If you prefer the standard approach:

1. Create a file named `.env.local` in the root directory (same level as `package.json`)
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 5: Start the Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application!

## 📁 Project Structure

```
wheres-panda/
├── app/                    # Next.js 13 app directory
│   ├── admin/             # Admin dashboard
│   ├── privacy/           # Privacy policy page
│   ├── terms/             # Terms of service page
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout with metadata
│   ├── not-found.tsx      # Custom 404 page
│   └── page.tsx           # Main homepage
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── CustomCursor.tsx  # Custom animated cursor
│   ├── InteractiveMap.tsx # Main map component
│   ├── Leaderboard.tsx   # State rankings
│   ├── PandaMascot.tsx   # Animated panda mascot
│   ├── PinForm.tsx       # City submission form
│   ├── RewardModal.tsx   # Reward download modal
│   └── Ticker.tsx        # Live updates ticker
├── lib/                  # Utility functions
│   ├── supabase.ts       # Database client setup
│   └── utils.ts          # Helper functions
├── supabase/
│   └── migrations/       # Database schema
├── public/               # Static assets
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🎮 How to Use

1. **View the Map**: See Panda's current journey across the USA
2. **Add Your Pin**: Fill out the form with your nickname, city, and state
3. **Get Rewards**: Download your instant coloring sheet reward
4. **Check Leaderboard**: See how your state ranks in Panda's adventure
5. **Watch Updates**: The ticker shows real-time updates of new pins

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🚀 Deployment

This project is configured for static export and can be deployed to any hosting platform:

### Netlify/Vercel (Recommended)
1. Connect your repository
2. Set environment variables in the hosting platform's dashboard
3. Deploy automatically on push

### Manual Static Export
```bash
npm run build
```
The `out/` folder contains the static files ready for deployment.

## 🔒 Privacy & Security

- **COPPA Compliant**: Designed for children with parental consent
- **Minimal Data Collection**: Only nickname, city, state, and optional parent email
- **No Tracking**: No cookies, analytics, or third-party trackers
- **Secure Database**: Row Level Security (RLS) enabled
- **Content Moderation**: Built-in profanity filtering

## 🛠️ Customization

### Adding New States/Regions
Edit the `stateCoordinates` object in `components/InteractiveMap.tsx`

### Modifying Rewards
Update the reward generation logic in `components/RewardModal.tsx`

### Styling Changes
- Global styles: `app/globals.css`
- Component styles: Individual component files
- Theme colors: `tailwind.config.ts`

## 🐛 Troubleshooting

### Common Issues

**1. Supabase Connection Error**
- Verify your environment variables are correct
- Check that your Supabase project is active
- Ensure the database migration has been run

**2. Map Not Loading**
- Check browser console for JavaScript errors
- Verify internet connection for map data

**3. Environment Variables Not Working**
- Try the package.json method if .env.local is being removed
- Restart the development server after changes
- Check for typos in variable names

**4. Build Errors**
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors in the terminal

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify all setup steps were completed
3. Ensure your Supabase project is properly configured
4. Check that all environment variables are set correctly

## 📄 License

This project is created by JULDD Media. All rights reserved.

## 🤝 Contributing

This is a proprietary project by JULDD Media. For questions or support, please contact through [julddmedia.com](https://julddmedia.com).

---

**Made with ❤️ by JULDD Media**

*Help Panda explore every corner of America, one pin at a time!* 🐼🗺️