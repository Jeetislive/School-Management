import { Degree } from "../models/Degree.js";

const createDegree = async (name, schoolId) => {
    try {
        const existingDegree = await Degree.findOne({ where: { name, schoolId } });
        if (existingDegree) {
            console.log('Degree already exists:', existingDegree);
            return null; // or throw an error if you prefer
        }
        const degree = await Degree.create({ name, schoolId });
        return degree;
    } catch (err) {
        console.err('Error creating degree:', err);
        return null;
    }
};
const getAllDegrees = async (schoolId) => {
    try {
        const degrees = await Degree.findAll(
            { where: { schoolId } }
        );
        return degrees;
    } catch (err) {
        console.error('Error fetching degrees:', err);
        return null;
    }
};
const getDegreeById = async (id,schoolId) => {
    try {
        const degree = await Degree.findOne({ where: { id, schoolId } });
        return degree;
    } catch (err) {
        console.error('Error fetching degree:', err);
        return null;
    }
};
const updateDegree = async (id, name, schoolId) => {
    try {
        const degree = await Degree.findOne({ where: { id } });
        if (!degree) {
            return null;
        }
        degree.name = name || degree.name;
        degree.schoolId = schoolId || degree.schoolId;
        await degree.save();
        return degree;
    } catch (err) {
        console.error('Error updating degree:', err);
        return null;
    }
};
const deleteDegree = async (id) => {
    try {
        const degree = await Degree.findOne({ where: { id } });
        if (!degree) {
            return null;
        }
        await degree.destroy();
        return degree;
    } catch (err) {
        console.error('Error deleting degree:', err);
        return null;
    }
};
export default {
    createDegree,
    getAllDegrees,
    getDegreeById,
    updateDegree,
    deleteDegree,
};