const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");

async function startServer() { 
    const app = express();
    const server = new ApolloServer({
        // here ! means value cannot be null.
        typeDefs: `
        type Todo {
            id: ID!      
            title: String!
            completed: Boolean
        }

        type Query {
            getTodos : [Todo]
        }
    `,            
    resolvers: {},
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start()

    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => console.log("Server started at PORT 8000"));
}  