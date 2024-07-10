import {apiClient} from "./client.tsx";
import { UserDto} from "../dto/UserDto.tsx";
import {UpdateSettingsDto} from "../dto/UpdateSettingsDto.tsx";

export async function getLoggedInUser({ token }: {token?: string | undefined}) {
  if (!token) {
    throw new Error("Invalid Token")

  }

  const response = await apiClient.get<UserDto>(`/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const { userEmail, allowEmailNotifications } = response.data
  return { userEmail, allowEmailNotifications }

}

export async function updateUserSettings({ token, updateSettingsDto }: {token: string | null, updateSettingsDto: UpdateSettingsDto}) {
  if (!token) {
    throw new Error("Invalid Token")

  }

  await apiClient.put(`/me/settings`, JSON.stringify(updateSettingsDto), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })

}