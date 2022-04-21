import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify"
// import { Server, IncomingMessage, ServerResponse } from "http"
import staticPlugin from "fastify-static"

// eslint-disable-next-line new-cap
const server: FastifyInstance = Fastify({})

export function startServer(): void {
  const opts: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            pong: {
              type: "string"
            }
          }
        }
      }
    }
  }

  // eslint-disable-next-line unicorn/prefer-module
  const path = require("path")

  server.register(staticPlugin, {
    // eslint-disable-next-line unicorn/prefer-module
    root: path.join(__dirname, ""),
  })

  server.get("/shipping", opts, async (_, reply) => {
    return reply.sendFile("shipping.html")
  })

  server.get("/inventory", opts, async (_, reply) => {
    return reply.sendFile("inventory.html")
  })

  server.get("/accounting", opts, async (_, reply) => {
    return reply.sendFile("accounting.html")
  })

  server.get("/shipping-error", opts, async (_, reply) => {
    return reply.sendFile("shipping-error.html")
  })

  server.get("/inventory-error", opts, async (_, reply) => {
    return reply.sendFile("inventory-error.html")
  })

  server.get("/accounting-error", opts, async (_, reply) => {
    return reply.sendFile("accounting-error.html")
  })

  const start = async () => {
    try {
      await server.listen(3000)
    } catch (error) {
      server.log.error(error)
    }
  }

  start()
}

export function stopServer(): void {
  server.close()
}
