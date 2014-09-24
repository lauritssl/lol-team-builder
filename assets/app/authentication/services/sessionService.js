
angular.module('ubteambuilder.authentication.services').factory('Session', Session);

function Session () {
    this.create = function (userEmail, userId, token, organizationId, currentAccount) {
        console.log("user: " + userEmail, " Token: " + token, "organizationId: " + organizationId);
        this.userEmail = userEmail;
        this.userId = userId;
        //this.userRole = userRole;
        this.token = token;
        this.organizationId = organizationId;
        this.currentAccount = currentAccount;
    };
    this.destroy = function () {
        this.userEmail = null;
        //this.userId = null;
        this.token = null;
        this.organizationId = null;
        //this.userRole = null;
        this.currentAccount = null;
    };
    return this;
}