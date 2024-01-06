import type { API } from "./api"

export interface GenerateRequest {
  language: string
  framework?: string
  etc?: string
  modelSchema?: string
  apis: API[]
}
