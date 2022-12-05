import db from "../configs/dbCon";
import CustomErrorHandler from "../services/CustomErrorHandler";
//add new user
const addUser = async (req, res, next) => {
  const { name, email, mobile, age, city, qualification } = req.body;

  try {
    //check user is exists
    const sql = "SELECT mobile FROM users WHERE mobile =?";
    const chekUser = await db.query(sql, [mobile]);
    if (chekUser.length > 0) {
      return next(
        CustomErrorHandler.alreadyExists(
          "This User is already Present in Our Records!"
        )
      );
    } else {
      //if user is not present
      const sql2 =
        "INSERT INTO users(name,email,mobile,age,city,qualification,user_type,status) VALUES (?,?,?,?,?,?,?,?)";
      const insertUser = await db.query(sql2, [
        name,
        email,
        mobile,
        age,
        city,
        qualification,
        "1",
        "0",
      ]);
      return res.status(201).json({ msg: "User inserted Successfully!" });
    }
  } catch (error) {
    return next(error);
  }
};
export { addUser };
