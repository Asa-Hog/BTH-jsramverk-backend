const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const DocType = new GraphQLObjectType({
    name: 'Doc',
    description: 'This represents a document',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        html: { type: GraphQLString },
        owner: { type: new GraphQLNonNull(GraphQLString) },
        allowedUsers: { type: GraphQLString },
    })
})

module.exports = DocType;