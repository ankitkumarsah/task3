import util from "util";
import mysql from "mysql";

const databaseCon = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "freelancer_task",
  });
  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
  };
};
let db = databaseCon();
export default db;
