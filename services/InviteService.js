import { Invite } from "../models/Invite.js";

const invite = async (senderId, receiverId, schoolId, roleId, createdAt) => {
    try {
        // Check if the invite already exists
        const existingInvite = await Invite.findOne({ where: { senderId, receiverId } });
        if (existingInvite) {
            // update resendCount and createdAt
            existingInvite.resendCount += 1;
            existingInvite.createdAt = createdAt || new Date();
            await existingInvite.save();
            return existingInvite;
        }else {
            // Create a new invite
            const invite = await Invite.create({
                senderId,
                receiverId,
                schoolId,
                roleId,
                status: 'pending',
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiration
                resendCount: 0,
                createdAt: createdAt || new Date(),
            });
            return invite;
        }
    } catch (er) {
        console.log('Error inviting:', er);
        return null; // Return null if there was an error
    }
}

export default {
    invite,
    // getAllInvites,
    // getInviteById,
    // deleteInvite,
    // Other functions can be added here as needed
};