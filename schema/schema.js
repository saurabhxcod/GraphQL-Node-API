import { GraphQLSchema , GraphQLObjectType , GraphQLString} from "graphql";

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return 'Hello from GraphQL';
        }
    },
    hi: {
      type: GraphQLString,
      resolve() {
        return 'Hi from GraphQL';
        }
    }
  }
});

const schema = new GraphQLSchema({
    query: RootQuery        
});  

export default schema;