# BennCo Advisors - Assets Inventory

This document lists all images and assets that need to be migrated when moving to a new hosting provider.

## Overview

All assets are currently in the `/attached_assets` folder. These files are referenced in the code using the `@assets` import alias.

## Assets Location

**Current Location**: `/attached_assets/`  
**Production Build**: Assets are automatically bundled into `/server/public/assets/` during build  
**Total Files**: ~60 images and documents

## Critical Assets (Used in Application)

### Team Photos
- `Brian.jpg` - Brian Bennett photo
- `Taylor.jpg` - Taylor Willson photo  
- `Drew.jpg` - Drew photo
- `Marie.jpg` - Marie photo
- `Team.jpg` - Team photo

Alternative versions (older, may not be in use):
- `brian-bennett-final.jpg`
- `brian-bennett-new.jpeg`
- `brian-bennett-photo.jpg`
- `brian-bennett-v2.jpg`
- `taylor-willson-final.jpg`
- `taylor-willson-new-photo.jpeg`
- `taylor-willson-photo.jpeg`
- `taylor-willson-v2.jpg`

### Hero Images
- `retirement-fly-fishing-hero.png` - Retirement planning page hero
- `real-estate-1031-hero.png` - Real estate exchanges page hero
- `mountain-lake-about-hero.png` - About page hero
- `pexels-joetography-9043542-6438724.jpg` - Main hero image

### Background/Decorative Images
- `lake-beside-summer-mountains-rocky-and-green_1752173229962.jpg`
- `pexels-dion4photo-939479.jpg`
- `roland-mountains.svg` - SVG graphic

### Financial/Business Graphics
- `coin-stacks-final.png` - Investment imagery
- `coin-stacks-horizontal.png` - Investment imagery variant

### Logos/Branding
- `8AF5DAFF-0749-48E4-9493-21CBD760ACF1.png` - Logo/branding asset
- `Annotation+2020-07-01+172007-289w.png` - Logo variant

### Stock Photos (Content)
- `AdobeStock_200589695_Preview.jpeg`
- `AdobeStock_233840932_Preview.jpeg`
- `AdobeStock_331518623_Preview.jpeg`
- `10-Tips-to-be-a-Better-Fly-Fisher-The-Fly-Fishing-Basics-1024x682_1750267277945.jpg`
- `download.jpg`
- `images_1750267461791.jpg`
- `images-1_1750267497987.jpg`

## Documents/Data Files

### Excel Exports (Admin Data)
These are exported consultation data files - **NOT needed for deployment**:
- `BennCo Advisor Database_*.xlsx` (multiple versions)

### Development Notes
- `Pasted-I-d-like-you-to-scaffold-a-multipage-website-for-BennCo-Advisors-in-Replit-HTML-CSS-JS-that-ma-1748618780390.txt`

### Screenshots (Development/Testing)
**NOT needed for production** - these are development references:
- `Screenshot 2025-*.png` (multiple files)

## Migration Instructions

### Automatic Migration (Recommended)

When you run `npm run build`, Vite automatically:
1. Processes all imported assets from `attached_assets/`
2. Optimizes images
3. Copies to `/dist/assets/` with hashed filenames
4. Updates all import references in the code

**What you need to do:**
1. Keep the `attached_assets/` folder in your code
2. Run `npm run build` on your new hosting provider
3. The build process handles everything automatically

### Manual Migration (If Needed)

If you need to manually move assets:

1. **Copy the entire `/attached_assets` folder** to your new server
2. Ensure the folder structure remains the same
3. Keep all `@assets` imports in the code unchanged

### Files You Can Exclude

**Safe to delete before deployment:**
- All `Screenshot *.png` files (development only)
- `.txt` notes files
- Excel exports in `/exports` folder (unless you need the data)
- Duplicate/old versions of team photos

**Keep these:**
- All current hero images
- All current team photos
- Logo/branding assets
- Stock photos used in content

## Code References

Assets are imported in code using the `@assets` alias:

```typescript
// Example from vite.config.ts
resolve: {
  alias: {
    "@assets": path.resolve(__dirname, "attached_assets"),
  }
}
```

```tsx
// Example usage in components
import heroImage from '@assets/retirement-fly-fishing-hero.png';

<img src={heroImage} alt="Hero" />
```

## Build Output

After running `npm run build`, check `/dist/assets/` for:
- Optimized images with hashed filenames
- CSS files
- JavaScript bundles
- All assets are fingerprinted for cache busting

## Asset Optimization Tips

### Before Deploying:

1. **Compress Images** (optional but recommended)
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Target: JPG quality 80-85%, PNG optimized
   - Large images should be < 500KB

2. **Remove Unused Assets**
   - Delete old/duplicate team photos
   - Remove screenshots
   - Clean up unused stock photos

3. **Verify Asset Imports**
   - Make sure all images used in code exist
   - Check for broken import paths
   - Test build locally first

### Hosting Provider Storage

Most hosting providers include:
- **Render**: Assets bundled in deployment
- **DigitalOcean**: Assets in container
- **Heroku**: Assets in slug (max 500MB total)
- **GoDaddy VPS**: Unlimited (within disk space)

For very large asset libraries, consider:
- Cloudinary (image hosting CDN)
- AWS S3 + CloudFront
- Imgix

## CDN Recommendation (Optional)

For better performance, you can move images to a CDN:

1. Upload to Cloudinary/AWS S3
2. Update import paths to CDN URLs
3. Benefit: Faster load times, reduced server load

**Current setup works fine** - CDN is optional optimization.

## Checklist

When migrating:
- [ ] Copy entire `attached_assets/` folder with code
- [ ] Verify folder structure is preserved
- [ ] Run `npm run build` on new hosting
- [ ] Check `/dist/assets/` contains all processed assets
- [ ] Test website - verify all images load
- [ ] Delete screenshots and test files (optional)
- [ ] Consider image optimization (optional)
- [ ] Consider CDN setup (optional, advanced)

## File Size Summary

**Total attached_assets size**: ~50-100MB (estimated)  
**After build optimization**: ~30-50MB (estimated)  
**Well within limits** for all hosting providers

---

**Note**: Vite handles all asset processing automatically during build. You don't need to manually copy assets to dist/ - the build process does this for you.
