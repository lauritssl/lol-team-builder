/**
 * AboutController
 *
 * @description :: Server-side logic for managing abouts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
		index: function(req, res) {

		

		res.view({
			title: 'About',
      request: req
		});
	}
};

