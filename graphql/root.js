const docsModel = require("../models/docsModel");
const {
    GraphQLObjectType,
    GraphQLList,
} = require('graphql');

const DocType = require("./docs.js");
const UserType = require("./users.js");


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        docs: {
            type: new GraphQLList(DocType),
            description: "List of all documents",
            resolve: async function() {
                return await docsModel.getAllDocs();
            }
        },
        users: {
            type: new GraphQLList(UserType),
            description: "List of all users",
            resolve: async function() {
                return await docsModel.getAllUsers();
            }
        }
    })
});

module.exports = RootQueryType;
