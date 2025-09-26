import { GraphQLSchema , GraphQLObjectType , GraphQLString, GraphQLInt} from "graphql";

const UserType=new GraphQLObjectType({
  name:'User',
  fields:{
    id:{type:GraphQLString},
    name:{type:GraphQLString},
    age:{type:GraphQLInt}
  }
})
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

    user:{
      type:UserType,
      args:{
        id:{type:GraphQLString}
      },
      resolve(parent,args){
        const users=[
          {id:'1',name:'John Doe',age:28},
          {id:'2',name:'Jane Doe',age:25},
          {id:'3',name:'Jim Doe',age:22}
        ]
        return users.find(user=>user.id===args.id);
      }
    },


    hello: {
      type: GraphQLString,
      resolve() {
        return 'Hello from GraphQL';
        }
    }
  }
});

const schema = new GraphQLSchema({
    query: RootQuery        
});  

export default schema;