import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
// import { db } from "./main-db/db.ts";
import { db } from "./main-db/index.ts";
import { publicProcedure, router } from "./trpc.ts";
import { usersTable } from "./main-db/db/schema.ts";
 
const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      // const users = await db.user.findMany();
      const users = await db.select().from(usersTable);
      return users;
    }),
  // userById: publicProcedure
  //   .input(z.string())
  //   .query(async (opts) => {
  //     const { input } = opts;
  //     const user = await db.user.findById(input);
  //     return user;
  //   }),
  // userCreate: publicProcedure
  //   .input(z.object({ name: z.string() }))
  //   .mutation(async (opts) => {
  //     const { input } = opts;
  //     const user = await db.user.create(input);
  //     return user;
  //   }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  middleware: (req, res, next) => {
    // Configure CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
    
    next();
  },
});

server.listen(3000);
console.log("🚀 Server listening on http://localhost:3000");