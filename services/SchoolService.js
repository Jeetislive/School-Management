import { db } from "../db/db.js";
const { School } = db;

const createSchool = async (name, address, contactEmail, isActive) => {
    try {
        // Check if the school already exists
        const existingSchool = await School.findOne({ where: { name } });
        if (existingSchool) {
            console.log('School already exists:', name);
            return null;
        }
        const school = await School.create({
            name,
            address,
            contactEmail,
            isActive: isActive || true,
        });
        return school;
    } catch (error) {
        console.error('Error creating school:', error);
        return null;
    }
};
const getAllSchools = async () => {
    try {
        const schools = await School.findAll();
        return schools;
    } catch (error) {
        console.error('Error fetching schools:', error);
        return null;
    }
};
const getSchoolById = async (id) => {
    try {
        const school = await School.findOne({ where: { id } });
        return school;
    } catch (error) {
        console.error('Error fetching school:', error);
        return null;
    }
};
const updateSchool = async (id, name, address, contactEmail, isActive) => {
    try {
        const school = await School.findOne({ where: { id } });
        if (!school) {
            console.log('School not found:', id);
            return null;
        }
        school.name = name || school.name;
        school.address = address || school.address;
        school.contactEmail = contactEmail || school.contactEmail;
        school.isActive = isActive || school.isActive;
        await school.save();
        return school;
    } catch (error) {
        console.error('Error updating school:', error);
        return null;
    }
};
const deleteSchool = async (id) => {
    try {
        const school = await School.findOne({ where: { id } });
        if (!school) {
            console.log('School not found:', id);
            return null;
        }
        await school.destroy();
        return true;
    } catch (error) {
        console.error('Error deleting school:', error);
        return null;
    }
};

export default {
    createSchool,
    getAllSchools,
    getSchoolById,
    updateSchool,
    deleteSchool,
};