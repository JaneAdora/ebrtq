# EBRTQ - East Baton Rouge Trans & Queer Resources

A modern, interactive resource directory for the LGBTQ+ community in East Baton Rouge, Louisiana. Built with React, TypeScript, and Vite, featuring a dynamic admin interface and collapsible resource organization.

## 🌟 **Live Site**
**URL:** [https://ebrtq.com](https://ebrtq.com)

## 🚀 **Quick Start**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📋 **Current Features**

### **🎯 Main Site Features**
- ✅ **Interactive fidget spinner logo** with 3D ring effects and smooth animations
- ✅ **Enhanced clickable area** (48px larger) for easier interaction
- ✅ **Directional spin control** - mouse/touch position determines spin direction
- ✅ **Text zoom animation** synchronized with logo spinning
- ✅ **Enhanced loading animations** with 3D ring effects for fidget spinner
- ✅ **Improved visual design** with better envelope icon and slick animations
- ✅ **Favicon and featured image assets** for better branding
- ✅ **Better header layout** with EBRTQ text positioned over circular logo
- ✅ **Enhanced contrast and spacing** for improved readability
- ✅ **Fixed footer text spacing** to prevent text squeezing
- ✅ **Dynamic resource loading** from GitHub
- ✅ **Dual view modes**: By Provider / By Resource Type
- ✅ **Collapsible accordion sections** with smooth animations
- ✅ **Interactive resource cards** with hover effects
- ✅ **Responsive design** for all screen sizes
- ✅ **Resource suggestion system** with animated contact link
- ✅ **Modern cyberpunk aesthetic** with neon colors and pixelated fonts
- ✅ **Page navigation system** with Resources/Events toggle
- ✅ **Events page functionality** with calendar events and expandable descriptions
- ✅ **Interactive glowing divider line** easter egg with fidget animation triggers
- ✅ **Calendar integration** with Google Calendar and iCal links
- ✅ **Enhanced resource organization** with alphabetical sorting and expandable descriptions

### **🔧 Admin Interface**
- ✅ **Password-protected admin panel** (`/admin.html`)
- ✅ **Real-time resource editing** with live preview
- ✅ **GitHub integration** for automatic content updates
- ✅ **Site settings management** (title, tagline, meta description)
- ✅ **Resource CRUD operations** (Create, Read, Update, Delete)
- ✅ **Accordion-style organization** for easy navigation
- ✅ **Security improvements** with removed password references from documentation

### **🚀 Recent Updates (January 2025)**
- ✅ **Interactive glowing divider line easter egg** between page toggle and view mode buttons
- ✅ **Page navigation system** with toggle between Resources and Events pages
- ✅ **Events page functionality** with calendar events, expandable descriptions, and calendar links
- ✅ **Enhanced resource organization** with alphabetical sorting and expandable descriptions
- ✅ **Calendar integration** with Google Calendar and iCal links for events
- ✅ **Improved visual hierarchy** with glowing divider line and better spacing
- ✅ **Enhanced touchscreen functionality** for fidget spinner interactions
- ✅ **Improved heart emoji colors** in footer for better visual consistency
- ✅ **Comprehensive fidget spinner functionality documentation**
- ✅ **Improved clickable area** with padding approach for better UX
- ✅ **Enhanced fidget spinner** with 3D ring effects and improved envelope icon

### **🎨 UI/UX Features**
- ✅ **Interactive fidget spinner logo** with 3D ring effects
- ✅ **Directional spin control** - mouse/touch position determines spin direction
- ✅ **Text zoom animation** synchronized with logo spinning
- ✅ **Enhanced clickable area** (48px larger) for easier interaction
- ✅ **Smooth animations** and transitions
- ✅ **Hover effects** on interactive elements
- ✅ **Color-coded resource categories**
- ✅ **Icon-based visual organization**
- ✅ **Mobile-responsive design**
- ✅ **Accessibility considerations**

## 🎮 **Interactive Fidget Spinner Logo**

The EBRTQ logo features an interactive fidget spinner with advanced animations:

### **How to Use:**
- **Hover/Touch**: Move your mouse or finger over the logo to start spinning
- **Direction Control**: Move left/right to change spin direction
- **Click/Tap**: Click or tap for a 3-second continuous spin
- **Text Animation**: The "EBRTQ" text zooms in sync with the logo

### **Technical Features:**
- **3D Ring Effects**: Multiple concentric rings with different colors
- **Smooth Animations**: 2-second spin cycles with directional control
- **Touch Support**: Full mobile and tablet compatibility
- **Enhanced Clickable Area**: 48px larger than visual logo for easier interaction
- **Synchronized Text**: H1 text zooms in harmony with logo spinning

## ✨ **New Interactive Features**

### **🎯 Page Navigation System**
- **Dual Page Toggle**: Switch between Resources and Events pages
- **Visual Indicators**: Active page highlighted with cyberpunk green glow
- **Smooth Transitions**: Seamless navigation with state management
- **URL Routing**: Browser history support with proper URL updates

### **📅 Events Page**
- **Calendar Events**: Display upcoming LGBTQ+ community events
- **Dual View Modes**: Organize by Month or by Organization
- **Expandable Descriptions**: Click to expand event details with "Read more" functionality
- **Calendar Integration**: Add events to Google Calendar or download iCal files
- **External Links**: Clickable date, title, time, and location for event details
- **Alphabetical Organization**: H2 headings sorted alphabetically for easy navigation
- **Chronological Sorting**: Events sorted by date within each section

### **🎨 Interactive Glowing Divider Line**
- **Hidden Easter Egg**: Glowing divider line between page toggle and view mode buttons
- **Fidget Animation Trigger**: Hover, click, or touch to activate logo spinning
- **Visual Feedback**: Line thickens and glows brighter during interaction
- **Direction Control**: Mouse/touch position determines logo spin direction
- **Smooth Transitions**: Same elegant spin-to-stop animation as main logo
- **Multi-Platform Support**: Works with mouse, touch, click, and hold interactions

### **📚 Enhanced Resources**
- **Expandable Descriptions**: Click to read full resource descriptions
- **Alphabetical Sorting**: Both H2 headings and content sorted alphabetically
- **Improved Organization**: Better visual hierarchy and spacing
- **Consistent Styling**: Unified design language across all pages

## 🏗️ **Architecture**

### **Frontend Stack**
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Custom CSS animations** for interactive elements

### **Backend & Deployment**
- **Vercel** for hosting and serverless functions
- **GitHub** for content storage and version control
- **GitHub API** for content management
- **Custom domain** with SSL

### **File Structure**
```
src/
├── components/
│   ├── Header.tsx          # Site header with dynamic content
│   ├── Footer.tsx          # Footer with attribution
│   ├── ResourceLink.tsx    # Individual resource cards
│   └── ui/                 # Reusable UI components
├── data/
│   └── resources.json      # Content data (auto-synced with GitHub)
└── App.tsx                 # Main application component

admin.html                  # Standalone admin interface
api/
└── save-content.ts        # Vercel serverless function for GitHub updates
```

## 📊 **Current Status**

### **✅ Completed Features**
- [x] Dynamic resource loading from GitHub
- [x] Collapsible accordion sections
- [x] Admin interface with GitHub integration
- [x] Responsive design and animations
- [x] Resource suggestion system
- [x] Site settings management
- [x] External link handling (same window)
- [x] Mobile optimization
- [x] Page navigation system (Resources/Events toggle)
- [x] Events page with calendar functionality
- [x] Interactive glowing divider line easter egg
- [x] Expandable resource descriptions
- [x] Calendar integration (Google Calendar + iCal)
- [x] Alphabetical and chronological sorting
- [x] Enhanced visual hierarchy and spacing

### **🔄 In Progress**
- [ ] Logo image integration (pending user assets)
- [ ] Favicon implementation (pending user assets)

### **📋 Pending Tasks**
- [ ] Add more resource categories
- [ ] Implement search functionality
- [ ] Add resource filtering by tags
- [ ] Create resource submission form
- [ ] Add analytics tracking
- [ ] Implement user feedback system

## 🛠️ **Development**

### **Local Development**
```bash
# Start dev server (usually http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Content Management**
- **Admin Interface**: `/admin.html` (password protected)
- **Direct GitHub**: Edit `src/data/resources.json`
- **Auto-deployment**: Changes deploy automatically via Vercel

### **Environment Variables**
- `GITHUB_TOKEN`: Required for admin interface GitHub integration
- Set in Vercel dashboard for production

## 🚀 **Deployment**

### **Automatic Deployment**
- **Trigger**: Push to `main` branch on GitHub
- **Platform**: Vercel
- **Domain**: `ebrtq.com`
- **Build time**: ~1-2 minutes

### **Manual Deployment**
```bash
# Deploy to production
npm run deploy

# Deploy preview
npm run deploy:preview
```

## 📝 **Content Management**

### **Adding Resources**
1. Go to `/admin.html`
2. Login with admin password
3. Add new resource in the interface
4. Save changes (auto-commits to GitHub)
5. Site updates automatically in 1-2 minutes

### **Editing Resources**
- Use the admin interface for visual editing
- Or edit `src/data/resources.json` directly
- All changes sync automatically

## 🔧 **Technical Details**

### **Build Process**
- **Vite** handles bundling and optimization
- **Custom build script** copies admin files
- **Tailwind CSS** for utility-first styling
- **TypeScript** for type safety

### **Performance**
- **Dynamic imports** for code splitting
- **Optimized images** and assets
- **Efficient state management**
- **Smooth animations** with CSS transitions

## 🐛 **Troubleshooting**

### **Common Issues**
- **Admin not loading**: Check authentication and network connection
- **Changes not saving**: Verify GitHub token is set
- **Build failures**: Check JSON syntax in resources.json
- **Deployment issues**: Check Vercel dashboard for logs

### **Debug Mode**
- Check browser console for errors
- Verify network requests in dev tools
- Test locally before deploying

## 📞 **Support**

### **Documentation**
- `CONTENT_MANAGEMENT.md` - Content editing guide
- `DEPLOYMENT.md` - Deployment instructions
- `CONTENT_GUIDE.md` - Resource management

### **Getting Help**
- Check existing documentation
- Review browser console for errors
- Test changes locally first
- Check Vercel build logs for deployment issues

---

**Built with ❤️ for the East Baton Rouge LGBTQ+ community** 🏳️‍⚧️✨