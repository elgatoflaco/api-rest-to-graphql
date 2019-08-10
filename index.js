const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");


const baseURL = `https://jsonplaceholder.typicode.com`;

const resolvers = {
  Query: {
    users: () => {
      return fetch(`${baseURL}/users`).then(res => res.json());
    //   return axios.get(`${baseURL}/users`).then(res => res.data);
    },
    user: (parent, args) => {
      const { id } = args;
      return fetch(`${baseURL}/users/${id}`).then(res => res.json());
    },
    posts: () => {
      return fetch(`${baseURL}/posts`).then(res => res.json());
    },
    post: (parent, args) => {
      const { id } = args;
      return fetch(`${baseURL}/posts/${id}`).then(res => res.json());
    }
  },
  Post: {
    author: parent => {
      const { id } = parent;
      return fetch(`${baseURL}/users/${id}/todos`).then(res =>
        res.json()
      );
    }
  },
  User: {
    posts: parent => {
      const { id } = parent;
      return fetch(`${baseURL}/posts/${id}/todos`).then(res => res.json());
    }
  }
};

const server = new GraphQLServer({
//   typeDefs: typeDefs,
typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));

// Documentado en
// https://www.prisma.io/blog/how-to-wrap-a-rest-api-with-graphql-8bf3fb17547d
// https://www.adictosaltrabajo.com/2017/06/01/introduccion-a-graphql/
// https://www.theavocoder.com/graphql/2019/1/7/getting-started-with-apollo-client-graphql-yoga
// https://www.prisma.io/tutorials/graphql-rest-authentication-authorization-basics-ct20

// url now
// https://api-graphql-jph.elgatoflaco.now.sh