const createHttpError = require('http-errors');

const Announcement = require('../models/announcement');
const Event = require('../models/event');
const Reminder = require('../models/reminder');

// CREATE ANNOUCEMENT, EVENTS, REMINDERS

exports.makeAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.create({
      ...req.body,
      user: req.userId,
    });

    if (!announcement) throw createHttpError(400, 'server error');

    res.status(200).json({ result: announcement });
  } catch (err) {
    return next(createHttpError(err));
  }
};

exports.makeEvent = async (req, res, next) => {
  try {
    const event = await Event.create({
      ...req.body,
      user: req.userId,
    });

    if (!event) throw createHttpError(400, 'server error');

    res.status(200).json({ result: event });
  } catch (err) {
    return next(createHttpError(err));
  }
};

exports.makeReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.create({
      ...req.body,
      user: req.userId,
    });

    if (!reminder) throw createHttpError(400, 'server error');

    res.status(200).json({ result: reminder });
  } catch (err) {
    return next(createHttpError(err));
  }
};

// EDIT OR UPDATE ANNOUNCEMENT, EVENTS, REMINDERS

exports.updateAnnouncement = async (req, res, next) => {
  try {
    const findAnnouncement = await Announcement.findById(req.params.id);

    if (!findAnnouncement) throw createHttpError(404, 'not found');

    await findAnnouncement.updateOne({ ...req.body });

    res.status(200).json({ result: findAnnouncement });
  } catch (err) {
    return next(createHttpError(err));
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const findEvent = await Event.findById(req.params.id);

    if (!findEvent) throw createHttpError(404, 'not found');

    await findEvent.updateOne({ ...req.body });

    res.status(200).json({ result: findEvent });
  } catch (err) {
    return next(createHttpError(err));
  }
};

exports.updateReminder = async (req, res, next) => {
  try {
    const findReminder = await Reminder.findById(req.params.id);

    if (!findReminder) throw createHttpError(404, 'not found');

    await findReminder.updateOne({ ...req.body });

    res.status(200).json({ result: findReminder });
  } catch (err) {
    return next(createHttpError(err));
  }
};

// DELETE ANNOUNCEMENT, EVETNS, REMIDERS BY ID

exports.deleteAnnouncement = async (req, res, next) => {
  try {
    const findAnnouncement = await Announcement.findById(req.params.id);

    if (!findAnnouncement) throw createHttpError(404, 'not found');

    await findAnnouncement.deleteOne();

    res.status(200).json({ result: findAnnouncement });
  } catch (err) {
    return next(createHttpError(err));
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const findEvent = await Event.findById(req.params.id);

    if (!findEvent) throw createHttpError(404, 'not found');

    await findEvent.deleteOne();

    res.status(200).json({ result: findEvent });
  } catch (err) {
    return next(createHttpError(err));
  }
};

exports.deleteReminder = async (req, res, next) => {
  try {
    const findReminder = await Reminder.findById(req.params.id);

    if (!findReminder) throw createHttpError(404, 'not found');

    await findReminder.deleteOne();

    res.status(200).json({ result: findReminder });
  } catch (err) {
    return next(createHttpError(err));
  }
};

// GET ANNOUCEMENT, EVENTS, REMIDERS BY ID

exports.getAnnouncementById = async (req, res, next) => {
  try {
    const findAnnouncement = await Announcement.findById(
      req.params.id
    ).populate({
      path: 'user',
      select: ['email', 'firstName'],
    });

    if (!findAnnouncement) throw createHttpError(404, 'not found');

    res.status(200).json({ result: findAnnouncement });
  } catch (err) {
    return next(createHttpError(err));
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const findEvent = await Event.findById(req.params.id).populate({
      path: 'user',
      select: ['email', 'firstName'],
    });

    if (!findEvent) throw createHttpError(404, 'not found');

    res.status(200).json({ result: findEvent });
  } catch (err) {
    return next(createHttpError(err));
  }
};

exports.getReminderById = async (req, res, next) => {
  try {
    const findReminder = await Reminder.findById(req.params.id).populate({
      path: 'user',
      select: ['email', 'firstName'],
    });

    if (!findReminder) throw createHttpError(404, 'not found');

    res.status(200).json({ result: findReminder });
  } catch (err) {
    return next(createHttpError(err));
  }
};

// GET ALL ANNOUCEMENENT, EVENTS, REMINDERS AS ARRARY

exports.getAllAnnouncement = async (req, res, next) => {
  try {
    const findAnnouncement = await Announcement.find().populate({
      path: 'user',
      select: ['email', 'firstName'],
    });

    res.status(200).json({ result: findAnnouncement });
  } catch (err) {
    return next(createHttpError(err));
  }
};

exports.getAllEvent = async (req, res, next) => {
  try {
    const findEvent = await Event.find().populate({
      path: 'user',
      select: ['email', 'firstName'],
    });

    res.status(200).json({ result: findEvent });
  } catch (err) {
    return next(createHttpError(err));
  }
};

exports.getAllReminder = async (req, res, next) => {
  try {
    const findReminder = await Reminder.find().populate({
      path: 'user',
      select: ['email', 'firstName'],
    });

    res.status(200).json({ result: findReminder });
  } catch (err) {
    return next(createHttpError(err));
  }
};
