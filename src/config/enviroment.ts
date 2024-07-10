import { get } from 'env-var'

export const env = {
  NODE_ENV: get('NODE_ENV').required().asString(),
  NODE_PORT: get('NODE_PORT').default(1024).asInt(),
  MONGO: {
    URI: get('MONGO_URI').required().asString(),
    DATABASE: get('MONGO_DATABASE').required().asString(),
  }
}
