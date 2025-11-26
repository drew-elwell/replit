# BennCo Advisors Website - Migration Guide

This guide will help you move the BennCo Advisors website from Replit to another hosting provider.

## Overview

This is a full-stack Node.js application with:
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js server
- **Database**: PostgreSQL (using Drizzle ORM)
- **Email**: SendGrid integration for form submissions

## Step 1: Download the Code from Replit

1. In Replit, click the three dots menu (⋮) in the Files panel
2. Select "Download as zip"
3. Extract the zip file on your computer

## Step 2: Set Up PostgreSQL Database

You need a PostgreSQL database. Recommended providers:
- **Neon** (https://neon.tech) - Serverless PostgreSQL, free tier available
- **Supabase** (https://supabase.com) - Includes PostgreSQL + other features
- **ElephantSQL** (https://www.elephantsql.com) - Managed PostgreSQL
- **AWS RDS** - For enterprise needs
- **DigitalOcean Managed Database** - Reliable and straightforward

### Database Setup:
1. Create a new PostgreSQL database on your chosen provider
2. Save the connection string (format: `postgresql://user:password@host:port/database`)
3. Run the database migration (see Step 5)

## Step 3: Choose a Hosting Provider

Your hosting provider must support **Node.js applications**. Options:

### Recommended Providers:

**Render** (https://render.com)
- Easy deployment from Git
- Free tier available
- Supports Node.js and environment variables
- Good for beginners

**DigitalOcean App Platform** (https://www.digitalocean.com/products/app-platform)
- $5/month starter tier
- Simple dashboard
- Excellent documentation

**Heroku** (https://www.heroku.com)
- Classic platform, very easy to use
- Paid tiers only (starting ~$5/month)

**Fly.io** (https://fly.io)
- Modern platform
- Good free tier
- Requires CLI familiarity

**AWS Elastic Beanstalk** or **AWS EC2**
- Enterprise-grade
- More complex setup
- Very scalable

**Vercel** (https://vercel.com)
- Great for frontend, but you'll need separate backend hosting
- Not recommended for full-stack apps like this

### NOT Compatible:
- GoDaddy shared hosting (doesn't support Node.js)
- Basic cPanel hosting
- Static site hosts (GitHub Pages, Netlify for static sites only)

### GoDaddy VPS / Dedicated Server (Advanced)

**⚠️ Important**: GoDaddy's regular web hosting does NOT work for this application.

You need one of these GoDaddy options:
- **VPS Hosting** (Virtual Private Server) - Starts ~$20-40/month
- **Dedicated Server** - Starts ~$100+/month

**What you get:**
- Full server control with SSH access
- Ability to install Node.js and other software
- Root/sudo permissions
- Must manage server yourself (security updates, configuration, etc.)

**Skills required:**
- Linux command line basics
- SSH and server management
- Web server configuration (Nginx or Apache)
- SSL certificate setup

**Recommended if:**
- You have technical Linux/server experience
- You need full control over hosting environment
- You have other services running on GoDaddy
- You want everything in one place

**Not recommended if:**
- You're new to server management
- You want simple deployment
- You prefer managed services
- → Consider Render, DigitalOcean App Platform instead (easier, often cheaper)

See detailed GoDaddy VPS setup instructions in "Step 7: Deployment Instructions"

## Step 4: Prepare Environment Variables

You'll need to set these environment variables on your hosting provider:

```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Email Configuration (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_USER=your_email@domain.com
EMAIL_PASS=your_email_password
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false

# Node Environment
NODE_ENV=production
PORT=5000
```

### How to Get These Values:

**DATABASE_URL**: Provided by your PostgreSQL hosting service

**SENDGRID_API_KEY**: 
1. Go to https://sendgrid.com
2. Sign up or log in
3. Go to Settings → API Keys
4. Create a new API key with "Mail Send" permissions

**EMAIL credentials**: Your existing email service credentials

## Step 5: Database Migration

After setting up your PostgreSQL database:

1. Install dependencies:
```bash
npm install
```

2. Push the database schema:
```bash
npm run db:push
```

This will create all necessary tables in your database.

## Step 6: Build the Application

```bash
npm run build
```

This creates production-ready files in the `dist` folder.

## Step 7: Deployment Instructions by Platform

### Option A: Render.com (Recommended for Beginners)

1. Create account at https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub (you'll need to push code to GitHub first)
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add all environment variables from Step 4
6. Click "Create Web Service"
7. Render will build and deploy automatically

### Option B: DigitalOcean App Platform

1. Create account at https://www.digitalocean.com
2. Go to "App Platform" → "Create App"
3. Connect your GitHub repository or upload code
4. Configure:
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`
5. Add environment variables
6. Deploy

### Option C: Heroku

1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Add environment variables:
```bash
heroku config:set DATABASE_URL=your_database_url
heroku config:set SENDGRID_API_KEY=your_key
# ... repeat for all variables
```
5. Deploy:
```bash
git push heroku main
```

### Option D: GoDaddy VPS (Advanced - For Experienced Users)

**⚠️ WARNING**: This is complex and requires Linux/server experience.

**Prerequisites:**
- GoDaddy VPS plan (not shared hosting)
- SSH client installed on your computer
- Basic Linux command line knowledge
- Understanding of web servers (Nginx)

**Step-by-Step GoDaddy VPS Setup:**

#### 1. Order and Access VPS

1. Purchase GoDaddy VPS hosting plan
2. Wait for setup email with:
   - Server IP address
   - SSH username (usually `root`)
   - SSH password
3. Test SSH connection:
   ```bash
   ssh root@your-server-ip
   ```

#### 2. Initial Server Setup

```bash
# Update system packages
apt update && apt upgrade -y

# Create a non-root user for security
adduser bennco
usermod -aG sudo bennco

# Switch to new user
su - bennco
```

#### 3. Install Node.js

```bash
# Install Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

#### 4. Install PostgreSQL (Optional - or use external database)

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql

# In psql prompt:
CREATE DATABASE bennco_advisors;
CREATE USER bennco_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE bennco_advisors TO bennco_user;
\q
```

**Or skip this and use external database** (Neon, Supabase - recommended)

#### 5. Upload Your Code

**Option A: Using Git (Recommended)**

```bash
# Install git
sudo apt install -y git

# Clone your repository
cd /home/bennco
git clone https://github.com/yourusername/bennco-advisors.git
cd bennco-advisors
```

**Option B: Using SFTP**

1. Use FileZilla or WinSCP
2. Connect to your server IP with SSH credentials
3. Upload entire project folder to `/home/bennco/bennco-advisors`

#### 6. Configure Application

```bash
cd /home/bennco/bennco-advisors

# Install dependencies
npm install

# Create .env file
nano .env
```

Add environment variables:
```bash
DATABASE_URL=postgresql://bennco_user:your_password@localhost:5432/bennco_advisors
SENDGRID_API_KEY=SG.your_sendgrid_key
NODE_ENV=production
PORT=5000
```

Save and exit (Ctrl+X, Y, Enter)

```bash
# Build the application
npm run build

# Initialize database
npm run db:push
```

#### 7. Install PM2 Process Manager

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start your application
pm2 start npm --name "bennco-advisors" -- start

# Enable startup on boot
pm2 startup
pm2 save

# Check status
pm2 status
pm2 logs
```

#### 8. Install and Configure Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/bennco-advisors
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/bennco-advisors /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### 9. Set Up SSL Certificate (HTTPS)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (option 2)

# Test auto-renewal
sudo certbot renew --dry-run
```

#### 10. Configure Firewall

```bash
# Enable firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check status
sudo ufw status
```

#### 11. Point Domain to VPS

In GoDaddy DNS management:

```
Type: A
Name: @
Value: [Your VPS IP address]
TTL: 600

Type: A  
Name: www
Value: [Your VPS IP address]
TTL: 600
```

Wait for DNS propagation (5-30 minutes).

#### 12. Test Everything

```bash
# Check application is running
pm2 status

# Check Nginx
sudo systemctl status nginx

# Check logs
pm2 logs

# Test from browser
# Visit: https://yourdomain.com
```

### Maintenance Commands

```bash
# View logs
pm2 logs

# Restart application
pm2 restart bennco-advisors

# Update code (if using Git)
cd /home/bennco/bennco-advisors
git pull
npm install
npm run build
pm2 restart bennco-advisors

# Check disk space
df -h

# Check memory
free -m
```

### Security Best Practices

1. **Change default SSH port**:
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Change Port 22 to Port 2222
   sudo systemctl restart ssh
   ```

2. **Disable root login**:
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Set: PermitRootLogin no
   sudo systemctl restart ssh
   ```

3. **Set up fail2ban** (protects against brute force):
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   ```

4. **Regular updates**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

### GoDaddy VPS Cost Estimate

- **VPS Plan**: $20-40/month (entry level)
- **Database**: Free if self-hosted, or $19/month for Neon
- **SendGrid**: Free tier (100 emails/day)
- **Domain**: Already owned
- **SSL Certificate**: Free (Let's Encrypt)

**Total**: $20-60/month

### When to Choose GoDaddy VPS

✅ **Good choice if:**
- You have Linux/server administration experience
- You need full server control
- You want to host multiple sites on one server
- You're comfortable with command line
- You can handle security updates

❌ **Not recommended if:**
- You're new to server management
- You want simple, managed hosting
- You prefer click-and-deploy solutions
- You don't want to handle security yourself

**Easier alternatives**: Render.com, DigitalOcean App Platform - same result, less complexity.

### Option E: AWS, Fly.io, or Other VPS

These require similar technical knowledge to GoDaddy VPS. Refer to their respective documentation.

## Step 8: Connect Your GoDaddy Domain

Once your app is deployed and you have a URL from your hosting provider:

1. Log into GoDaddy
2. Go to "My Products" → "DNS" for your domain
3. Add/Update DNS records:

**If your host provides an IP address:**
- Type: A Record
- Name: @ (or your domain)
- Value: The IP address
- TTL: 600

**If your host provides a domain (like Heroku):**
- Type: CNAME Record
- Name: www
- Value: your-app.herokuapp.com (or similar)
- TTL: 600

4. Wait for DNS propagation (5 minutes to 48 hours)

## Step 9: Test Everything

1. Visit your domain
2. Test all pages
3. Submit a test consultation form
4. Check that emails are being sent
5. Verify admin panel works

## Troubleshooting

### App won't start
- Check environment variables are set correctly
- Verify DATABASE_URL format
- Check logs from your hosting provider

### Database errors
- Ensure you ran `npm run db:push`
- Verify DATABASE_URL is accessible
- Check database allows connections from your host's IP

### Email not sending
- Verify SENDGRID_API_KEY is valid
- Check SendGrid dashboard for errors
- Ensure API key has "Mail Send" permissions

### 404 errors on refresh
- Your hosting provider needs to redirect all routes to index.html
- Most platforms handle this automatically for SPAs

## Files You Can Delete Before Deploying

These are Replit-specific and not needed elsewhere:
- `.replit` file
- `replit.nix` file
- `.config` folder (if present)

## Need Help?

- **Render docs**: https://render.com/docs
- **DigitalOcean docs**: https://docs.digitalocean.com/products/app-platform/
- **Heroku docs**: https://devcenter.heroku.com/

## Cost Estimates

- **Database (Neon)**: Free tier available, paid starts at $19/month
- **Hosting (Render)**: Free tier available, paid starts at $7/month
- **Hosting (DigitalOcean)**: Starts at $5/month
- **Hosting (Heroku)**: Starts at $5/month
- **SendGrid**: Free for 100 emails/day, paid plans start at $15/month
- **Domain (GoDaddy)**: You already have this

**Total minimum**: $0-10/month (using free tiers) or $20-50/month (paid tiers for reliability)

---

## Quick Start Checklist

- [ ] Download code from Replit
- [ ] Set up PostgreSQL database (get connection string)
- [ ] Choose hosting provider (Render recommended)
- [ ] Get SendGrid API key
- [ ] Push code to GitHub (if using Render/DO)
- [ ] Create web service on hosting platform
- [ ] Add all environment variables
- [ ] Deploy application
- [ ] Run database migration
- [ ] Test the website
- [ ] Connect GoDaddy domain via DNS
- [ ] Final testing with custom domain

Good luck with your migration!
