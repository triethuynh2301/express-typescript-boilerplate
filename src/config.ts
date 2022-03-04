import { Sequelize } from "sequelize";
import User from "./models/domains/user.domain";
import { DatabaseError } from "./error";

const isDev = process.env.NODE_ENV === "development";

const configureDb = (): Sequelize => {
  let dbUri: string;
  // get db uri
  if (process.env.DEV_DB) {
    dbUri = process.env.DEV_DB;
  } else {
    dbUri = "postgres:///express_boilerplate_db";
  }

  // connect to db
  return new Sequelize(dbUri);
};

const testDbConnection = async (sequelize: Sequelize): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (e) {
    throw new DatabaseError("Unable to connect to database.");
  }
};

// only sync db in development
// const syncDb = () => Promise.all([User.sync({ alter: isDev })]);

const sequelize = configureDb();

const SECRET_KEY = process.env.SECRET_KEY || "secret";
const BCRYPT_WORK_FACTORY: number = 12;

export { sequelize, SECRET_KEY, BCRYPT_WORK_FACTORY };
