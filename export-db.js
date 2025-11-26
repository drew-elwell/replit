// Database Export Script for BennCo Advisors
// Usage: node export-db.js
// This exports all data from your database to a JSON file

import { db } from './server/db.js';
import { consultationResponses, availabilitySubmissions } from './shared/schema.js';
import * as fs from 'fs';
import * as path from 'path';

async function exportDatabase() {
  try {
    console.log('🔄 Starting database export...\n');
    
    // Create exports directory if it doesn't exist
    const exportDir = './exports';
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }
    
    // Fetch all data from tables
    console.log('📥 Fetching consultation responses...');
    const consultations = await db.select().from(consultationResponses);
    
    console.log('📥 Fetching availability submissions...');
    const availability = await db.select().from(availabilitySubmissions);
    
    // Create backup object with metadata
    const backup = {
      metadata: {
        exportDate: new Date().toISOString(),
        exportedBy: 'BennCo Advisors Export Script',
        databaseVersion: '1.0',
        recordCounts: {
          consultationResponses: consultations.length,
          availabilitySubmissions: availability.length
        }
      },
      data: {
        consultationResponses: consultations,
        availabilitySubmissions: availability
      }
    };
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const filename = path.join(exportDir, `bennco_database_backup_${timestamp}.json`);
    
    // Save to file with pretty formatting
    fs.writeFileSync(filename, JSON.stringify(backup, null, 2));
    
    // Success message
    console.log('\n✅ Database export completed successfully!\n');
    console.log('📁 Export saved to:', filename);
    console.log('\n📊 Export Summary:');
    console.log(`   • Consultation Responses: ${consultations.length} records`);
    console.log(`   • Availability Submissions: ${availability.length} records`);
    console.log(`   • Total Records: ${consultations.length + availability.length}`);
    console.log('\n⚠️  Important: This file contains sensitive client data.');
    console.log('   • Do NOT commit to version control');
    console.log('   • Store securely');
    console.log('   • Delete after successful migration\n');
    
  } catch (error) {
    console.error('\n❌ Export failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('  1. Check DATABASE_URL environment variable is set');
    console.error('  2. Verify database connection is working');
    console.error('  3. Ensure tables exist (run: npm run db:push)\n');
    process.exit(1);
  }
  
  process.exit(0);
}

// Run export
exportDatabase();
