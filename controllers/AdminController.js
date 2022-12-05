import db from "../configs/dbCon";
const userLists = async (req, res, next) => {
  try {
    const sql = "SELECT * FROM users";
    const userList = await db.query(sql);
    return res.status(200).json({ userList });
  } catch (error) {
    return next(error);
  }
};

export { userLists };
