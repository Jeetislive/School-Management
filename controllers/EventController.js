import { statusCodes } from "../config/constants.js";
import EventService from "../services/EventService.js";
import { error, success } from "../utils/responseHelper.js";

const createEvent = async (req, res) => {
    try {
        const { title, description, date, startTime, classId, schoolId } = req.payload;
        // console.log("req.payload",req.payload);
        
        const event = await EventService.createEvent(title, description, date, startTime, classId, schoolId);
        // console.log("Event:",event);
        
        if (!event) {
            return error("", 'Error creating event', statusCodes.BAD_REQUEST)(res);
        }
        return success({event}, 'Event created successfully', statusCodes.NEW_RESOURCE)(res);
    } catch (err) {
        console.log('Error creating event:', err);
        // console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getAllEvents = async (req, res) => {
    try {
        const { schoolId } = req.params;
        const events = await EventService.getAllEvents(schoolId);
        if (!events) {
            return error("", 'Error fetching events', statusCodes.BAD_REQUEST)(res);
        }
        return success({events}, 'Events fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const getEventById = async (req, res) => {
    try {
        const { id,schoolId } = req.params;
        const event = await EventService.getEventById(id,schoolId);
        if (!event) {
            return error("", 'Error fetching event', statusCodes.BAD_REQUEST)(res);
        }
        return success({event}, 'Event fetched successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, startTime, classId, schoolId } = req.payload;
        const event = await EventService.updateEvent(id, title, description, date, startTime, classId, schoolId);
        if (!event) {
            return error("", 'Error updating event', statusCodes.BAD_REQUEST)(res);
        }
        return success({event}, 'Event updated successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await EventService.deleteEvent(id);
        if (!result) {
            return error("", 'Error deleting event', statusCodes.BAD_REQUEST)(res);
        }
        return success({}, 'Event deleted successfully', statusCodes.SUCCESS)(res);
    } catch (err) {
        console.log(err);
        return error("","Internal Server Error",statusCodes.SERVER_ISSUE)(res);
    }
};
export default {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};