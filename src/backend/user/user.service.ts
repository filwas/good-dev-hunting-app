import { prisma } from '@/lib/prismaClient'
import { serializeUserToUserPayload } from './user.serializer'
import { CreateUserPayload } from './user.types'
import { Prisma } from '@prisma/client'

export async function getUsersPayload() {
  const users = await prisma.user.findMany({
    include: {
      githubDetails: true,
      profile: true,
    },
  })

  const serializedProfile = users.map((user) => {
    return serializeUserToUserPayload(user)
  })
  return serializedProfile
}

export async function getUserById(id: string) {
  const userById = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      githubDetails: true,
      profile: true,
    },
  })

  if (userById !== null) {
    return serializeUserToUserPayload(userById)
  }

  // Handle the case when profileById is null
  return null
}

export async function findUserByEmail(email: string) {
  const foundUser = await prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      githubDetails: true,
      profile: true,
    },
  })

  return foundUser
}

export async function doesUserExist(email: string) {
  const foundUser = await findUserByEmail(email)

  return !!foundUser
}

export const findOrCreateUser = async (data: {
  email: string
  username: string
  imageSrc: string
}) => {
  const foundUser = await prisma.user.findFirst({
    where: { email: data.email },
  })

  if (foundUser) {
    return foundUser
  }

  const createdUser = await prisma.user.create({
    data: {
      email: data.email,
      avatarUrl: data.imageSrc,
      githubDetails: {
        create: {
          username: data.username,
        },
      },
    },
    include: {
      githubDetails: true,
    },
  })

  return createdUser
}

export async function createUser(userDataFromGh: CreateUserPayload) {
  const createdUser = await prisma.user.create({
    data: {
      email: userDataFromGh.email,
      avatarUrl: userDataFromGh.image,
      githubDetails: {
        create: {
          username: userDataFromGh.name,
        },
      },
    },
    include: {
      githubDetails: true,
    },
  })
  return createdUser
}

export async function updateUserData(
  email: string,
  userDataToUpdate: Prisma.ProfileUpdateInput,
) {
  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: userDataToUpdate,
  })

  return updatedUser
}