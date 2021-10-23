const express = require('express');
const {
  updateReminder,
  makeAnnouncement,
  makeEvent,
  makeReminder,
  updateAnnouncement,
  updateEvent,
  deleteAnnouncement,
  deleteEvent,
  deleteReminder,
  getAllAnnouncement,
  getAllEvent,
  getAllReminder,
  getAnnouncementById,
  getEventById,
  getReminderById,
} = require('../controllers/dashboard');

// Middleware
const { authorize } = require('../middlewares/authorize');

const router = express.Router();

// CREATE A NEW CONTENT

router.route('/make-announcement').post(authorize, makeAnnouncement);

router.route('/make-event').post(authorize, makeEvent);

router.route('/make-reminder').post(authorize, makeReminder);

// GET ALL CONTENT FROM DB

router.route('/announcement').get(authorize, getAllAnnouncement);

router.route('/event').get(authorize, getAllEvent);

router.route('/reminder').get(authorize, getAllReminder);

// GET, DELETE, UPDATE CONTENT BY ID

router
  .route('/announcement/:id')
  .get(authorize, getAnnouncementById)
  .patch(authorize, updateAnnouncement)
  .delete(authorize, deleteAnnouncement);

router
  .route('/event/:id')
  .get(authorize, getEventById)
  .patch(authorize, updateEvent)
  .delete(authorize, deleteEvent);

router
  .route('/reminder/:id')
  .get(authorize, getReminderById)
  .patch(authorize, updateReminder)
  .delete(authorize, deleteReminder);

module.exports = router;
