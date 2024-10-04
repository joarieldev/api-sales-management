import {HOST, PORT} from './config'

export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Sales Management",
      version: "1.0.0",
      description: "Una simple API para gestionar las ventas de productos",
    },
    servers: [
      {
        url: `${HOST}:${PORT}`,
      },
    ],
  },
  apis: [`${__dirname}/docs/*.yaml`],
}