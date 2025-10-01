# EBRTQ Content Management Guide

## Quick Content Updates

### Editing Resources

1. **Open the JSON file:** `src/data/resources.json`
2. **Find the resource you want to edit**
3. **Update any field:**
   - `title`: Resource name
   - `url`: Link to the resource
   - `provider`: Organization name
   - `type`: Category (Mental Health, Healthcare, etc.)
   - `color`: Visual color (blue, pink, purple, etc.)

4. **Save and commit to GitHub**
5. **Site updates automatically in 1-2 minutes**

### Adding New Resources

Add a new object to the `resources` array:

```json
{
  "id": "13",
  "title": "New Resource Name",
  "url": "https://example.com",
  "provider": "Organization Name",
  "type": "Category",
  "icon": "IconName",
  "color": "blue"
}
```

### Available Options

**Icons:** Heart, Home, Users, Phone, BookOpen, Activity, Briefcase, GraduationCap, Shield

**Colors:** blue, pink, white, purple, magenta, cyan, green

**Common Types:** Mental Health, Healthcare, Crisis Support, Legal Services, Housing, Education, Employment, Community, Youth Services

### Example Resource Entry

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

## GitHub Editing (No Code Required)

1. Go to your GitHub repository
2. Navigate to `src/data/resources.json`
3. Click the pencil icon to edit
4. Make your changes
5. Scroll down and click "Commit changes"
6. Your site will update automatically!

## Troubleshooting

- **JSON Syntax:** Make sure all quotes, commas, and brackets are correct
- **Icon Names:** Must match exactly (case-sensitive)
- **Color Names:** Must be one of the predefined options
- **URLs:** Should start with `http://` or `https://`

## Need Help?

- Check the JSON syntax with an online validator
- Test locally with `npm run dev`
- Check Vercel build logs if deployment fails
