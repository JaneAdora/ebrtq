# EBRTQ Deployment Guide

## 🚀 **Current Deployment Status**

### **✅ Live Site**
**URL:** [https://ebrtq.com](https://ebrtq.com)
**Status:** Fully deployed and functional
**Last Update:** January 2025

### **🔧 Deployment Architecture**
- **Platform**: Vercel
- **Source**: GitHub repository
- **Domain**: Custom domain with SSL
- **Auto-deployment**: Enabled on push to main branch
- **Build time**: ~1-2 minutes

## 📋 **Deployment Methods**

### **Method 1: Automatic Deployment (Recommended)**
**Trigger**: Push to `main` branch on GitHub
**Process**: 
1. Push changes to GitHub
2. Vercel detects the commit
3. Auto-builds and deploys
4. Live site updates in 1-2 minutes

```bash
# Standard workflow
git add .
git commit -m "Your changes"
git push origin main
# Vercel automatically deploys
```

### **Method 2: Manual Deployment**
**Use when**: Automatic deployment fails or needs manual trigger

```bash
# Deploy to production
npm run deploy

# Deploy preview version
npm run deploy:preview

# Check deployment status
vercel --prod
```

### **Method 3: Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Select your EBRTQ project
4. Click "Deploy" button
5. Monitor build logs

## 🏗️ **Build Process**

### **Build Configuration**
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Framework**: Vite
- **Node Version**: 18.x

### **Build Steps**
1. **Install dependencies**: `npm install`
2. **Build React app**: `vite build`
3. **Copy admin files**: `cp admin.html build/admin.html`
4. **Copy data files**: `mkdir -p build/src/data && cp src/data/resources.json build/src/data/`
5. **Deploy to Vercel**: Upload build directory

### **Build Scripts**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build && cp admin.html build/admin.html && mkdir -p build/src/data && cp src/data/resources.json build/src/data/",
    "preview": "vite preview",
    "deploy": "vercel --prod",
    "deploy:preview": "vercel"
  }
}
```

## 🔧 **Environment Variables**

### **Required Variables**
- **`GITHUB_TOKEN`**: GitHub personal access token for admin interface
- **Set in**: Vercel dashboard → Project Settings → Environment Variables

### **Setting Environment Variables**
1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add variable**:
   - Name: `GITHUB_TOKEN`
   - Value: Your GitHub personal access token
   - Environment: Production, Preview, Development
5. **Save and redeploy**

### **GitHub Token Setup**
1. **Go to GitHub Settings**
2. **Developer settings → Personal access tokens**
3. **Generate new token** with these permissions:
   - `repo` (Full control of private repositories)
   - `public_repo` (Access public repositories)
4. **Copy token** and add to Vercel

## 🌐 **Domain Configuration**

### **Current Domain Setup**
- **Primary**: `ebrtq.com`
- **Redirect**: `www.ebrtq.com` → `ebrtq.com`
- **SSL**: Automatic via Vercel
- **DNS**: Managed by domain provider

### **Domain Management**
1. **Vercel Dashboard** → Project Settings → Domains
2. **Add custom domain**: `ebrtq.com`
3. **Configure DNS** as instructed by Vercel
4. **SSL certificate** automatically provisioned

## 📊 **Deployment Monitoring**

### **Vercel Dashboard**
- **Deployments**: View all deployment history
- **Build Logs**: Check for build errors
- **Performance**: Monitor site performance
- **Analytics**: View visitor statistics

### **GitHub Integration**
- **Repository**: [github.com/JaneAdora/ebrtq](https://github.com/JaneAdora/ebrtq)
- **Auto-deployment**: Enabled on push to main
- **Branch protection**: Main branch is protected
- **Commit history**: Track all changes

## 🔄 **Content Deployment**

### **Content Update Flow**
1. **Edit content** in admin interface or GitHub
2. **Save changes** → Creates GitHub commit
3. **Vercel detects** the commit automatically
4. **Auto-deploys** in 1-2 minutes
5. **Live site updates** with new content

### **Admin Interface Deployment**
- **File**: `admin.html` (standalone HTML file)
- **Location**: Root directory
- **Build process**: Copied to `build/admin.html`
- **Access**: `https://ebrtq.com/admin.html`

