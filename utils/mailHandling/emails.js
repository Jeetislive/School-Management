import nodemailer from "nodemailer";
import dotenv from "dotenv"
import { INVITATION_EMAIL_TEMPLATE } from "./emailTemplate.js";

dotenv.config();
export const sendInviteEmail = async (name,role,email,tempPassword) => {
    const organizationName = process.env.ORGANIZATION_NAME || "School Management System";
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: `"${organizationName}" <${process.env.EMAIL}>`,
        to: email,
        subject: "Invitation Mail!",
        html: INVITATION_EMAIL_TEMPLATE({
            name: name,
            role: role,
            email: email,
            tempPassword: tempPassword,
          })
    } 

    transporter.sendMail(mailOptions, (error,info) => {
        if(error) {
            console.log("Error sending Invitation email", error);
        } else {
            console.log("Email sent successfully", info.response);
        }
    })
}
export const sendNotificationEmail = async (email, name, requesterName, bloodGroup, contact) => {
    const url = process.env.CLIENT_URL || "http://localhost:5173"; // replace with your client URL
    const organizationName = process.env.ORGANIZATION_NAME || "BloodLine";
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: `"${organizationName}" <${process.env.EMAIL}>`,
        to: email,
        subject: "Blood Request Notification",
        html: Notification_Email_Template.replace("[Donor Name]", name).replace("[Requester Name]", requesterName).replace("[accepter]", requesterName).replace("[Blood Group]", bloodGroup).replace("[Requester Number]", contact).replace("[BloodLine Website URL]", url)
    } 

    transporter.sendMail(mailOptions, (error,info) => {
        if(error) {
            console.error("Error sending Notification email", error);
            throw new AppError(`Error sending Notification email ${error}`)
        } else {
            console.log("Email sent successfully", info.response);
        }
    })
}
export const sendRequestSubmissionEmail = async (email,name, donors) => {
    const url = process.env.CLIENT_URL || "http://localhost:5173"; // replace with your client URL
    const organizationName = process.env.ORGANIZATION_NAME || "BloodLine";
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    // console.log(name);
    
    const mailOptions = {
        from: `"${organizationName}" <${process.env.EMAIL}>`,
        to: email,
        subject: "Blood Request Submission",
        html: Request_Submission_Email_Template.replace("[Requester Name]", name).replace("[Donor 1]", donors[0].name).replace("[phone 1]", donors[0].phone).replace("[BloodLine Website URL]", url)
    };
    transporter.sendMail(mailOptions, (error,info) => {
        if(error) {
            console.error("Error sending Successful Blood Request email", error);
            throw new AppError(`Error sending Successful Blood Request email ${error}`)
        } else {
            console.log("Email sent successfully", info.response);
        }
    });
}
