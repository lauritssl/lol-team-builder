module.exports.crontab = {

  /*
   * The asterisks in the key are equivalent to the
   * schedule setting in crontab, i.e.
   * minute hour day month day-of-week year
   * so in the example below it will run every minute
   */

  '*/5 * * * *' : function(){
      var job = require('../api/jobs/delete-old-games.js').run();
      var test = job;
  }
};