import axios from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
});

export function getList(slug="penguins") {
  return api.get(`/lists/${slug}`)
}

export function updateList(slug: string, colors: string[]) {
  return api.patch(`/lists/${slug}`, {colors})
}

