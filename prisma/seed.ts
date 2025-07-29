import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst()
    
    if (!existingAdmin) {
      // Create default admin
      const hashedPassword = await hash('admin123', 12)
      
      const admin = await prisma.admin.create({
        data: {
          email: 'admin@example.com',
          password: hashedPassword,
        },
      })
      
      console.log('Default admin created:', admin.email)
    } else {
      console.log('Admin already exists, skipping seed')
    }
  } catch (error) {
    console.error('Error seeding default admin:', error)
    throw error
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
