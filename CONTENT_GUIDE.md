# EBRTQ Content Management Guide

## 🎯 **Quick Content Updates**

### **✅ Current Admin Interface**
**URL:** `https://ebrtq.com/admin.html`
**Password:** `ebrtq2025`

The admin interface is fully functional with:
- ✅ **Real-time editing** with live preview
- ✅ **GitHub integration** for automatic deployment
- ✅ **Collapsible accordion** organization
- ✅ **Site settings management**
- ✅ **Resource CRUD operations**

## 📝 **Editing Resources**

### **Method 1: Admin Interface (Recommended)**
1. **Go to** `https://ebrtq.com/admin.html`
2. **Login** with password: `ebrtq2025`
3. **Find the resource** you want to edit
4. **Click on any field** to edit it:
   - `title`: Resource name
   - `url`: Link to the resource
   - `provider`: Organization name
   - `type`: Category (Mental Health, Healthcare, etc.)
   - `icon`: Visual icon
   - `color`: Visual color (blue, pink, purple, etc.)
5. **Click "Save Changes"**
6. **Site updates automatically** in 1-2 minutes

### **Method 2: Direct GitHub Editing**
1. **Open the JSON file:** `src/data/resources.json`
2. **Find the resource** you want to edit
3. **Update any field** directly in the JSON
4. **Save and commit** to GitHub
5. **Site updates automatically** in 1-2 minutes

## ➕ **Adding New Resources**

### **Admin Interface Method**
1. **Go to** `https://ebrtq.com/admin.html`
2. **Login** with password: `ebrtq2025`
3. **Click "Add Resource"** button
4. **Fill in all fields:**
   - **Title**: Resource name (required)
   - **URL**: Full URL starting with https:// (required)
   - **Provider**: Organization name (required)
   - **Type**: Select from dropdown (required)
   - **Icon**: Select from available options (required)
   - **Color**: Select from available options (required)
5. **Click "Save Changes"**
6. **Resource appears** on live site in 1-2 minutes

### **GitHub Direct Method**
Add a new object to the `resources` array in `src/data/resources.json`:

```json
{
  "id": "unique-identifier",
  "title": "New Resource Name",
  "url": "https://example.com",
  "provider": "Organization Name",
  "type": "Category",
  "icon": "IconName",
  "color": "blue"
}
```

**Example Resource Entry:**
```json
{
  "id": "13",
  "title": "LGBTQ+ Support Group",
  "url": "https://example.com/support",
  "provider": "Local Community Center",
  "type": "Mental Health",
  "icon": "Users",
  "color": "purple"
}
```

## 🗑️ **Deleting Resources**

### **Admin Interface Method**
1. **Go to** `https://ebrtq.com/admin.html`
2. **Login** with password: `ebrtq2025`
3. **Find the resource** to delete
4. **Click "Delete" button**
5. **Confirm deletion**
6. **Click "Save Changes"**
7. **Resource removed** from live site in 1-2 minutes

### **GitHub Direct Method**
1. **Edit** `src/data/resources.json`
2. **Find the resource** to delete
3. **Remove the entire object** from the resources array
4. **Save and commit** to GitHub
5. **Resource removed** from live site in 1-2 minutes

## ⚙️ **Site Settings Management**

### **Editable Settings**
- **Page Title**: Browser tab title
- **H1 Tag**: Main heading on the site
- **Tagline**: Subtitle under the main heading
- **Meta Description**: SEO description for search engines

### **How to Edit**
1. **Go to** `https://ebrtq.com/admin.html`
2. **Login** with password: `ebrtq2025`
3. **Click "Site Settings"** accordion
4. **Edit any field**:
   - Page Title: "EBRTQ - East Baton Rouge Trans & Queer Resources"
   - H1: "EBRTQ"
   - Tagline: "→ Connecting Our Community to Resources ←"
   - Meta Description: "Find LGBTQ+ resources, support groups, healthcare, crisis support, and community services in East Baton Rouge. Connecting our trans and queer community to vital resources."
5. **Click "Save Changes"**
6. **Settings update** on live site in 1-2 minutes

## 🎨 **Available Options**

### **Icons**
- **Heart**: Love, support, care
- **Home**: Housing, shelter, home services
- **Users**: Community, groups, social
- **Phone**: Crisis support, hotlines, contact
- **BookOpen**: Education, learning, resources
- **Activity**: Health, wellness, medical
- **Briefcase**: Legal services, employment, professional
- **GraduationCap**: Education, scholarships, academic
- **Shield**: Safety, protection, advocacy

### **Colors**
- **blue**: `#5BCEFA` - Trust, stability, professional
- **pink**: `#F5A9B8` - Care, support, community
- **white**: `#FFFFFF` - Neutral, clean, accessible
- **purple**: `#BB86FC` - Pride, creativity, community
- **magenta**: `#FF006E` - Energy, action, advocacy
- **cyan**: `#00F5FF` - Technology, innovation, modern
- **green**: `#39FF14` - Growth, success, positive

