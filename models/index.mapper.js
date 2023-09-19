// Client
const client = require('./pg.client');

// Mappers
const User = require('./user.mapper');
const Task = require('./task.mapper');
const Calendar = require('./calendar.mapper');
const UserDay = require('./userday.mapper');
const DayModel = require('./dayModel.mapper');
const CoreDatamapper = require('./core.mapper');

module.exports = {
  UserMapper: new User(client),
  TaskMapper: new Task(client),
  CalendarMapper: new Calendar(client),
  UserDayMapper: new UserDay(client),
  DayModelMapper: new DayModel(client),
  CoreDatamapper: new CoreDatamapper(client)
};