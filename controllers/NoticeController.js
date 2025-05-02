import { statusCodes } from "../config/constants.js";
import NoticeService from "../services/NoticeService.js";
import { error, success } from "../utils/responseHelper.js";

const createNotice = async (req, res) => {
    try {
        const { notice, userId, schoolId, classId, departmentId, status, publishedAt, file  } = req.payload;
        // console.log("req.payload",req.payload);
        
        const noticeBoard = await NoticeService.createNotice(notice, userId, schoolId, classId, departmentId, status, publishedAt, file);
        // console.log("Notice:",noticeBoard);
        
        if (!noticeBoard) {
            return error("", 'Error creating noticeBoard', statusCodes.BAD_REQUEST)(res);
        }
        return success({noticeBoard}, 'Notice created successfully', statusCodes.NEW_RESOURCE)(res);
    } catch (err) {
        console.log('Error creating noticeBoard:', err);
        // console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getAllNotices = async (req, res) => {
    try {
        const { schoolId } = req.params;
        const notices = await NoticeService.getAllNotices(schoolId);
        if (!notices) {
            return error("", 'Error fetching notices', statusCodes.BAD_REQUEST)(res);
        }
        return success({notices}, 'Notices fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getNoticeById = async (req, res) => {
    try {
        const { id,schoolId } = req.params;
        const notice = await NoticeService.getNoticeById(id,schoolId);
        if (!notice) {
            return error("", 'Error fetching notice', statusCodes.BAD_REQUEST)(res);
        }
        return success({notice}, 'Notice fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const updateNotice = async (req, res) => {
    try {
        const { id } = req.params;
        const { notice, userId, schoolId, classId, departmentId, status, publishedAt, file } = req.payload;
        const noticeBoard = await NoticeService.updateNotice(id, notice, userId, schoolId, classId, departmentId, status, publishedAt, file);
        if (!noticeBoard) {
            return error("", 'Error updating notice', statusCodes.BAD_REQUEST)(res);
        }
        return success({noticeBoard}, 'Notice updated successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const deleteNotice = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await NoticeService.deleteNotice(id);
        if (!result) {
            return error("", 'Error deleting notice', statusCodes.BAD_REQUEST)(res);
        }
        return success({}, 'Notice deleted successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
export default {
    createNotice,
    getAllNotices,
    getNoticeById,
    updateNotice,
    deleteNotice
};