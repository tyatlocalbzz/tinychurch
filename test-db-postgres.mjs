import postgres from 'postgres'
import dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.DATABASE_URL
console.log('Connection string configured:', connectionString ? '✅' : '❌')
const sql = postgres(connectionString, {
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10
})

async function main() {
  try {
    console.log('Testing postgres connection...')

    // Test basic connection
    const result = await sql`SELECT current_database(), current_user, version()`
    console.log('✅ Database connection successful!')
    console.log('Database:', result[0].current_database)
    console.log('User:', result[0].current_user)

    // Check tables
    console.log('\nChecking database schema...')
    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `

    console.log('✅ Found', tables.length, 'tables:')
    tables.forEach(t => console.log('  -', t.table_name))

    // Verify expected tables
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
    await sql.end()
  }
}

main()
