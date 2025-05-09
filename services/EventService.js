import { db } from "../db/db.js";
const { Event } = db;

const createEvent = async ( title, description, date, startTime, classId, schoolId) => {
    try {
        const existingEvent = await Event.findOne({ where: { title, classId, schoolId } });
        if (existingEvent) {
            console.log('Event already exists:', existingEvent);
            return null; // or throw an error if you prefer
        }
        const event = await Event.create({ title, description, date, startTime, classId, schoolId });
        return event;
    } catch (err) {
        console.err('Error creating event:', err);
        return null;
    }
};
const getAllEvents = async (schoolId) => {
    try {
        const events = await Event.findAll(
            { where: { schoolId } }
        );
        return events;
    } catch (err) {
        console.error('Error fetching events:', err);
        return null;
    }
};
const getEventById = async (id,schoolId) => {
    try {
        const event = await Event.findOne({ where: { id, schoolId } });
        return event;
    } catch (err) {
        console.error('Error fetching event:', err);
        return null;
    }
};
const updateEvent = async (id, title, description, date, startTime, classId, schoolId) => {
    try {
        const event = await Event.findOne({ where: { id } });
        if (!event) {
            return null;
        }
        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.startTime = startTime || event.startTime;
        event.classId = classId || event.classId;
        event.schoolId = schoolId || event.schoolId;
        await event.save();
        return event;
    } catch (err) {
        console.error('Error updating event:', err);
        return null;
    }
};
const deleteEvent = async (id) => {
    try {
        const event = await Event.findOne({ where: { id } });
        if (!event) {
            return null;
        }
        await event.destroy();
        return event;
    } catch (err) {
        console.error('Error deleting event:', err);
        return null;
    }
};
export default {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
};