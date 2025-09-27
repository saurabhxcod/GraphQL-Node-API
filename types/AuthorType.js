import { GraphQLObjectType, GraphQLID ,GraphQLString} from "graphql";
const AuthorType=new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        books:{
            
        }
    })
})
export default AuthorType;