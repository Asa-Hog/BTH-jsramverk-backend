const usersModel = require("../models/users");
const {
    GraphQLObjectType,
    GraphQLList,
} = require('graphql');

const UserType = require("./users.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: "List of all users",
            resolve: async function() {
                return await usersModel.getAllUsers();
            }
        }
    })
});

module.exports = RootQueryType;