### **Data Files Deployment**
- **Primary**: `src/data/resources.json`
- **Build process**: Copied to `build/src/data/resources.json`
- **Access**: `https://ebrtq.com/src/data/resources.json`
- **API integration**: Used by admin interface

## 🛠️ **Local Development**

### **Development Setup**
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Usually runs on http://localhost:3000

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Development Workflow**
1. **Make changes** locally
2. **Test with** `npm run dev`
3. **Build and test** with `npm run build`
4. **Commit and push** to GitHub
5. **Vercel auto-deploys** to production

## 🐛 **Troubleshooting Deployment**

### **Build Failures**

#### **"Build command failed"**
- ✅ Check `package.json` scripts are correct
- ✅ Verify all dependencies are installed
- ✅ Check for syntax errors in code
- ✅ Review Vercel build logs for specific errors

#### **"Module not found"**
- ✅ Check all imports are correct
- ✅ Verify file paths are accurate
- ✅ Ensure all dependencies are in `package.json`
- ✅ Check for typos in import statements

#### **"JSON syntax error"**
- ✅ Validate `src/data/resources.json` syntax
- ✅ Check for trailing commas
- ✅ Verify all quotes and brackets are matched
- ✅ Use online JSON validator

### **Deployment Issues**

#### **"Deployment not triggering"**
- ✅ Check if changes were pushed to GitHub
- ✅ Verify Vercel is connected to correct repository
- ✅ Check Vercel dashboard for deployment status
- ✅ Try manual deployment if needed

#### **"Site not updating"**
- ✅ Wait 1-2 minutes for deployment
- ✅ Check Vercel build logs for errors
- ✅ Try hard refresh on live site
- ✅ Verify changes were actually committed

#### **"Admin interface not working"**
- ✅ Check if `admin.html` was copied to build directory
- ✅ Verify GitHub token is set in Vercel
- ✅ Check browser console for errors
- ✅ Test admin interface locally first

### **Performance Issues**

#### **"Site loading slowly"**
- ✅ Check Vercel analytics for performance metrics
- ✅ Optimize images and assets
- ✅ Check for large dependencies
- ✅ Review build output size

#### **"Build taking too long"**
- ✅ Check Vercel build logs for bottlenecks
- ✅ Optimize build process
- ✅ Consider upgrading Vercel plan if needed
- ✅ Check for unnecessary dependencies

## 📈 **Performance Optimization**

### **Build Optimization**
- **Code splitting**: Automatic with Vite
- **Tree shaking**: Removes unused code
- **Asset optimization**: Images and CSS minified
- **Bundle analysis**: Check bundle size

### **Runtime Optimization**
- **Dynamic imports**: Load components on demand
- **Lazy loading**: Load resources when needed
- **Caching**: Vercel handles CDN caching
- **Compression**: Automatic gzip compression

## 🔒 **Security Considerations**

### **Admin Interface Security**
- **Password protection**: Simple but effective
- **GitHub token**: Secure API access
- **HTTPS only**: All traffic encrypted
- **No sensitive data**: All content is public

### **Deployment Security**
- **GitHub integration**: Secure repository access
- **Environment variables**: Secure token storage
- **SSL certificates**: Automatic HTTPS
- **Domain verification**: Prevents unauthorized deployments

## 📞 **Getting Help**

### **Vercel Support**
- **Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Community**: [vercel.com/community](https://vercel.com/community)
- **Support**: [vercel.com/support](https://vercel.com/support)

### **GitHub Support**
- **Documentation**: [docs.github.com](https://docs.github.com)
- **Community**: [github.community](https://github.community)
- **Support**: [support.github.com](https://support.github.com)

### **Project-Specific Issues**
- **Check build logs** in Vercel dashboard
- **Review GitHub commits** for changes
- **Test locally** with `npm run dev`
- **Check browser console** for client-side errors

---

**Your EBRTQ site is fully deployed and managed!** 🏳️‍⚧️✨

**Last Updated:** January 2025
**Version:** 2.0 (with enhanced deployment and monitoring)