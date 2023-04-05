export const schema = `#graphql
  scalar JSON
  scalar DateTime

  type Query {
    submissions: [Submission!]!
  }

  type Submission {
    id: ID!
    submittedAt: DateTime!
    data: JSON!
  }
`;