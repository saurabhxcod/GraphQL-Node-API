import { GraphQLObjectType, GraphQLString, GraphQLSchema ,GraphQLID,GraphQLList} from "graphql";
import AuthorType from "../types/AuthorType.js";
import BookType from "../types/BookType.js";
import Book from "../models/Book.model.js";
import Author from "../models/Author.Model.js";

const Mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                  name:{type:GraphQLString}
            },
            resolve(parent,args){
                const author=new Author({name:args.name});
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                title:{type:GraphQLString},
                authorId:{type:GraphQLID}
            },
            resolve(parent,args){
                const book=new Book({title:args.title,authorId:args.authorId});
                return book.save();
            }
        }
    }
})


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
      authors: {
        type: new GraphQLList(AuthorType),
        resolve() {
          return Author.find();
        }
      },
      books: {
        type: new GraphQLList(BookType),
        resolve() {
          return Book.find();
        }
      }
    }
  });
  


const Schema=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})

export default Schema;