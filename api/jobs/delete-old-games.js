
 var moment = require('moment');

module.exports = {
    run : function(){

    	var twoHoursAgo = moment().subtract(2, 'hours').format();
    	var filter = {

    		updatedAt: { '<': new Date(twoHoursAgo)}
    	};

        return Game.destroy(filter)
		.then(function (result) {

		});
    }
};
