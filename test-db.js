const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Testing Prisma connection...')

    // Test connection by querying the database
    const result = await prisma.$queryRaw`SELECT current_database(), current_user;`
    console.log('✅ Database connection successful!')
    console.log('Connected to:', result[0])

    // Check if tables exist
    console.log('\nChecking database schema...')
    const tables = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `

    console.log('✅ Found', tables.length, 'tables:')
    tables.forEach(t => console.log('  -', t.table_name))

    // Verify all expected tables exist
    const expectedTables = ['Church', 'Member', 'Visitor', 'Group', 'GroupMember', 'PrayerRequest', 'EmailLog']
    const actualTables = tables.map(t => t.table_name)
    const missingTables = expectedTables.filter(t => !actualTables.includes(t))

    if (missingTables.length > 0) {
      console.log('\n❌ Missing tables:', missingTables.join(', '))
    } else {
      console.log('\n✅ All expected tables present!')
    }

  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
