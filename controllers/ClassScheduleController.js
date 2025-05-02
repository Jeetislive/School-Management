import { statusCodes } from "../config/constants.js";
import ClassScheduleService from "../services/ClassScheduleService.js";
import { error, success } from "../utils/responseHelper.js";

const createClassSchedule = async (req, res) => {
    try {
        const { classId, teacherId, schoolId, subjectId, date, startTime, endTime  } = req.payload;
        // console.log("req.payload",req.payload);
        
        const classSchedule = await ClassScheduleService.createClassSchedule(classId, teacherId, schoolId, subjectId, date, startTime, endTime);
        // console.log("ClassSchedule:",classSchedule);
        
        if (!classSchedule) {
            return error("", 'Error creating classSchedule', statusCodes.BAD_REQUEST)(res);
        }
        return success({classSchedule}, 'ClassSchedule created successfully', statusCodes.NEW_RESOURCE)(res);
    } catch (err) {
        console.log('Error creating classSchedule:', err);
        // console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getAllClassSchedules = async (req, res) => {
    try {
        const { schoolId } = req.params;
        const classSchedules = await ClassScheduleService.getAllClassSchedules(schoolId);
        if (!classSchedules) {
            return error("", 'Error fetching classSchedules', statusCodes.BAD_REQUEST)(res);
        }
        return success({classSchedules}, 'ClassSchedules fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getClassScheduleById = async (req, res) => {
    try {
        const { id,schoolId } = req.params;
        const classSchedule = await ClassScheduleService.getClassScheduleById(id,schoolId);
        if (!classSchedule) {
            return error("", 'Error fetching classSchedule', statusCodes.BAD_REQUEST)(res);
        }
        return success({classSchedule}, 'ClassSchedule fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getClassScheduleByClassId = async (req, res) => {
    try {
        const { classId,schoolId } = req.params;
        const classSchedule = await ClassScheduleService.getClassScheduleByClassId(classId,schoolId);
        if (!classSchedule) {
            return error("", 'Error fetching classSchedule', statusCodes.BAD_REQUEST)(res);
        }
        return success({classSchedule}, 'ClassSchedule fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};

const updateClassSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { classId, teacherId, schoolId, subjectId, date, startTime, endTime } = req.payload;
        const classSchedule = await ClassScheduleService.updateClassSchedule(id, classId, teacherId, schoolId, subjectId, date, startTime, endTime);
        if (!classSchedule) {
            return error("", 'Error updating classSchedule', statusCodes.BAD_REQUEST)(res);
        }
        return success({classSchedule}, 'ClassSchedule updated successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const deleteClassSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ClassScheduleService.deleteClassSchedule(id);
        if (!result) {
            return error("", 'Error deleting classSchedule', statusCodes.BAD_REQUEST)(res);
        }
        return success({}, 'ClassSchedule deleted successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
export default {
    createClassSchedule,
    getAllClassSchedules,
    getClassScheduleById,
    getClassScheduleByClassId,
    updateClassSchedule,
    deleteClassSchedule
};