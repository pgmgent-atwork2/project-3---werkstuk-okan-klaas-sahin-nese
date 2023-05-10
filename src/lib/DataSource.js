import { DataSource } from "typeorm";

import * as dotenv from 'dotenv';

dotenv.config();

const DS = new DataSource({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  synchronize: true,
});

export default DS;
