import express from 'express';
import { graphqlHTTP } from 'express-graphql';
// import schema from './schema/schema.js';
import schema from './schema/index.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const app=express();
const PORT=3000;

//MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));
app.use('/graphql', graphqlHTTP({
  // schema,
  schema,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});   