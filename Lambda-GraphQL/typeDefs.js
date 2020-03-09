const { gql } = require('apollo-server-lambda');

const typeDefs = gql`

  type Query {
    locationNames(secret:String!): Names
    locationData(name:String!,secret:String!): Location
  }

  type Names {
    names: [String]
    message: String
  }

  type Location {
    name: String
    latitude: String
    longitude: String
    distanceOffice: String
    aditionalData: String
    message: String
  }
`;

module.exports = { typeDefs };
