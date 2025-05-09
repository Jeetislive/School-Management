import { db } from "../db/db.js";
const { ClassSchedule } = db;


const createClassSchedule = async (classId, teacherId, schoolId, subjectId, date, startTime, endTime) => {
    try {
        const existingClassSchedule = await ClassSchedule.findOne({ where: { classId, date, schoolId } });
        if (existingClassSchedule) {
            console.log('ClassSchedule already exists:', existingClassSchedule);
            return null; // or throw an log if you prefer
        }
        const classSchedule = await ClassSchedule.create({ classId, teacherId, schoolId, subjectId, date, startTime, endTime });
        return classSchedule;
    } catch (err) {
        console.log('Error creating classSchedule:', err);
        return null;
    }
};
const getAllClassSchedules = async (schoolId) => {
    try {
        const classSchedules = await ClassSchedule.findAll(
            { where: { schoolId } }
        );
        // Map through schedules to add weekday information
        const schedulesWithWeekday = classSchedules.map(schedule => {
            const scheduleJson = schedule.toJSON();
            const dateObj = new Date(scheduleJson.date);
            const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
            return {
            ...scheduleJson,
            weekday
            };
        });
        return schedulesWithWeekday;

    } catch (err) {
        console.log('Error fetching classSchedules:', err);
        return null;
    }
};
const getClassScheduleById = async (id,schoolId) => {
    try {
        const classSchedule = await ClassSchedule.findOne({ where: { id, schoolId } });
        // Convert date to weekday
        const date = new Date(classSchedule.date);
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., "Friday"

        // Add weekday to response
        const result = {
        ...classSchedule.toJSON(),
        weekday,
        };
        return result;
    } catch (err) {
        console.log('Error fetching classSchedule:', err);
        return null;
    }
};
const getClassScheduleByClassId = async (classId,schoolId) => {
    try {
        const classSchedule = await ClassSchedule.findAll({ where: { classId, schoolId } });
        // Map through schedules to add weekday information
        const schedulesWithWeekday = classSchedule.map(schedule => {
            const scheduleJson = schedule.toJSON();
            const dateObj = new Date(scheduleJson.date);
            const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
            return {
            ...scheduleJson,
            weekday
            };
        });
        return schedulesWithWeekday;
    } catch (err) {
        console.log('Error fetching classSchedule:', err);
        return null;
    }
};
const updateClassSchedule = async (id, classId, teacherId, schoolId, subjectId, date, startTime, endTime) => {
    try {
        const classSchedule = await ClassSchedule.findOne({ where: { id } });
        if (!classSchedule) {
            return null;
        }
        classSchedule.classId = classId || classSchedule.classId;
        classSchedule.teacherId = teacherId || classSchedule.teacherId;
        classSchedule.schoolId = schoolId || classSchedule.schoolId;
        classSchedule.subjectId = subjectId || classSchedule.subjectId;
        classSchedule.date = date || classSchedule.date;
        classSchedule.startTime = startTime || classSchedule.startTime;
        classSchedule.endTime = endTime || classSchedule.endTime;
        await classSchedule.save();
        return classSchedule;
    } catch (err) {
        console.log('Error updating classSchedule:', err);
        return null;
    }
};
const deleteClassSchedule = async (id) => {
    try {
        const classSchedule = await ClassSchedule.findOne({ where: { id } });
        if (!classSchedule) {
            return null;
        }
        await classSchedule.destroy();
        return classSchedule;
    } catch (err) {
        console.log('Error deleting classSchedule:', err);
        return null;
    }
};
export default {
    createClassSchedule,
    getAllClassSchedules,
    getClassScheduleById,
    getClassScheduleByClassId,
    updateClassSchedule,
    deleteClassSchedule,
};