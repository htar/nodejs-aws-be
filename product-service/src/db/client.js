import { Client } from "pg";
import { options } from "../config";

export const createClient = async () => {
  const client = new Client(options);
  await client.connect();
  return client;
};