const express = require('express');
const mongoose = require('mongoose');
const TypeDefs = require('./schema');
const Resolvers = require('./resolvers');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');

//Store sensetive information to env variables
const dotenv = require('dotenv');
dotenv.config();

//mongoDB Atlas Connection String
const port =5000
const url = "mongodb+srv://admin:admin@aplate.vjowt.mongodb.net/aplate?retryWrites=true&w=majority";
//Connect to mongoDB Atlas
const connect = mongoose.connect(url,
      {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
      });

connect.then((db) => {
      console.log('Sucessfully connected to MongoDB');
}, (err) => {
      console.log(err);
});


//Define Apollo Serverempl
const server = new ApolloServer({
      typeDefs: TypeDefs.typeDefs,
      resolvers: Resolvers.resolvers
});


//Define Express Server
const app = express();
app.use(bodyParser.json());
app.use('*', cors());
server.applyMiddleware({ app });

app.listen(port, () =>
      console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`));
