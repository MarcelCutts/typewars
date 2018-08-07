const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Form {
    input: String!
    dropdown: String!
}

type Query {
    form: Form!
}

type Mutation {
    updateForm(content: String!): String!
}
`;

const resolvers = {
  Query: {
    form: (_, args, context) => ({
      input: "Default from apollo",
      dropdown: "option2"
    })
  },
  Mutation: {
    updateForm: (_, { content }, context) => `Form server received: ${content}`
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("GQL Running on htttp://localhost:4000"));