### **Resource Types**
- **Mental Health**: Counseling, therapy, support groups
- **Healthcare**: Medical services, hormone therapy, general health
- **Crisis Support**: Hotlines, emergency resources, immediate help
- **Legal Services**: Name changes, legal aid, rights information
- **Housing**: Housing assistance, shelter resources
- **Education**: Educational resources, scholarships, training
- **Employment**: Job resources, career services
- **Community**: Social groups, events, community building
- **Youth Services**: Resources specifically for young people
- **Advocacy**: Political action, rights advocacy, legislative tools

## 🔄 **Deployment Process**

### **Automatic Deployment**
1. **Edit content** in admin interface or GitHub
2. **Save changes** → Creates GitHub commit
3. **Vercel detects** the commit automatically
4. **Auto-deploys** in 1-2 minutes
5. **Live site updates** with new content

### **Manual Deployment (if needed)**
```bash
# Deploy to production
npm run deploy

# Check deployment status
vercel --prod
```

## 🛠️ **Technical Details**

### **Content Storage**
- **Primary file**: `src/data/resources.json`
- **GitHub sync**: Automatic via GitHub API
- **Admin interface**: Real-time editing with preview
- **Build process**: Vite copies JSON to build directory

### **Data Structure**
```json
{
  "resources": [
    {
      "id": "unique-identifier",
      "title": "Resource Name",
      "url": "https://example.com",
      "provider": "Organization",
      "type": "Category",
      "icon": "IconName",
      "color": "blue"
    }
  ],
  "siteSettings": {
    "pageTitle": "Site Title",
    "h1": "Main Heading",
    "tagline": "Subtitle",
    "metaDescription": "SEO Description"
  },
  "customTypes": []
}
```

## 🔧 **Troubleshooting**

### **Common Issues**

#### **"Admin page not loading"**
- ✅ Check URL: `https://ebrtq.com/admin.html`
- ✅ Try hard refresh (Ctrl+F5 or Cmd+Shift+R)
- ✅ Check browser console for errors
- ✅ Verify internet connection

#### **"Changes not saving"**
- ✅ Check password is correct: `ebrtq2025`
- ✅ Verify internet connection
- ✅ Check browser console for error messages
- ✅ Try again in a few minutes

#### **"Site not updating"**
- ✅ Wait 1-2 minutes for deployment
- ✅ Check Vercel dashboard for build status
- ✅ Try hard refresh on live site
- ✅ Check if changes were actually saved to GitHub

### **Content Issues**

#### **"Resource not appearing"**
- ✅ Check JSON syntax is valid
- ✅ Verify all required fields are filled
- ✅ Ensure URL starts with http:// or https://
- ✅ Check if resource was saved successfully

#### **"Icons not showing"**
- ✅ Verify icon name matches exactly (case-sensitive)
- ✅ Available icons: Heart, Home, Users, Phone, BookOpen, Activity, Briefcase, GraduationCap, Shield
- ✅ Check for typos in icon name

#### **"Colors not working"**
- ✅ Verify color name matches exactly
- ✅ Available colors: blue, pink, white, purple, magenta, cyan, green
- ✅ Check for typos in color name

### **JSON Syntax Issues**

#### **"Build failing"**
- ✅ Check JSON syntax in `src/data/resources.json`
- ✅ Verify all quotes, commas, and brackets are correct
- ✅ Use JSON validator to check syntax
- ✅ Check Vercel build logs for specific errors

#### **"Invalid JSON"**
- ✅ Ensure all strings are in double quotes
- ✅ Check for trailing commas
- ✅ Verify all brackets and braces are matched
- ✅ Use online JSON validator

## 📞 **Need Help?**

### **Self-Service Options**
- ✅ **Check this documentation** for common solutions
- ✅ **Use browser console** to check for errors
- ✅ **Test changes locally** with `npm run dev`
- ✅ **Check Vercel dashboard** for deployment status

### **Technical Support**
- ✅ **GitHub repository**: Check issues and commits
- ✅ **Vercel dashboard**: Monitor deployments and builds
- ✅ **Browser dev tools**: Debug client-side issues
- ✅ **Network tab**: Check API calls and responses

### **Content Questions**
- ✅ **Use preview mode** in admin interface
- ✅ **Test changes locally** before deploying
- ✅ **Check JSON syntax** with online validators
- ✅ **Verify all required fields** are completed

---

**Your EBRTQ resource site is now fully manageable!** 🏳️‍⚧️✨

**Last Updated:** January 2025
**Version:** 2.0 (with accordion functionality and enhanced UX)