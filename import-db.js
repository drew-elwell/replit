// Database Import Script for BennCo Advisors
// Usage: node import-db.js <backup-file.json>
// Example: node import-db.js exports/bennco_database_backup_2025-01-14.json

import { db } from './server/db.js';
import { consultationResponses, availabilitySubmissions } from './shared/schema.js';
import * as fs from 'fs';

async function importDatabase(filename) {
  try {
    console.log('🔄 Starting database import...\n');
    
    // Check if file exists
    if (!fs.existsSync(filename)) {
      throw new Error(`File not found: ${filename}`);
    }
    
    // Read and parse backup file
    console.log('📖 Reading backup file:', filename);
    const fileContent = fs.readFileSync(filename, 'utf8');
    const backup = JSON.parse(fileContent);
    
    // Validate backup structure
    if (!backup.data) {
      throw new Error('Invalid backup file format - missing data object');
    }
    
    // Display backup metadata
    if (backup.metadata) {
      console.log('\n📋 Backup Information:');
      console.log(`   • Export Date: ${backup.metadata.exportDate}`);
      console.log(`   • Consultation Responses: ${backup.metadata.recordCounts?.consultationResponses || 0}`);
      console.log(`   • Availability Submissions: ${backup.metadata.recordCounts?.availabilitySubmissions || 0}`);
    }
    
    console.log('\n⚠️  Warning: This will add data to your database.');
    console.log('   Make sure you are connected to the correct database!\n');
    
    let totalImported = 0;
    
    // Import consultation responses
    if (backup.data.consultationResponses?.length > 0) {
      console.log(`📥 Importing ${backup.data.consultationResponses.length} consultation responses...`);
      
      // Remove id field to let database auto-generate
      const consultationsToImport = backup.data.consultationResponses.map(record => {
        const { id, ...rest } = record;
        return rest;
      });
      
      await db.insert(consultationResponses).values(consultationsToImport);
      console.log(`   ✅ Successfully imported ${consultationsToImport.length} consultation responses`);
      totalImported += consultationsToImport.length;
    } else {
      console.log('   ℹ️  No consultation responses to import');
    }
    
    // Import availability submissions
    if (backup.data.availabilitySubmissions?.length > 0) {
      console.log(`📥 Importing ${backup.data.availabilitySubmissions.length} availability submissions...`);
      
      // Remove id field to let database auto-generate
      const availabilityToImport = backup.data.availabilitySubmissions.map(record => {
        const { id, ...rest } = record;
        return rest;
      });
      
      await db.insert(availabilitySubmissions).values(availabilityToImport);
      console.log(`   ✅ Successfully imported ${availabilityToImport.length} availability submissions`);
      totalImported += availabilityToImport.length;
    } else {
      console.log('   ℹ️  No availability submissions to import');
    }
    
    // Success message
    console.log('\n✅ Database import completed successfully!');
    console.log(`   • Total records imported: ${totalImported}\n`);
    console.log('🔍 Next steps:');
    console.log('   1. Verify data in your admin panel');
    console.log('   2. Test that all records are accessible');
    console.log('   3. Securely delete the backup file if no longer needed\n');
    
  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    
    if (error.message.includes('duplicate key')) {
      console.error('\nThis error occurs when records already exist in the database.');
      console.error('Solutions:');
      console.error('  1. Use a fresh database');
      console.error('  2. Or manually clear existing data first\n');
    } else {
      console.error('\nTroubleshooting:');
      console.error('  1. Check DATABASE_URL environment variable is set correctly');
      console.error('  2. Verify database connection is working');
      console.error('  3. Ensure tables exist (run: npm run db:push)');
      console.error('  4. Verify backup file format is correct\n');
    }
    
    process.exit(1);
  }
  
  process.exit(0);
}

// Get filename from command line argument
const filename = process.argv[2];

if (!filename) {
  console.error('❌ Error: No backup file specified\n');
  console.log('Usage: node import-db.js <backup-file.json>');
  console.log('Example: node import-db.js exports/bennco_database_backup_2025-01-14.json\n');
  process.exit(1);
}

// Run import
importDatabase(filename);
