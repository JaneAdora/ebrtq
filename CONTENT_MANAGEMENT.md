# 📝 EBRTQ Content Management Guide

## 🎯 **Content Editing Options**

### **Option 1: React Admin Interface (Recommended)**
**URL:** `https://ebrtq.com/admin-react.html`
- ✅ **Modern interface** with real-time preview
- ✅ **Form-based editing** - no code required
- ✅ **Live preview** of changes
- ✅ **Password protected**
- ✅ **Auto-saves** to GitHub

### **Option 2: Simple HTML Admin**
**URL:** `https://ebrtq.com/admin.html`
- ✅ **Basic interface** for quick edits
- ✅ **No dependencies** - works anywhere
- ✅ **Password protected**

### **Option 3: Direct GitHub Editing**
**URL:** [github.com/JaneAdora/ebrtq/src/data/resources.json](https://github.com/JaneAdora/ebrtq/src/data/resources.json)
- ✅ **Direct file editing**
- ✅ **Version control**
- ✅ **Auto-deployment**

## 🔐 **Authentication**

**Current Password:** `ebrtq2025`
**Change this in the code for security!**

## 📋 **Resource Fields**

Each resource has these fields:

| Field | Description | Options |
|-------|-------------|---------|
| **Title** | Resource name | Free text |
| **URL** | Link to resource | Full URL (https://...) |
| **Provider** | Organization name | Free text |
| **Type** | Category | Mental Health, Healthcare, Crisis Support, Legal Services, Housing, Education, Employment, Community, Youth Services |
| **Icon** | Visual icon | Heart, Home, Users, Phone, BookOpen, Activity, Briefcase, GraduationCap, Shield |
| **Color** | Visual color | blue, pink, white, purple, magenta, cyan, green |

## 🚀 **Adding New Resources**

1. **Go to admin interface**
2. **Click "Add Resource"**
3. **Fill in all fields**
4. **Click "Save Changes"**
5. **Site updates automatically in 1-2 minutes**

## ✏️ **Editing Existing Resources**

1. **Go to admin interface**
2. **Find the resource to edit**
3. **Update any field**
4. **Click "Save Changes"**

## 🗑️ **Deleting Resources**

1. **Go to admin interface**
2. **Find the resource to delete**
3. **Click "Delete" button**
4. **Confirm deletion**
5. **Click "Save Changes"**

## 🔄 **Deployment Process**

1. **Edit content** in admin interface
2. **Save changes** → Creates GitHub commit
3. **Vercel detects** the commit
4. **Auto-deploys** in 1-2 minutes
5. **Live site updates** automatically

## 🛠️ **Technical Details**

- **Content stored in:** `src/data/resources.json`
- **Auto-deployment:** GitHub → Vercel
- **Build process:** Vite + custom build script
- **Admin interface:** React + Tailwind CSS

## 🔧 **Troubleshooting**

### **Admin page not loading?**
- Check if you're using the correct URL
- Try hard refresh (Ctrl+F5)
- Check browser console for errors

### **Changes not saving?**
- Check internet connection
- Verify password is correct
- Try again in a few minutes

### **Site not updating?**
- Wait 1-2 minutes for deployment
- Check Vercel dashboard for build status
- Try hard refresh

## 📞 **Need Help?**

- **Technical issues:** Check browser console
- **Content questions:** Use the preview mode
- **Deployment issues:** Check Vercel dashboard

---

**Your EBRTQ resource site is now fully manageable!** 🏳️‍⚧️✨
