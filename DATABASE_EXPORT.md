# Database Export and Migration Guide

This guide explains how to export your database from Replit and import it to your new hosting provider.

## Overview

Your BennCo Advisors website uses PostgreSQL with these tables:
- `consultation_responses` - Client consultation requests
- `availability_submissions` - Meeting availability submissions

## Before You Start

**Do you have data to export?**
- If you're still in development/testing → Probably skip this, just create fresh database
- If you have real client data → **Follow this guide carefully**

## Option 1: Export from Replit Database (If Using Replit Postgres)

### Step 1: Access Replit Database

1. In your Replit project, open the "Database" tab (left sidebar)
2. Click on your PostgreSQL database
3. Note your connection details

### Step 2: Export Data

**Method A: Using Replit Console**

1. Open Replit Shell
2. Run this command to export all data:

```bash
# This exports your database to a SQL file
pg_dump $DATABASE_URL > database_backup.sql
```

3. Download the `database_backup.sql` file from Replit

**Method B: Export as CSV (For Each Table)**

Run these commands in Replit Shell:

```bash
# Export consultation responses
psql $DATABASE_URL -c "COPY consultation_responses TO STDOUT WITH CSV HEADER" > consultation_responses.csv

# Export availability submissions
psql $DATABASE_URL -c "COPY availability_submissions TO STDOUT WITH CSV HEADER" > availability_submissions.csv
```

Download both CSV files.

## Option 2: Export Using Database Client

### Using pgAdmin, DBeaver, or TablePlus:

1. Connect to your Replit database using the connection string
2. Right-click on database → "Backup" or "Export"
3. Choose SQL format
4. Save the file

## Importing to New Database

### Step 1: Set Up New Database

First, create your tables on the new database:

1. Set up your new PostgreSQL database (Neon, Supabase, etc.)
2. Set the `DATABASE_URL` environment variable
3. Run the migration:

```bash
npm run db:push
```

This creates the empty tables.

### Step 2: Import Your Data

**Method A: From SQL Dump**

```bash
# Replace with your new database connection string
psql "postgresql://username:password@host:port/database" < database_backup.sql
```

**Method B: From CSV Files**

1. Use your database provider's import tool (most have web UI)
2. Upload CSV files
3. Map columns to table fields

**Method C: Using Database Client**

1. Connect to new database with pgAdmin/DBeaver/TablePlus
2. Right-click database → "Restore" or "Import"
3. Select your SQL backup file
4. Execute

## Export Script (Advanced)

Create a file called `export-db.js` in your project root:

```javascript
// export-db.js
import { db } from './server/db.js';
import { consultationResponses, availabilitySubmissions } from './shared/schema.js';
import * as fs from 'fs';

async function exportDatabase() {
  try {
    console.log('Exporting database...');
    
    // Fetch all data
    const consultations = await db.select().from(consultationResponses);
    const availability = await db.select().from(availabilitySubmissions);
    
    // Create backup object
    const backup = {
      exportDate: new Date().toISOString(),
      consultationResponses: consultations,
      availabilitySubmissions: availability
    };
    
    // Save to file
    const filename = `database_backup_${Date.now()}.json`;
    fs.writeFileSync(filename, JSON.stringify(backup, null, 2));
    
    console.log(`✓ Database exported to ${filename}`);
    console.log(`  - ${consultations.length} consultation responses`);
    console.log(`  - ${availability.length} availability submissions`);
    
  } catch (error) {
    console.error('Export failed:', error);
  }
  process.exit(0);
}

exportDatabase();
```

Run with:
```bash
node export-db.js
```

## Import Script (Advanced)

Create `import-db.js`:

```javascript
// import-db.js
import { db } from './server/db.js';
import { consultationResponses, availabilitySubmissions } from './shared/schema.js';
import * as fs from 'fs';

async function importDatabase(filename) {
  try {
    console.log(`Importing from ${filename}...`);
    
    // Read backup file
    const backup = JSON.parse(fs.readFileSync(filename, 'utf8'));
    
    // Import consultations
    if (backup.consultationResponses?.length > 0) {
      await db.insert(consultationResponses).values(backup.consultationResponses);
      console.log(`✓ Imported ${backup.consultationResponses.length} consultation responses`);
    }
    
    // Import availability
    if (backup.availabilitySubmissions?.length > 0) {
      await db.insert(availabilitySubmissions).values(backup.availabilitySubmissions);
      console.log(`✓ Imported ${backup.availabilitySubmissions.length} availability submissions`);
    }
    
    console.log('✓ Import complete');
    
  } catch (error) {
    console.error('Import failed:', error);
  }
  process.exit(0);
}

// Get filename from command line
const filename = process.argv[2] || 'database_backup.json';
importDatabase(filename);
```

Run with:
```bash
node import-db.js database_backup_1234567890.json
```

## Quick Reference: Database Commands

### Export entire database:
```bash
pg_dump $DATABASE_URL > backup.sql
```

### Export specific table:
```bash
pg_dump $DATABASE_URL -t consultation_responses > consultations.sql
```

### Import database:
```bash
psql $NEW_DATABASE_URL < backup.sql
```

### Export as CSV:
```bash
psql $DATABASE_URL -c "COPY consultation_responses TO STDOUT WITH CSV HEADER" > data.csv
```

## Troubleshooting

### "pg_dump: command not found"
- Install PostgreSQL client tools
- Or use database GUI client instead

### "Permission denied"
- Check database user has export permissions
- Verify connection string is correct

### Import fails with "duplicate key"
- Tables already have data
- Either drop tables first or use INSERT IGNORE

### "Connection refused"
- Check DATABASE_URL is correct
- Verify database allows connections from your IP
- Check firewall settings

## Best Practices

1. **Test First**: Try import on a test database before production
2. **Backup Before Import**: If target database has data, back it up first
3. **Verify Data**: After import, check record counts match
4. **Secure Backups**: Don't commit backup files to Git (they contain real data)

## Alternative: Manual Data Entry

If you only have a few records:
1. Skip the export process
2. Use the admin panel on your new deployment
3. Re-enter data manually
4. Simpler for small datasets

## Checklist

- [ ] Determine if you have data to export
- [ ] Choose export method (SQL dump, CSV, or JSON)
- [ ] Export data from Replit
- [ ] Download backup files
- [ ] Set up new database with `npm run db:push`
- [ ] Import data to new database
- [ ] Verify record counts match
- [ ] Test admin panel to ensure data is accessible
- [ ] Securely store backup files
- [ ] Delete backup files from public repositories

---

**Important**: Backup files contain real client data. Never commit them to version control or share publicly.
