import bcrypt from 'bcryptjs';
import { db } from "../db/db.js";
const { RefreshToken, User ,Role } = db;


const signup = async (username,firstName, lastName, email, password, tempPassword, schoolId, address, phone, specialization, rollNumber, role, parentEmail, isActive, isTempPassword, system_defined, departmentId, profilePicture, gender, dateOfBirth) => {
    try {
        console.log(username,firstName, lastName, email, password, tempPassword, schoolId, address, phone, specialization, rollNumber, role, parentEmail, isActive, isTempPassword, system_defined, departmentId, profilePicture, gender, dateOfBirth);
        
        const hashedPassword = await bcrypt.hash(password, 10);
        tempPassword = Math.random().toString(36).slice(-8);
        const tempPasswordHash = await bcrypt.hash(tempPassword, 10);
        // Check if the user already exists 
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log('User already exists:', email);
            return null;
        }
        const userCount = await User.count();
        console.log(userCount);
        
        if (userCount < 1) {
            console.log('Super admin already exists');
            return null;
        }else {
            isTempPassword = "";
            system_defined = true;
            console.log(role)
        }
        // Check if the role is valid (assuming you have a Role model)
        const roleName = await Role.findOrCreate({
            where: { title: role },
            defaults: { title: role, schoolId: schoolId || null },
        });
        // Create the user
        const user = await User.create({
            username: firstName + lastName,
            firstName,
            lastName,
            email,
            password: userCount === 0 ? hashedPassword : tempPasswordHash,
            tempPassword: userCount === 0 ? "" : tempPassword,
            schoolId,
            address,
            phone,
            specialization,
            rollNumber,
            roleId: roleName[0].id,
            parentEmail,
            isActive: isActive || true,
            isTempPassword: !(userCount === 0),
            system_defined: (userCount === 0),
            departmentId,
            profilePicture,
            gender,
            dateOfBirth,
        });
        return user;
    } catch (error) {
        console.error('Error signing up super admin:', error);
        return null;
    }

};
const login = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('User not found:', email);
            return null;
        }
        console.log(user.password);
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password for user:', email);
            return null;
        }
        return user;
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}
const refreshToken = async (id,refreshToken) => {
    try {
        const user = await RefreshToken.findOne({ where: { userId: id } });
        // console.log("User:",user);
        
        if (user) {
            const updatedToken = await RefreshToken.update(
                { token: refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }, // Set expiration date (7 days from now)
                { where: { userId: id } }
            );
            if (!updatedToken) {
                console.log('Failed to update refresh token for user:', id);
            }
            return updatedToken;
        }
        // If the refresh token is not found, create a new one
        const newToken = await RefreshToken.create({
            userId: id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set expiration date (7 days from now)
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
}
const logout = async (id) => {
    try {
        const result = await RefreshToken.destroy({ where: { userId: id } });
        console.log('User logged out:', id);
        return result;
    } catch (error) {
        console.error('Error logging out:', error);
    }
}
const resetPassword = async (email, newPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await User.update({ password: hashedPassword }, { where: { email } });
        if (result[0] === 0) {
            console.log('User not found for password reset:', email);
            return null;
        }
        return result;
    } catch (error) {
        console.error('Error resetting password:', error);
        return null;
    }
}
export default {
    signup,
    login,
    refreshToken,
    resetPassword,
    logout,
};