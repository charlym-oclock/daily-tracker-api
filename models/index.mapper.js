// Client
const client = require('./pg.client');

// Mappers
const User = require('./user.mapper');
const Task = require('./task.mapper');
const Calendar = require('./calendar.mapper');
const DayTask = require('./day.task.mapper');
const DayModel = require('./model.mapper');
const CoreDatamapper = require('./core.mapper');

module.exports = {
  UserMapper: new User(client),
  TaskMapper: new Task(client),
  CalendarMapper: new Calendar(client),
  DayTaskMapper: new DayTask(client),
  DayModelMapper: new DayModel(client),
  CoreDatamapper: new CoreDatamapper(client)
};