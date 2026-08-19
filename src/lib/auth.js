import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60 // in second
    }

  },
  plugins: [
    jwt(),
  ],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "founder",
        input: true,
      },
      plan: {
        type: "string",
        required: false,
        defaultValue: "free",
        input: false,
      },
     
    }
  },
// //    databaseHooks: {
// //   user: {
// //     create: {
// //       before: async (user) => {
// //          console.log("HOOK RUNNING:", user);
// //         return {
// //           data: {
// //             ...user,
// //             subscription: "free",
// //           },
// //         };
// //       },
// //     },
// //   },
// // },
// });

// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { jwt } from "better-auth/plugins";

// const globalForMongo = global;

// let client;
// if (process.env.NODE_ENV === "production") {
//   client = new MongoClient(process.env.MONGODB_URL);
// } else {
//   if (!globalForMongo._mongoClient) {
//     globalForMongo._mongoClient = new MongoClient(process.env.MONGODB_URL);
//   }
//   client = globalForMongo._mongoClient;
// }

// const db = client.db("startupForge"); 

// export const auth = betterAuth({
//   database: mongodbAdapter(db, { client }),
//   baseURL: process.env.BETTER_AUTH_URL,

//   emailAndPassword: {
//     enabled: true,
//   },

//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     },
//   },
//   session: {
//     cookieCache: {
//       enabled: true,
//       strategy: "jwt",
//       maxAge: 7 * 24 * 60 * 60,
//     },
//   },
//   plugins: [jwt()],
//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//         required: true,
//         defaultValue: "founder",
//         input: true,
//       },
//       plan: {
//         type: "string",
//         required: false,
//         defaultValue: "free",
//         input: false,
//       },
//     },
//   },
 });