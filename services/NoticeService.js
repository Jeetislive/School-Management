import { NoticeBoard } from "../models/NoticeBoard.js";


const createNotice = async (notice, userId, schoolId, classId, departmentId, status, publishedAt, file) => {
    try {
        const existingNotice = await NoticeBoard.findOne({ where: { notice, publishedAt, schoolId } });
        if (existingNotice) {
            console.log('Notice already exists:', existingNotice);
            return null; // or throw an error if you prefer
        }
        const creteNotice = await NoticeBoard.create({ notice, userId, schoolId, classId, departmentId, status, publishedAt, file });
        return creteNotice;
    } catch (err) {
        console.err('Error creating notice:', err);
        return null;
    }
};
const getAllNotices = async (schoolId) => {
    try {
        const notices = await NoticeBoard.findAll(
            { where: { schoolId } }
        );
        return notices;
    } catch (err) {
        console.error('Error fetching notices:', err);
        return null;
    }
};
const getNoticeById = async (id,schoolId) => {
    try {
        const notice = await NoticeBoard.findOne({ where: { id, schoolId } });
        return notice;
    } catch (err) {
        console.error('Error fetching notice:', err);
        return null;
    }
};
const updateNotice = async (id, notice, userId, schoolId, classId, departmentId, status, publishedAt, file) => {
    try {
        const updateNotice = await NoticeBoard.findOne({ where: { id } });
        if (!updateNotice) {
            return null;
        }
        updateNotice.notice = notice || notice.notice;
        updateNotice.userId = userId || notice.userId;
        updateNotice.schoolId = schoolId || notice.schoolId;
        updateNotice.classId = classId || notice.classId;
        updateNotice.departmentId = departmentId || notice.departmentId;
        updateNotice.status = status || notice.status;
        updateNotice.publishedAt = publishedAt || notice.publishedAt;
        updateNotice.file = file || notice.file;
        await updateNotice.save();
        return updateNotice;
    } catch (err) {
        console.error('Error updating notice:', err);
        return null;
    }
};
const deleteNotice = async (id) => {
    try {
        const notice = await NoticeBoard.findOne({ where: { id } });
        if (!notice) {
            return null;
        }
        await notice.destroy();
        return notice;
    } catch (err) {
        console.error('Error deleting notice:', err);
        return null;
    }
};
export default {
    createNotice,
    getAllNotices,
    getNoticeById,
    updateNotice,
    deleteNotice,
};