import { School } from "../models/School.js";
import { Subject } from "../models/Subject.js";

const createSubject = async (name, code, schoolId) => {
    try {
        const existingSubject = await Subject.findOne({ where: { name, schoolId } });
        if (existingSubject) {
            console.log('Subject already exists:', existingSubject);
            return null; // or throw an error if you prefer
        }
        const subject = await Subject.create({ name, code, schoolId },{include: {
            model: School
        }});
        return subject;
    } catch (err) {
        console.log('Error creating subject:', err);
        return null;
    }
};
const getAllSubjects = async (schoolId) => {
    try {
        const subjects = await Subject.findAll(
            { where: { schoolId } }
        );
        return subjects;
    } catch (err) {
        console.error('Error fetching subjects:', err);
        return null;
    }
};
const getSubjectById = async (id,schoolId) => {
    try {
        const subject = await Subject.findOne({ where: { id, schoolId } });
        return subject;
    } catch (err) {
        console.error('Error fetching subject:', err);
        return null;
    }
};
const updateSubject = async (id, name, code, schoolId) => {
    try {
        const subject = await Subject.findOne({ where: { id } });
        if (!subject) {
            return null;
        }
        subject.name = name || subject.name;
        subject.code = code || subject.code;
        subject.schoolId = schoolId || subject.schoolId;
        await subject.save();
        return subject;
    } catch (err) {
        console.error('Error updating subject:', err);
        return null;
    }
};
const deleteSubject = async (id) => {
    try {
        const subject = await Subject.findOne({ where: { id } });
        if (!subject) {
            return null;
        }
        await subject.destroy();
        return subject;
    } catch (err) {
        console.error('Error deleting subject:', err);
        return null;
    }
};
export default {
    createSubject,
    getAllSubjects,
    getSubjectById,
    updateSubject,
    deleteSubject,
};