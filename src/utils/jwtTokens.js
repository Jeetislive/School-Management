import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { db } from "../db/db.js";
const { Role } = db;
dotenv.config();

const createToken = (id,role) => {
   const accessToken = jwt.sign({
      id: id,
      role: role
     }, process.env.JWT_Access_SECRET, {
        expiresIn: '1d' // 1 day
     });
   const refreshToken = jwt.sign({
      id: id,
      role: role
     }, process.env.JWT_Refresh_SECRET, {
      expiresIn: "7d"  // 7 days
   });
     return { accessToken, refreshToken };
 }
// const verifyToken = (req,res) => {
//     try {
//         let token = req.headers.authorization;
//         console.log("Token:", req.headers.authorization);
//         if(!token) {
//             return {msg: 'Token not provided'};
//         }
//         else{
//             token = token.split(" ")[1]
//         }
//         const verify = jwt.verify(token, process.env.JWT_Access_SECRET, (err, decoded) => {
//             if (err) {
//                 // Token has expired or is invalid
//                 if (err.name === 'TokenExpiredError') {
//                     console.log("Token expired:", err.message);

//                     return { msg: 'Token expired' };
//                 } else {
//                     return { msg: 'Invalid token' };
//                 }
//             }
//             return decoded;

//         })
//         return verify;
//     } catch (error) {
//         console.log("Error in verifyToken:", error.message);
//         return null;  
//     }
// }
const verifyToken = async (request, h) => {
    const token = request.headers.authorization?.split(" ")[1];
    // console.log("Token:", token);
    if (!token) throw new Error('Unauthorized');
    const decoded = jwt.verify(token, process.env.JWT_Access_SECRET);
    console.log("====>",decoded)
    request.auth = { credentials: decoded };
    return h.continue;
  };

const verifyRole = (requiredRole) => {

    return async (request, h) => {
      const { role } = request.auth.credentials;
      const roleName = await Role.findOne({ where: { id: role } });
      if (!roleName) throw new Error('Role not found');
        console.log("Role Name:", roleName.title);
        // console.log("Role:", role);
      if (roleName.title !== requiredRole) throw new Error('Forbidden');
      return h.continue;
    };
  };
const verifyRToken = (token) => {
    try {
        const verify = jwt.verify(token, process.env.JWT_Refresh_SECRET, (err, decoded) => {
            if (err) {
                if(err){
                    return err.message;
                }
            }
            return decoded;
        })
        if(!verify){
            return 'failed';
        }
        return verify;
    } catch (error) {
        console.log("Error in verifyToken:", error.message);
        return null;  
    }
}

 export default {
    createToken,
    verifyToken,
    verifyRToken,
    verifyRole
};