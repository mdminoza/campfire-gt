import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
// import jwt from 'jsonwebtoken';
import Campfire from '../models/campfire.js';

export const fetchCampfires = async (req, res, next) => {
    try {
        const campfires = await Campfire.find(
            {
                createdAt: { 
                    $lt: new Date(), 
                    $gte: new Date(new Date().setDate(new Date().getDate()-1))
                },
            }
        );
        res.status(200).json(campfires);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

export const fetchPublicCampfires = async (req, res, next) => {
    const { cid, tpc } = req.query;
    const filterTopic = tpc ? { topic: { $regex: '^' + tpc, $options: 'i' } } : {}; 
    try {
        const campfires = await Campfire.find(
            {
                'creator.uid': { $ne: cid },
                openTo: 'Everyone',
                hidden: false,
                createdAt: { 
                    $lt: new Date(), 
                    $gte: new Date(new Date().setDate(new Date().getDate()-1)),
                },
                ...filterTopic,
            },
        );
        res.status(200).json(campfires);
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

export const fetchPrivateCampfires = async (req, res, next) => {
    const { cid, tpc } = req.query;
    const filterTopic = tpc ? { topic: { $regex: '^' + tpc, $options: 'i' } } : {}; 
    try {
        const campfires = await Campfire.find(
            {
                'creator.uid': { $ne: cid },
                openTo: 'Invite Only',
                hidden: false,
                createdAt: { 
                    $lt: new Date(), 
                    $gte: new Date(new Date().setDate(new Date().getDate()-1)),
                },
                ...filterTopic,
            },
        );
        res.status(200).json(campfires);
    } catch (error) {
        error.status = 400;
        next(error);
    }
}

export const fetchOwnCampfires = async (req, res, next) => {
    const { cid, tpc } = req.query;
    const filterTopic = tpc ? { topic: { $regex: '^' + tpc, $options: 'i' } } : {}; 
    try {
        const campfires = await Campfire.find(
            {
                'creator.uid': cid,
                createdAt: { 
                    $lt: new Date(), 
                    $gte: new Date(new Date().setDate(new Date().getDate()-1))
                },
                ...filterTopic,
            },
        );
        res.status(200).json(campfires);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

export const fetchCampfireById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const campfire = await Campfire.findOne(
            {
                _id: id,
                createdAt: { 
                    $lt: new Date(), 
                    $gte: new Date(new Date().setDate(new Date().getDate()-1))
                },
            },
            { members: 0 }
        );
        if (campfire === null) throw new Error('Campfire does not exist!');
        res.status(200).json(campfire);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

export const createCampfire = async (req, res, next) => {
    const { members, ...campfire } = req.body;
    const _id = new ObjectId();
    let campfireParams = {};

    if (members && members.length > 0) {
        const filteredMember = members.map(val => ({
            ...val,
            campfire: _id,   
        }));

        campfireParams = {
            ...campfire,
            members: filteredMember,
            _id,
        };
    } else {
        campfireParams = {
            ...campfire,
            _id,
        };
    }

    const newCampfire = new Campfire(campfireParams);
    try {
        await newCampfire.save();
        res.status(201).json(newCampfire);
    } catch (error) {
        next(error);
    }
};

export const updateCampfire = async (req, res, next) => {
    const { id: _id } = req.params;
    const campfire = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) throw new Error('Invalid id.');
        const updatedCampfire = await Campfire.findByIdAndUpdate(
            _id,
            campfire,
            { new: true, projection: { members: 0 }},
        );
        if (updatedCampfire === null) throw new Error('Campfire does not exist.');
        res.status(200).json(updatedCampfire);
    } catch (error) {
        next(error);
    }
};

export const deleteCampfire = async (req, res, next) => {
    const { id: _id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) throw new Error('Invalid id.');
        await Campfire.findByIdAndDelete(_id);
        res.status(200).json({ message: 'Campfire deleted successfully!' });
    } catch (error) {
        next(error);
    }
};

export const fetchCampfireMembers = async (req, res, next) => {
    const { id } = req.params;
    try {
        const campfire = await Campfire.findOne(
            {
                _id: id,
                createdAt: { 
                    $lt: new Date(), 
                    $gte: new Date(new Date().setDate(new Date().getDate()-1))
                },
            },
            { '_id': 0, members: 1 }
        );
        if (campfire === null) throw new Error('Campfire does not exist!');
        res.status(200).json(campfire.members);
    } catch (error) {
        next(error);
    }
};


export const addCampfireMember = async (req, res, next) => {
    try {
        const { member, id } = req.body;
        if (!id) throw new Error('id is required!');
        if (!member.profileUrl || !member.name || !member.campfire || !member.uid) {
            throw new Error('Member [profileUrl, name, campfire, uid] fields is required!');
        }
        const newMembers = await Campfire.findByIdAndUpdate(
            id,
            {
                $push: {
                    members: member
                },
            },
            { new: true, projection: { 'members': 1 } },
        )
        if (newMembers === null) throw new Error('Campfire does not exist.');
        const filter = newMembers.members.filter(item => item.uid == member.uid)?.[0];
        res.status(201).json(filter);
    } catch (error) {
        next(error);
    }
};

export const fetchCampfireMember = async (req, res, next) => {
    try {
        const { id, uid } = req.body
        if (!uid || !id) throw new Error('[uid, id] fields are required!');
        const data = await Campfire.findOne(
            {
                '_id': id,
                'members.uid': uid,
            },
            { '_id': 0, 'members': { '$elemMatch': { uid } } },
        );
        if (data === null) return res.status(200).json({ message: 'Campfire or user id does not exist.' });
        const filter = data.members[0];
        return res.status(200).json(filter);
    } catch (error) {
        next(error);
    }
};

const updateMember = async (id, uid, setObj) => {
    try {
        const updated = await Campfire.findOneAndUpdate(
            {
                '_id': id,
                'members.uid': uid,
            },
            {
                $set: setObj,
            },
            { new: true, projection: { 'members': 1 } },
        );
        return updated;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateCampfireMemberStatus = async (req, res, next) => {
    try {
        const { status, id, uid } = req.body
        if (!uid || !id || !status) throw new Error('[uid, id, status] fields are required!'); 
        const updatedData = await updateMember(
            id,
            uid,
            { 'members.$.status': status, }   
        );
        if (updatedData === null) throw new Error('Campfire or user id does not exist.');
        res.status(200).json({
            uid,
        });
    } catch (error) {
        next(error);
    }
};

export const updateCampfireMemberRole = async (req, res, next) => {
    try {
        const { role, id, uid } = req.body;
        if (!uid || !id || !role) throw new Error('[uid, id, role] fields are required!'); 
        const updatedData = await updateMember(
            id,
            uid,
            { 'members.$.role': role, }   
        );
        if (updatedData === null) throw new Error('Campfire or user id does not exist.');
        res.status(200).json({
            uid,
        });
    } catch (error) {
        next(error);
    }
};

export const removeCampfireMember = async (req, res, next) => {
    try {
        const { uid, id } = req.body;
        if (!uid || !id) throw new Error('[uid, id] fields are required!'); 
        const newMember = await Campfire.findByIdAndUpdate(
            id,
            {
                $pull: { members: { uid } },
            },
            { multi: true, new: true, projection: { members: 1 } },
        )
        if (newMember === null) throw new Error('Campfire or user id does not exist.');
        res.status(200).json({ uid, message: 'Member removed successfully!' });
    } catch (error) {
        next(error);
    }
};
