import { Experience } from "../models/Experience.js";

const createExperience = async (organization_name, position, startDate, endDate, userId, schoolId) => {
    try {
        const existingExperience = await Experience.findOne({ where: { userId, schoolId } });
        if (existingExperience) {
            console.log('Experience already exists:', existingExperience);
            return null; // or throw an error if you prefer
        }
        const experience = await Experience.create({ organization_name, position, startDate, endDate, userId, schoolId });
        return experience;
    } catch (err) {
        console.err('Error creating experience:', err);
        return null;
    }
};
const getAllExperiences = async (schoolId) => {
    try {
        const experiences = await Experience.findAll(
            { where: { schoolId } }
        );
        return experiences;
    } catch (err) {
        console.error('Error fetching experiences:', err);
        return null;
    }
};
const getExperienceById = async (id,schoolId,userId) => {
    try {
        const experience = await Experience.findOne({ where: { id, schoolId, userId } });
        return experience;
    } catch (err) {
        console.error('Error fetching experience:', err);
        return null;
    }
};
const updateExperience = async (id, organization_name, position, startDate, endDate, userId, schoolId) => {
    try {
        const experience = await Experience.findOne({ where: { id } });
        if (!experience) {
            return null;
        }
        experience.organization_name = organization_name || experience.organization_name;
        experience.position = position || experience.position;
        experience.startDate = startDate || experience.startDate;
        experience.endDate = endDate || experience.endDate;
        experience.userId = userId || experience.userId;
        experience.schoolId = schoolId || experience.schoolId;
        await experience.save();
        return experience;
    } catch (err) {
        console.error('Error updating experience:', err);
        return null;
    }
};
const deleteExperience = async (id) => {
    try {
        const experience = await Experience.findOne({ where: { id } });
        if (!experience) {
            return null;
        }
        await experience.destroy();
        return experience;
    } catch (err) {
        console.error('Error deleting experience:', err);
        return null;
    }
};
export default {
    createExperience,
    getAllExperiences,
    getExperienceById,
    updateExperience,
    deleteExperience,
};