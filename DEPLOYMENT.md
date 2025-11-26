# BennCo Advisors - Deployment Guide

## Architecture

This is a split deployment:
- **Frontend (React)**: Vercel
- **Backend (Express API)**: Render.com
- **Database (PostgreSQL)**: Neon.tech

## Deployment Steps

### 1. Backend Deployment (Render.com)

1. Push this code to GitHub
2. Go to https://dashboard.render.com
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Render will auto-detect `render.yaml` configuration
6. Add environment variables:
   - `DATABASE_URL`: Your Neon connection string
   - `SENDGRID_API_KEY`: Your SendGrid API key (optional for development)
7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. Copy your backend URL (e.g., `https://bennco-advisors-api.onrender.com`)

### 2. Frontend Deployment (Vercel)

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
5. Add environment variable:
   - `VITE_API_URL`: Your Render backend URL
6. Deploy!

### 3. Connect Your Domain

In your domain registrar (GoDaddy, etc.):
- Point A record to Vercel's IP
- Or use CNAME to your Vercel URL

## Environment Variables

### Backend (Render.com)
```
DATABASE_URL=postgresql://...
SENDGRID_API_KEY=SG....
NODE_ENV=production
PORT=10000
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com
```

## Monitoring

- Backend health: `https://your-backend.onrender.com/api/health`
- Frontend: Your Vercel URL

## Costs

- Render.com: FREE (with cold starts after inactivity)
- Vercel: FREE
- Neon Database: FREE tier
- **Total: $0/month**

