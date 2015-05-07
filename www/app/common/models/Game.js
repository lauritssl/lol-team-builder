angular.module('models.game', ['lodash', 'services', 'ngSails',])

.service('GameModel', function($q, lodash, utils, $sails) {
	this.getAll = function(_options) {



		var filter = {
			limit: _options.limit || 10, 
			skip: _options.skip || 0,
			name: _options.name
		};

		var deferred = $q.defer();
		var url = utils.prepareUrl('game');

		_.forEach(filter, function(value, key){
			if(typeof value !== 'undefined'){
				url = utils.addQueryParameter(url, key, value);
			}
		});
		

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

	this.addUser = function(gameId, user, password) {
		var url = utils.prepareUrl('game/'+gameId+'/user');
		return $sails.post(url, {user: user, password: password}).then(function(model) {
			return model.data;
		})
		.catch(function(err){
			throw err;
		});
	};

	this.addSpot = function(gameId) {
		var url = utils.prepareUrl('game/'+gameId+'/spot');
		return $sails.post(url,{}).then(function(model) {
			return model.data;
		})
		.catch(function(err){
			return err;
		});
	};

	this.addUserToSpot = function(gameId, userId, spotId) {
		var url = utils.prepareUrl('game/'+gameId+'/actions/addUserToSpot/');
		return $sails.put(url, {user: userId, spotId: spotId})
		.then(function(model) {
			return model.data;
		});

	};
	this.removeUserFromSpot = function(gameId, userId, spotId) {

		var url = utils.prepareUrl('game/'+gameId+'/actions/removeUserFromSpot/');
		return $sails.put(url, {spotId:spotId, userId: userId}).then(function(model) {
			return model.data;
		});
	};
	this.removeUser = function(gameId, userId) {
		var url = utils.prepareUrl('game/'+gameId+'/user/' + userId);
		return $sails.delete(url).then(function(model) {
			return model.data;
		});

	};
	this.removeSpot = function(gameId, spotId) {
		var url = utils.prepareUrl('game/'+gameId+'/spot/' + spotId);
		return $sails.delete(url).then(function(model) {
			return model.data;
		})
		.catch(function(err) {
			throw err;
		});

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
		var url = utils.prepareUrl('game/'+gameId+'/actions/rollBuilds');
		$sails.post(url, {}, function(model) {
			return deferred.resolve(model);
		});

		return deferred.promise;
	};

	this.startGame = function(gameId){
		var url = utils.prepareUrl('game/'+gameId+'/actions/start');
		return $sails.put(url, {}).then(function(model) {
			return model.data;
		});

	};
	this.endGame = function(gameId){
		var url = utils.prepareUrl('game/'+gameId+'/actions/end');
		return $sails.put(url, {}).then(function(model) {
			return model.data;
		});

	};


	this.rollBuild = function(gameId, spotId){
		var deferred = $q.defer();
		var url = utils.prepareUrl('game/'+gameId+'/actions/rollBuild');

		$sails.put(url, {spotId: spotId}, function(model) {
			return deferred.resolve(model.data);
		});

		return deferred.promise;
	}

	this.drawCard = function(gameId, spotId){
		var url = utils.prepareUrl('game/'+gameId+'/actions/draw');

		return $sails.put(url, {spotId: spotId}).then(function(model) {
			return model;
		});

	}

	this.acceptBuild = function(gameId, spotId){
		var url = utils.prepareUrl('game/'+gameId+'/actions/accept');

		return $sails.put(url, {spotId: spotId}).then(function(model) {
			return model.data;
		});
	}

	this.denied = function(gameId, spotId){
		var url = utils.prepareUrl('game/'+gameId+'/actions/denied');

		return $sails.put(url, {spotId: spotId}).then(function(model) {
			return model.data;
		});
	}

	this.resetBuilds = function(gameId) {
		var deferred = $q.defer();
		var url = utils.prepareUrl('game/'+gameId+'/actions/resetBuilds');

		$sails.delete(url, {}, function(model) {
			return deferred.resolve(model.data);
		});

		return deferred.promise;
	}
});