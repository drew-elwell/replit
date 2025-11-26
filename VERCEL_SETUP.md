# Vercel Frontend Deployment Steps

## Your Backend URL
```
https://replit-e7mm.onrender.com
```

## Step 1: Push Latest Changes to GitHub

Your code has been prepared with `vercel.json` configuration.

## Step 2: Deploy to Vercel

1. Go to: https://vercel.com
2. Sign up or log in (use GitHub for fastest)
3. Click "Add New..." → "Project"
4. Import your GitHub repository: **drew-elwell/replit**
5. Select branch: **production**

## Step 3: Configure Build Settings

Vercel should auto-detect the settings, but verify:

- **Framework Preset**: Vite
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

## Step 4: Deploy!

Click "Deploy" and wait 2-3 minutes.

## Step 5: Test Your Live Site

Once deployed, you'll get a URL like:
```
https://your-project.vercel.app
```

Test:
- Homepage loads
- Navigation works
- Forms submit (check your backend logs on Render)
- Admin panel works

## Step 6: Connect Your Custom Domain

In Vercel Dashboard:
1. Go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `bennco.com`)
4. Follow DNS instructions to point to Vercel

## Architecture

```
User Browser
     ↓
Vercel (Frontend - React)
     ↓ API calls
Render (Backend - Express) https://replit-e7mm.onrender.com
     ↓ Database queries
Neon (Database - PostgreSQL)
```

## Notes

- Frontend and backend are separate deployments
- API calls from frontend are proxied through Vercel to your Render backend
- Both are using your single Neon database
- Cold starts: Render free tier spins down after 15 min of inactivity (30-60s to wake up)

## Troubleshooting

**Issue**: Forms don't work
- Check browser console for errors
- Verify backend is running: https://replit-e7mm.onrender.com/api/health
- Check Render logs

**Issue**: 404 on page refresh
- This is handled by `vercel.json` rewrite rules (already configured)

**Issue**: CORS errors
- Headers are configured in `vercel.json` (already done)

