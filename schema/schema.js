import { GraphQLSchema , GraphQLObjectType , GraphQLString, GraphQLInt} from "graphql";
const users=[
  {id:'1',name:'John Doe',age:28},
  {id:'2',name:'Jane Doe',age:25},
  {id:'3',name:'Jim Doe',age:22}
]

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
        console.log(users)
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

const Mutation = new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addUser:{
      type:UserType,
      args:{
        name:{type:GraphQLString},
        age:{type:GraphQLInt}
      },
        resolve(parent,args){
          const newUser={
            id:users.length+1+"",
            name:args.name,
            age:args.age
          }
          users.push(newUser)
          console.log(users)
          return newUser
        }
    },
    updateUser:{
      type:UserType,
      args:{
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        age:{type:GraphQLInt}
      },
        resolve(parent,args){
         const user=users.find(user=>user.id===args.id)
         if(user){
          user.name=args.name
          user.age=args.age
          console.log(users)
          return user
         }
         throw new Error("User not found")
        }
    },
    deleteUser:{
      type:UserType,
      args:{
        id:{type:GraphQLString}
      },  
      resolve(parent,args){
        const index=users.findIndex(user=>user.id===args.id)
        if(index!==-1){
          users.splice(index,1)
          console.log(users)
          return users[index]
        }
        throw new Error("User not found")
      }
    }
  }
})
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});  

export default schema;