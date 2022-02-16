import fauna from "faunadb";

import { faunaKey } from "../config";

const client = new fauna.Client({
  secret: faunaKey,
});

const { query } = fauna;

export {
  client,
  query,
};
