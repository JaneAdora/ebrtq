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

### **🔧 Admin Interface**
- ✅ **Password-protected admin panel** (`/admin.html`)
- ✅ **Real-time resource editing** with live preview
- ✅ **GitHub integration** for automatic content updates
- ✅ **Site settings management** (title, tagline, meta description)
- ✅ **Resource CRUD operations** (Create, Read, Update, Delete)
- ✅ **Accordion-style organization** for easy navigation
- ✅ **Security improvements** with removed password references from documentation

### **🎨 UI/UX Features**
- ✅ **Smooth animations** and transitions
- ✅ **Hover effects** on interactive elements
- ✅ **Color-coded resource categories**
- ✅ **Icon-based visual organization**
- ✅ **Mobile-responsive design**
- ✅ **Accessibility considerations**

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