import GraphQLJSON from 'graphql-type-json';
import { GraphQLDateTime } from 'graphql-iso-date';
import { db } from '../modules/db';

export const resolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime,

  Query: {
    submissions: () => {
      return db.submission.findMany({ orderBy: { submittedAt: 'desc' } });
    }
  },
}