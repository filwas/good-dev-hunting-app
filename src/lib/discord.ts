import { httpClient } from '@/lib/httpClient'

export async function discordNotification(message: string, link?: string) {
  try {
    if (message) {
      console.error('message not provided for discord notification')
    }
    // sending the message through webhook url
    await httpClient.post(`${process.env.TEST_WEBHOOK}`, {
      content: `${message}: ${link ? `: ${link}` : ''}`,
    })
  } catch (error) {
    console.log(error)
  }
}

// send discord notification
// await discordNotification(
//   `User's profile has got ${payload.state}`,
//   `http://localhost:3000/dashboard/profile/${profileId}`,
// )
