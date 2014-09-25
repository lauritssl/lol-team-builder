angular.module('models.game', ['lodash', 'services', 'ngSails',])

.service('GameModel', function($q, lodash, utils, $sails) {
	this.getAll = function() {
		var deferred = $q.defer();
		var url = utils.prepareUrl('game');

		$sails.get(url, function(models) {
			return deferred.resolve(models);
		});

		return deferred.promise;
	};
	this.getOne = function(id) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('game/' + id);

		$sails.get(url, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};

	this.create = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('game');
		console.log("start creating");
		$sails.post(url, newModel, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};

	this.addUser = function(gameId, userId) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('game/'+gameId+'/user');
		$sails.post(url, {user: userId}, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};

	this.addUserToSpot = function(gameId, userId, spotId) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('game/'+gameId+'/spot/'+spotId+'/user');
		$sails.post(url, {user: userId}, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
	this.removeUser = function(gameId, userId) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('game/'+gameId+'/user');
		$sails.delete(url, {user: userId}, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};

	this.delete = function(model) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('game/' + model.id);

		$sails.delete(url, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};

	this.rollBuilds = function(gameId){
		var deferred = $q.defer();
		var url = utils.prepareUrl('game/'+gameId+'/build');
		$sails.post(url, {}, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	}
});