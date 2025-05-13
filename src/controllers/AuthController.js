import AuthService from "../services/AuthService.js";
import jwtTokens from "../utils/jwtTokens.js";
import { error, success } from "../utils/responseHelper.js";
import ClassStudentController from "./ClassStudentController.js";

const signupSuperAdmin = async (req, res) => {
    try {
        // const { email, password } = req.payload;
        const { firstName, lastName, email, password, tempPassword, schoolId, address, phone, specialization, rollNumber, role, parentEmail, isActive, isTempPassword, system_defined, departmentId, profilePicture, gender, dateOfBirth } = req.payload;
        console.log("req.payload",role);
        
        const username = firstName + lastName;
        const superAdmin = await AuthService.signup(username, firstName, lastName, email, password, tempPassword, schoolId, address, phone, specialization, rollNumber, role, parentEmail, isActive, isTempPassword, system_defined, departmentId, profilePicture, gender, dateOfBirth);
        if (role === "student") {
            await ClassStudentController.createClassStudent(req.payload.classId, superAdmin.id)
        }
        if (!superAdmin) {
            return error("", 'Error signing up super admin', 400)(res);
        }
        return success({superAdmin}, 'Super admin created successfully' , 201)(res);
    } catch (error) {
        console.error(error);
        return error("", 'Internal Server Error', 500)(res);
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.payload;
        const user = await AuthService.login(email, password);
        if (!user) {
            return error("", 'Invalid email or password', 401)(res);
        }
        // Generate tokens here if needed
        const tokens = jwtTokens.createToken(user.id, user.roleId);
        await AuthService.refreshToken(user.id, tokens.refreshToken);
        

        return success({user, accessToken: tokens.accessToken }, 'Login successful', 200)(res);
    } catch (error) {
        console.error(error);
        return error("","Internal Server Error")(res);
    }
};
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.payload;
        const result = await AuthService.resetPassword(email, newPassword);
        if (!result) {
            return error("", 'Error resetting password', 400)(res);
        }
        return success({}, 'Password reset successfully', 200)(res);
    } catch (error) {
        console.error(error);
        return error("","Internal Server Error")(res);
    }
};
const logout = async (req, res) => {
    try {
        // const { accessToken } = req.headers;
        const user =  jwtTokens.verifyToken(req,res);
        const result = await AuthService.logout(user.id);
        if (!result) {
            return error("", 'Error logging out', 400)(res);
        }
        return success({}, 'Logout successful', 200)(res);
    } catch (error) {
        console.error(error);
        return error("","Internal Server Error")(res);
    }
};
// const refreshToken = async (req, res) => {
//     try {
//         const { refreshToken } = req.payload;
//         const newTokens = await JWTToken.createTokens(refreshToken);
//         if (!newTokens) {
//             return res.response({ error: 'Invalid refresh token' }).code(401);
//         }
//         return res.response({ message: 'Tokens refreshed successfully', tokens: newTokens }).code(200);
//     } catch (error) {
//         console.error(error);
//         return res.response({ error: 'Internal Server Error' }).code(500);
//     }
// };


export default {
    signupSuperAdmin,
    login,
    resetPassword,
    logout,
    // refreshToken,
    
}