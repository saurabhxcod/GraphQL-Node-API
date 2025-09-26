import { GraphQLSchema , GraphQLObjectType , GraphQLString, GraphQLInt, GraphQLList,GraphQLInputObjectType,GraphQLNonNull} from "graphql";
import User from '../models/User.Model.js';
// const users=[
//   {id:'1',name:'John Doe',age:28},
//   {id:'2',name:'Jane Doe',age:25},
//   {id:'3',name:'Jim Doe',age:22}
// ]

const UserType=new GraphQLObjectType({
  name:'User',
  fields:{
    id:{type:GraphQLString},
    name:{type:GraphQLString},
    age:{type:GraphQLInt}
  }
})

const UserInputType=new GraphQLInputObjectType({
  name:'UserInput',
  fields:{
    id:{type:GraphQLString},
    name:{type:new GraphQLNonNull(GraphQLString)},
    age:{type:GraphQLInt}
  }
})
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users:{
      type:new GraphQLList(UserType), 
      resolve(parent,args){
        return User.find()
      }
    },
    user:{
      type:UserType,
      args:{
        id:{type:GraphQLString}
      },
      resolve(parent,args){
        // console.log(users)
        // return users.find(user=>user.id===args.id);
        return User.findById(args.id)

      }
    },


    // hello: {
    //   type: GraphQLString,
    //   resolve() {
    //     return 'Hello from GraphQL';
    //     }
    // }
  }
});

const Mutation = new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addUser:{
      type:UserType,
      args:{
        // name:{type:GraphQLString},
        // age:{type:GraphQLInt}

        //using input type
        input:{type:UserInputType}

      },
        async resolve(_,{input}){
          // const newUser={
          //   id:users.length+1+"",
          //   name:args.name,
          //   age:args.age
          // }
          // users.push(newUser)
          // console.log(users)
          // return newUser


          //using dynamic data
          if(!input.name || input.name.length<3){
            throw new Error("Name must be at least 3 characters long")
          }
          
          // const newUser=new User({name:args.name,age:args.age})
          const newUser=new User({name:input.name,age:input.age})
          console.log(newUser)
          return await newUser.save()
        }
    },
    updateUser:{
      type:UserType,
      args:{
        // id:{type:GraphQLString},
        // name:{type:GraphQLString},
        // age:{type:GraphQLInt}

        //using input type
        input:{type:UserInputType}
      },
        async resolve(parent,{input}){
        //  const user=users.find(user=>user.id===args.id)
        //  if(user){
        //   user.name=args.name
        //   user.age=args.age
        //   console.log(users)
        //   return user
        //  }
        //  throw new Error("User not found")
        // }

        //using dynamic data
        const user=await User.findByIdAndUpdate(input.id,{name:input.name,age:input.age},{new:true})
        console.log(user)
        return user
        }
    },
    deleteUser:{
      type:UserType,
      args:{
        // id:{type:GraphQLString}
        input:{type:UserInputType}
      },  
      async resolve(parent,{input}){
      //   const index=users.findIndex(user=>user.id===args.id)
      //   if(index!==-1){
      //     users.splice(index,1)
      //     console.log(users)
      //     return users[index]
      //   }
      //   throw new Error("User not found")
      // }

      //using dynamic data
      const user=await User.findByIdAndDelete(input.id)
      console.log(user)
      return user
      }
    }
  }
})
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});  

export default schema;