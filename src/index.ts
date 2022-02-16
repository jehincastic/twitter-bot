/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();

import startServer from "./server";

const main = async () => {
  // Start the server
  await startServer();
};

// eslint-disable-next-line no-console
main().catch(console.error);
