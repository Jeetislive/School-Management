
import AuthService from "../services/AuthService.js";
import InviteService from "../services/InviteService.js";
import { sendInviteEmail } from "../utils/mailHandling/emails.js";
import { success,error } from "../utils/responseHelper.js";
import ClassStudentController from "./ClassStudentController.js";

const invite = async (req, res) => {
    try {
        let classStudentCreation;
        const { firstName, lastName, email, password, tempPassword, schoolId, address, phone, specialization, rollNumber, role, parentEmail, isActive, isTempPassword, system_defined, departmentId, profilePicture, gender, dateOfBirth, classId } = req.payload;
        const senderId = req.auth.credentials.id;
        const username =  firstName + lastName;
        // console.log("req.payload",req.payload);
        const user = await AuthService.signup(username,firstName, lastName, email, password, tempPassword, schoolId, address, phone, specialization, rollNumber, role, parentEmail, isActive, isTempPassword, system_defined, departmentId, profilePicture, gender, dateOfBirth);
        if (!user) {
            return error("", `Error inviting ${role}`, 400)(res);
        }
        const inviteUser = await InviteService.invite(senderId,user.id, user.schoolId, user.roleId, user.createdAt);
        // console.log("InviteUser:",inviteUser);
        if (!inviteUser) {
            return error("", `Error inviting ${role}`, 400)(res);
        }
        if(role === "student") {
            classStudentCreation = await ClassStudentController.createClassStudent(schoolId , classId );
        }


        await sendInviteEmail(firstName, role, email, user.tempPassword);
        // console.log("InviteUser:",inviteUser);
        return success({user}, `${role} invited successfully`, 201)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error")(res);
    }
};
const getAllInvites = async (req, res) => {
    try {
        const invites = await InviteService.getAllInvites();
        if (!invites) {
            return error("", 'Error fetching invites', 400)(res);
        }
        return success({invites}, 'Invites fetched successfully', 200)(res);
    } catch (error) {
        console.error(error);
        return error("","Internal Server Error")(res);
    }
};
const getInviteById = async (req, res) => {
    try {
        const { id } = req.params;
        const invite = await InviteService.getInviteById(id);
        if (!invite) {
            return error("", 'Error fetching invite', 400)(res);
        }
        return success({invite}, 'Invite fetched successfully', 200)(res);
    } catch (error) {
        console.error(error);
        return error("","Internal Server Error")(res);
    }
};
const deleteInvite = async (req, res) => {
    try {
        const { id } = req.params;
        const invite = await InviteService.deleteInvite(id);
        if (!invite) {
            return error("", 'Error deleting invite', 400)(res);
        }
        return success({invite}, 'Invite deleted successfully', 200)(res);
    } catch (error) {
        console.error(error);
        return error("","Internal Server Error")(res);
    }
};

export default {
    invite,
    getAllInvites,
    getInviteById,
    deleteInvite,
}