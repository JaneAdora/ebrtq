# EBRTQ Deployment Guide

## Quick Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from project directory:**
   ```bash
   vercel
   ```
   - Follow the prompts to link to your GitHub repo
   - Choose your domain or use Vercel's free subdomain

3. **Auto-deploy on every push:**
   - Push to your main branch
   - Vercel automatically builds and deploys

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"

## Content Management

### Updating Resources

1. **Edit the JSON file:**
   - Open `src/data/resources.json`
   - Update any resource information
   - Save and commit to GitHub

2. **Auto-deployment:**
   - Changes automatically deploy to your live site
   - Takes ~1-2 minutes to update

### Adding New Resources

Add new entries to the `resources` array in `src/data/resources.json`:

```json
{
  "id": "13",
  "title": "New Resource Name",
  "url": "https://example.com",
  "provider": "Provider Name",
  "type": "Resource Type",
  "icon": "IconName",
  "color": "blue"
}
```

**Available icons:** Heart, Home, Users, Phone, BookOpen, Activity, Briefcase, GraduationCap, Shield

**Available colors:** blue, pink, white, purple, magenta, cyan, green

### Custom Domain Setup

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS setup instructions

2. **DNS Configuration:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or A record pointing to Vercel's IP addresses

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Troubleshooting

- **Build fails:** Check that all JSON syntax is valid
- **Icons not showing:** Ensure icon names match exactly (case-sensitive)
- **Deployment issues:** Check Vercel build logs in dashboard
