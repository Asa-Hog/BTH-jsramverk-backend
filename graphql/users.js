const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a user',
    fields: () => ({
        // id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        // html: { type: GraphQLString },
        // owner: { type: new GraphQLNonNull(GraphQLString) },
        // allowedUsers: { type: GraphQLString },
    })
})

module.exports = UserType;