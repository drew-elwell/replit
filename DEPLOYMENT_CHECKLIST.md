# BennCo Advisors - Deployment Checklist

Use this checklist when exporting and deploying your website to a new hosting provider.

## Phase 1: Pre-Export Preparation

- [ ] **Backup Current Data**
  - Export current database (if you have data in Replit)
  - Download any files from Replit storage
  - Save a copy of environment variables

- [ ] **Test Locally**
  - Run `npm run build` to ensure build works
  - Test the built version with `npm start`
  - Verify all forms submit correctly
  - Check email functionality

## Phase 2: Export Files

- [ ] **Download Code from Replit**
  - Click three dots (⋮) in Files panel
  - Select "Download as zip"
  - Extract to your local machine

- [ ] **Remove Replit-Specific Files** (optional cleanup)
  - Delete `.replit` file
  - Delete `replit.nix` file  
  - Delete `.config` folder (if present)
  - Delete `replit.md` file (Replit-specific documentation)

- [ ] **Prepare Version Control** (if using Git)
  - Initialize git: `git init`
  - Add all files: `git add .`
  - Commit: `git commit -m "Initial export from Replit"`
  - Push to GitHub/GitLab if needed

## Phase 3: Set Up External Services

### PostgreSQL Database

- [ ] **Choose Database Provider**
  - [ ] Neon (https://neon.tech) - Recommended, free tier
  - [ ] Supabase (https://supabase.com)
  - [ ] ElephantSQL (https://elephantsql.com)
  - [ ] DigitalOcean Managed Database
  - [ ] AWS RDS (enterprise)

- [ ] **Create Database**
  - Sign up for chosen provider
  - Create new PostgreSQL database
  - Save connection string (DATABASE_URL)
  - Note: Keep credentials secure!

### Email Service (SendGrid)

- [ ] **Set Up SendGrid**
  - Create account at https://sendgrid.com
  - Verify email address
  - Create API key with "Mail Send" permission
  - Save API key (starts with "SG.")

## Phase 4: Choose and Configure Hosting

### Option A: Render.com (Recommended)

- [ ] Create account at https://render.com
- [ ] Connect GitHub repository (or upload manually)
- [ ] Create "Web Service"
- [ ] Configure service:
  - **Name**: bennco-advisors
  - **Environment**: Node
  - **Build Command**: `npm install && npm run build`
  - **Start Command**: `npm start`
  - **Region**: Choose closest to your users
- [ ] Add environment variables (see Phase 5)
- [ ] Deploy

### Option B: DigitalOcean App Platform

- [ ] Create account at https://digitalocean.com
- [ ] Create new App
- [ ] Connect repository or upload code
- [ ] Configure:
  - **Build Command**: `npm run build`
  - **Run Command**: `npm start`
  - **HTTP Port**: 5000
- [ ] Add environment variables
- [ ] Deploy

### Option C: Heroku

- [ ] Install Heroku CLI
- [ ] Run `heroku login`
- [ ] Run `heroku create your-app-name`
- [ ] Add environment variables (see Phase 5)
- [ ] Deploy: `git push heroku main`

### Option D: GoDaddy VPS (Advanced)

⚠️ **Important**: GoDaddy shared hosting does NOT support Node.js. You need:
- VPS (Virtual Private Server) plan
- SSH access
- Ability to install Node.js

- [ ] Order VPS plan from GoDaddy
- [ ] Access server via SSH
- [ ] Install Node.js 18 or higher
- [ ] Install PostgreSQL or use external database
- [ ] Upload code via FTP/SFTP or Git
- [ ] Install dependencies: `npm install`
- [ ] Build application: `npm run build`
- [ ] Set up process manager (PM2 recommended)
- [ ] Configure reverse proxy (Nginx or Apache)
- [ ] Set up SSL certificate (Let's Encrypt)

## Phase 5: Configure Environment Variables

Set these on your hosting provider's dashboard:

```bash
DATABASE_URL=postgresql://username:password@host:port/database
SENDGRID_API_KEY=SG.your_actual_api_key
NODE_ENV=production
PORT=5000
```

**Where to set them:**
- **Render**: Dashboard → Environment → Add Environment Variables
- **DigitalOcean**: App Settings → App-Level Environment Variables
- **Heroku**: Settings → Config Vars OR `heroku config:set`
- **GoDaddy VPS**: Create `.env` file in project root (secure permissions!)

## Phase 6: Database Setup

- [ ] **Run Database Migration**
  
  After deployment, run this command on your hosting platform:
  ```bash
  npm run db:push
  ```
  
  **How to run:**
  - **Render**: Not needed, runs automatically during build
  - **Heroku**: `heroku run npm run db:push`
  - **DigitalOcean**: Use console in dashboard
  - **GoDaddy VPS**: SSH into server and run command

- [ ] **Verify Tables Created**
  - Check your database provider dashboard
  - Should see tables: `consultation_responses`, `availability_submissions`

- [ ] **Import Existing Data** (if applicable)
  - Use database provider's import tool
  - Or run SQL script provided

## Phase 7: Domain Configuration

### If Using GoDaddy Domain:

- [ ] Log into GoDaddy
- [ ] Go to My Products → DNS Management
- [ ] Update DNS records:

**For platforms with IP address (DigitalOcean, VPS):**
```
Type: A
Name: @
Value: [Your server IP]
TTL: 600
```

**For platforms with URL (Render, Heroku):**
```
Type: CNAME
Name: www
Value: [your-app.onrender.com or similar]
TTL: 600
```

- [ ] Wait for DNS propagation (up to 48 hours, usually 30 minutes)
- [ ] Configure custom domain in hosting platform settings

## Phase 8: Testing

- [ ] **Visit Your New URL**
- [ ] **Test All Pages**
  - [ ] Home page loads
  - [ ] About page
  - [ ] Services pages (Investment, Retirement, Estate, Real Estate)
  - [ ] Team bios
  - [ ] Contact page
  - [ ] Admin panel

- [ ] **Test Forms**
  - [ ] Submit consultation request
  - [ ] Check email received
  - [ ] Submit availability form
  - [ ] Verify data in admin panel

- [ ] **Test on Mobile**
  - Check responsive design
  - Test forms on mobile

- [ ] **Performance Check**
  - Page load speed
  - Images loading correctly
  - No console errors

## Phase 9: Post-Deployment

- [ ] **Set Up Monitoring**
  - Most platforms provide built-in monitoring
  - Check uptime and performance metrics

- [ ] **SSL Certificate**
  - Verify HTTPS is working
  - Most platforms provide free SSL automatically

- [ ] **Backups**
  - Database: Enable automatic backups
  - Code: Keep Git repository updated

- [ ] **Update Documentation**
  - Note new deployment URL
  - Document any custom configuration
  - Save credentials securely

## Troubleshooting

### Build Fails
- Check Node.js version (needs 18+)
- Verify all dependencies in package.json
- Check build logs for specific errors

### App Won't Start
- Verify all environment variables are set
- Check DATABASE_URL format is correct
- Review application logs

### Database Connection Errors
- Confirm DATABASE_URL is correct
- Check database allows connections from your host's IP
- Verify database actually exists

### Emails Not Sending
- Verify SENDGRID_API_KEY is correct and starts with "SG."
- Check API key has "Mail Send" permissions
- Review SendGrid dashboard for blocked emails

### Domain Not Working
- Wait for DNS propagation (can take up to 48 hours)
- Use DNS checker: https://dnschecker.org
- Verify DNS records are correct

## Cost Breakdown

**Minimum Cost (Free Tier):**
- Database: Neon free tier
- Hosting: Render free tier
- Email: SendGrid free (100 emails/day)
- **Total: $0/month**

**Recommended Production Setup:**
- Database: Neon Pro ($19/month)
- Hosting: Render Starter ($7/month)
- Email: SendGrid Essentials ($15/month for 50k emails)
- Domain: Already owned
- **Total: ~$40-50/month**

## Support Resources

- **Render**: https://render.com/docs
- **DigitalOcean**: https://docs.digitalocean.com
- **Heroku**: https://devcenter.heroku.com
- **Neon Database**: https://neon.tech/docs
- **SendGrid**: https://docs.sendgrid.com

## Emergency Rollback

If something goes wrong:
1. Keep Replit version running as backup
2. Point domain back to Replit temporarily
3. Debug new deployment without affecting users
4. Switch back once fixed

---

**Note**: GoDaddy shared hosting is NOT compatible with this application. You need VPS or choose a different platform like Render, DigitalOcean, or Heroku.
