import { UserWithRelations } from './user.types'

export const serializeUserToUserPayload = (data: UserWithRelations) => {
  return {
    id: data.id,
    profileId: data.profile,
    githubDetails: {
      username: data.githubDetails?.username || null,
    },
  }
}