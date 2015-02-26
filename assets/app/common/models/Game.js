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
		var url = utils.prepareUrl('game/' + id);

		return $sails.get(url)
			.then(function(response) {
				return response.data;
			})
			.catch(function(response){
				return response;
			});
	};

	this.create = function(newModel) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('game');

		$sails.post(url, newModel)
			.then(function(response){
				return deferred.resolve(response.data);
			})
			.catch(function(response){
				return deferred.reject(response.data);
			});

		return deferred.promise;
	};

	this.addUser = function(gameId, user) {
		var url = utils.prepareUrl('game/'+gameId+'/user');
		return $sails.post(url, {user: user}).then(function(model) {
			return model.data;
		})
		.catch(function(err){
			return err;
		});
	};

	this.addUserToSpot = function(gameId, userId, spotId) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('game/'+gameId+'/spot/'+spotId+'/user');
		$sails.post(url, {user: userId}, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};
	this.removeUserFromSpot = function(gameId, userId, spotId) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('game/'+gameId+'/spot/'+spotId+'/user/'+userId);
		$sails.delete(url, function(model) {
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
	};

	this.rollBuild = function(gameId, spotId){
		var deferred = $q.defer();
		var url = utils.prepareUrl('game/'+gameId+'/spot/'+spotId);

		$sails.put(url, {}, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	}

	this.drawCard = function(gameId, spotId){
		var url = utils.prepareUrl('game/'+gameId+'/spot/'+spotId + "/draw");

		return $sails.put(url, {}).then(function(model) {
			return model;
		});

	}

	this.resetBuilds = function(gameId) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('game/'+gameId+'/build/');

		$sails.delete(url, {}, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	}
});