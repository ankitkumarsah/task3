import db from "../../configs/dbCon.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import jwtServices from "../../services/JwtServices.js";
import { REFRESH_SECRET } from "../../configs/index.js";
const Login = async (req, res, next) => {
  const { mobile, pwd } = req.body;
  try {
    const sql = "SELECT * FROM users WHERE mobile=?";
    const userCheck = await db.query(sql, [mobile]);
  
    if (userCheck.length > 0) {
      const userPwd = userCheck[0].password;
      console.log(userPwd)
      //if password is matched
      if (pwd == userPwd) {
        //create payload
        const payload = {
          id: userCheck[0].id,
          user_type: userCheck[0].user_type,
        };
        //generate tokens
        const accessToken = jwtServices.sign(payload);
        const refreshToken = jwtServices.sign(payload, "20h", REFRESH_SECRET);
        return res.status(200).json({
          login_status: true,
          role: userCheck[0].user_type,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });

      
      }
      else{
        return next(CustomErrorHandler.wrongCredentials());
      }
     
    } else {
      return next(CustomErrorHandler.wrongCredentials());
    }
  } catch (error) {
    return next(error);
  }
};
export { Login };
