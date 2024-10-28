const dateUtilityService = {

  // This method returns the weekday from a given date
  getWeekDayFromDate: function (date) {
    // Assuming date is a JavaScript Date object
    return date.getDay();  // 0 (Sunday) to 6 (Saturday)
  },

  // This method returns the week ID (or number) from a given date
  getWeekNumberFromDate: function (date) {
    // You can use any logic here that you want for determining the week number of the year
    // Here's a simple example:
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const millisSinceStartOfYear = date - startOfYear;
    const millisInAWeek = 7 * 24 * 60 * 60 * 1000;
    return Math.floor(millisSinceStartOfYear / millisInAWeek);
  },

  // Validates if a given date string matches the format YYYY-MM-DD
  isValidDateFormat: function (dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    // Check format
    if (!regex.test(dateString)) {
      return false;
    }

    // Check for actual date validity (e.g., no February 30)
    const date = new Date(dateString);
    const dateComponents = dateString.split('-').map(Number);

    // Comparing year, month (0-indexed in JS), and day
    if (dateComponents[0] !== date.getFullYear() ||
      dateComponents[1] !== date.getMonth() + 1 ||
      dateComponents[2] !== date.getDate()) {
      return false;
    }

    return true;
  }
};

module.exports = dateUtilityService;