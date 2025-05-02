import { Education } from "../models/Education.js";

const createEducation = async (title, institute, startDate, endDate, certificate, userId) => {
    try {
        const existingEducation = await Education.findOne({ where: { userId } });
        if (existingEducation) {
            console.log('Education already exists:', existingEducation);
            return null; // or throw an error if you prefer
        }
        const education = await Education.create({ title, institute, startDate, endDate, certificate, userId });
        return education;
    } catch (err) {
        console.err('Error creating education:', err);
        return null;
    }
};
const getAllEducations = async () => {
    try {
        const educations = await Education.findAll();
        return educations;
    } catch (err) {
        console.error('Error fetching educations:', err);
        return null;
    }
};
const getEducationById = async (id,userId) => {
    try {
        const education = await Education.findOne({ where: { id, userId } });
        return education;
    } catch (err) {
        console.error('Error fetching education:', err);
        return null;
    }
};
const updateEducation = async (id, title, institute, startDate, endDate, certificate, userId) => {
    try {
        const education = await Education.findOne({ where: { id } });
        if (!education) {
            return null;
        }
        education.title = title || education.title;
        education.institute = institute || education.institute;
        education.startDate = startDate || education.startDate;
        education.endDate = endDate || education.endDate;
        education.certificate = certificate || education.certificate;
        education.userId = userId || education.userId;
        await education.save();
        return education;
    } catch (err) {
        console.error('Error updating education:', err);
        return null;
    }
};
const deleteEducation = async (id) => {
    try {
        const education = await Education.findOne({ where: { id } });
        if (!education) {
            return null;
        }
        await education.destroy();
        return education;
    } catch (err) {
        console.error('Error deleting education:', err);
        return null;
    }
};
export default {
    createEducation,
    getAllEducations,
    getEducationById,
    updateEducation,
    deleteEducation,
};