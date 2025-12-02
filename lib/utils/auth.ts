import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function getCurrentUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const member = await prisma.member.findFirst({
    where: {
      email: user.email,
    },
    include: {
      church: true,
    },
  })

  return {
    user,
    member,
  }
}
