const { gql } = require('apollo-server');

const scalarTypeDefs = gql`
  # https://www.apollographql.com/docs/apollo-server/schema/scalars-enums/#date-as-a-scalar
  scalar Date
`;

module.exports = scalarTypeDefs;