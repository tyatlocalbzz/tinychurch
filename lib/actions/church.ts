'use server'

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signupChurch(churchName: string, pastorEmail: string) {
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  // Send magic link for authentication
  const { error } = await supabase.auth.signInWithOtp({
    email: pastorEmail,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/setup`,
      data: {
        church_name: churchName,
        is_pastor: true,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function createChurch(churchName: string, slug: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to create a church' }
  }

  try {
    // Check if slug is available
    const existingChurch = await prisma.church.findUnique({
      where: { slug },
    })

    if (existingChurch) {
      return { error: 'This URL is already taken. Please choose another.' }
    }

    // Create church
    const church = await prisma.church.create({
      data: {
        name: churchName,
        slug,
        pastorEmail: user.email!,
      },
    })

    // Generate household ID for pastor
    const householdId = `household_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create pastor as first member with admin role
    await prisma.member.create({
      data: {
        churchId: church.id,
        householdId,
        householdName: 'Pastor',
        name: user.email!.split('@')[0], // Use email prefix as default name
        email: user.email!,
        role: 'admin',
        status: 'approved',
      },
    })

    // Create default system groups
    await prisma.group.createMany({
      data: [
        {
          churchId: church.id,
          name: 'Leadership',
          isSystem: true,
        },
        {
          churchId: church.id,
          name: 'Prayer Chain',
          isSystem: true,
        },
      ],
    })

    return { success: true, slug: church.slug }
  } catch (error) {
    console.error('Church creation error:', error)
    return { error: 'Failed to create church. Please try again.' }
  }
}

export async function checkSlugAvailability(slug: string) {
  try {
    const existingChurch = await prisma.church.findUnique({
      where: { slug },
    })

    return { available: !existingChurch }
  } catch (error) {
    return { available: false, error: 'Failed to check availability' }
  }
}

interface MemberData {
  name: string
  email?: string
  phone?: string
}

interface JoinChurchData {
  householdName: string
  address?: string
  members: MemberData[]
}

export async function joinChurch(churchId: string, data: JoinChurchData) {
  try {
    // Verify church exists
    const church = await prisma.church.findUnique({
      where: { id: churchId },
    })

    if (!church) {
      return { error: 'Church not found' }
    }

    // Generate household ID for this family
    const householdId = `household_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create all family members with pending status
    await prisma.member.createMany({
      data: data.members.map(member => ({
        churchId,
        householdId,
        householdName: data.householdName,
        name: member.name,
        email: member.email || null,
        phone: member.phone || null,
        address: data.address || null,
        role: 'member',
        status: 'pending',
      })),
    })

    return { success: true }
  } catch (error) {
    console.error('Join church error:', error)
    return { error: 'Failed to submit registration. Please try again.' }
  }
}
