angular.module('templates-app', ['gamelobby/views/card.tpl.html', 'gamelobby/views/championShield.tpl.html', 'gamelobby/views/createModal.tpl.html', 'gamelobby/views/enterModal.tpl.html', 'gamelobby/views/game-lobby.tpl.html', 'gamelobby/views/gamelobby-main-content.tpl.html', 'gamelobby/views/gamelobby.tpl.html', 'gamelobby/views/incogneto-hexagon.tpl.html', 'gamelobby/views/partials/main-items.tpl.html', 'gamelobby/views/partials/main-talents.tpl.html', 'gamelobby/views/partials/summoner-spells.tpl.html', 'gamelobby/views/player-token-left.tpl.html', 'gamelobby/views/player-token-right.tpl.html', 'header/views/header.tpl.html', 'home/views/home.tpl.html']);

angular.module("gamelobby/views/card.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/card.tpl.html",
    "<div class=\"card__back\"></div>\n" +
    "  <div class=\"card__front fluid-background\" style=\"background-image: url({{gameLobby.getChampionBackground(spot.build.champion)}});\" ng-if=\"spot.build\">\n" +
    "    <div class=\"card__title\">{{gameLobby.getChampion(spot.build.champion).name}}</div>\n" +
    "    <div class=\"card__meta-icon fluid-background\" style=\"background-image: url({{gameLobby.getChampionSkillImageFromBuild(spot.build)}})\" data-sub-icon=\"{{spot.build.skill_to_level}}\"></div>\n" +
    "      <div class=\"card-grid\" layout=\"column\" layout-align=\"center center\">\n" +
    "        \n" +
    "        <div class=\"upper-grid\" layout=\"row\" flex>\n" +
    "          <div layout layout-align=\"center center\" flex>\n" +
    "            <div class=\"pill-bar\">\n" +
    "              <div class=\"pill\" data-mastery-points=\"{{ spot.build.mastery1 }}\"></div>\n" +
    "              <div class=\"pill\" data-mastery-points=\"{{ spot.build.mastery2 }}\"></div>\n" +
    "              <div class=\"pill\" data-mastery-points=\"{{ spot.build.mastery3 }}\"></div>\n" +
    "            </div>\n" +
    "            </div>\n" +
    "          \n" +
    "          <div class=\"summoner-spells\" layout=\"row\" layout-align=\"center center\" flex>\n" +
    "            <div class=\"sprite-input rounded\" style=\"background-image: url({{gameLobby.getSummonerImageFromBuild(spot.build, 'summoner1')}});\"></div>\n" +
    "            <div class=\"sprite-input rounded\" style=\"background-image: url({{gameLobby.getSummonerImageFromBuild(spot.build, 'summoner2')}});\"></div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"lower-grid\" layout=\"row\" flex layout-align=\"space-around end\">\n" +
    "          <div class=\"flip-container\">\n" +
    "            <div class=\"flipper\">\n" +
    "                <div class=\"front\">\n" +
    "                  <img src=\"images/questionbox.png\" class=\"sprite-input\" />\n" +
    "                </div>\n" +
    "                <div class=\"back\">\n" +
    "                  <div class=\"sprite-input\" style=\"background-image: url({{gameLobby.getItemImageFromBuild(spot.build, 'bootsEnchantment')}});\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "          <div class=\"flip-container\">\n" +
    "            <div class=\"flipper\">\n" +
    "                <div class=\"front\">\n" +
    "                  <img src=\"images/questionbox.png\" class=\"sprite-input\" />\n" +
    "                </div>\n" +
    "                <div class=\"back\">\n" +
    "                   <div class=\"sprite-input\" style=\"background-image: url({{gameLobby.getItemImageFromBuild(spot.build, 'item1')}});\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"flip-container\">\n" +
    "            <div class=\"flipper\">\n" +
    "                <div class=\"front\">\n" +
    "                  <img src=\"images/questionbox.png\" class=\"sprite-input\" />\n" +
    "                </div>\n" +
    "                <div class=\"back\">\n" +
    "                   <div class=\"sprite-input\" style=\"background-image: url({{gameLobby.getItemImageFromBuild(spot.build, 'item2')}});\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"flip-container\">\n" +
    "            <div class=\"flipper\">\n" +
    "                <div class=\"front\">\n" +
    "                  <img src=\"images/questionbox.png\" class=\"sprite-input\" />\n" +
    "                </div>\n" +
    "                <div class=\"back\">\n" +
    "                  <div class=\"sprite-input\" style=\"background-image: url({{gameLobby.getItemImageFromBuild(spot.build, 'item3')}});\"></div> \n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"flip-container\">\n" +
    "            <div class=\"flipper\">\n" +
    "                <div class=\"front\">\n" +
    "                  <img src=\"images/questionbox.png\" class=\"sprite-input\" />\n" +
    "                </div>\n" +
    "                <div class=\"back\">\n" +
    "                  <div class=\"sprite-input\" style=\"background-image: url({{gameLobby.getItemImageFromBuild(spot.build, 'item4')}});\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"flip-container\">\n" +
    "            <div class=\"flipper\">\n" +
    "                <div class=\"front\">\n" +
    "                  <img src=\"images/questionbox.png\" class=\"sprite-input\" />\n" +
    "                </div>\n" +
    "                <div class=\"back\">\n" +
    "                  <div class=\"sprite-input\" style=\"background-image: url({{gameLobby.getItemImageFromBuild(spot.build, 'item5')}});\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>              \n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "");
}]);

angular.module("gamelobby/views/championShield.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/championShield.tpl.html",
    "<div class=\"player_shield col-sm-12\">\n" +
    "    <!-- title=\"{{gameLobby.champions[spot.champion].id}}\" alt=\"{{gameLobby.champions[spot.champion].id}}\" ng-src=\"{{gameLobby.getChampionImage(gameLobby.champions[spot.champion].image.full)}}-->\n" +
    "    <span class=\"glyphicon glyphicon-remove action_button_left\" title=\"Leave slot\" ng-if=\"gameLobby.userOwnsGame() || gameLobby.currentUser.id === spot.user\" ng-click=\"gameLobby.removeUserFromSpot(gameLobby.game.id, spot.user, spot.id)\"></span>\n" +
    "\n" +
    "    <span class=\"glyphicon glyphicon-retweet action_button_left\" id=\"action_button_reroll\" title=\"Reroll player\" ng-if=\"gameLobby.userOwnsGame()\" ng-click=\"gameLobby.rerollSpot(gameLobby.game.id, spot.id)\"></span>\n" +
    "\n" +
    "    <div id=\"game_join-slot\" ng-click=\"gameLobby.joinSpot(gameLobby.game, spot)\" ng-class=\"{player_shield_not_taken: !gameLobby.isUserInSpot(spot)}\"></div>\n" +
    "\n" +
    "    <h2 id=\"player_name\" ng-if=\"spot.user\">{{gameLobby.getUserFromGame(gameLobby.game, spot.user).username}}</h2>\n" +
    "\n" +
    "    <img title=\"{{gameLobby.items[spot.build.boots].name +' with '+ gameLobby.items[spot.build.bootsEnchantment].name}}\" ng-show=\"gameLobby.game.gameStarted\" class=\"hero_items\" id=\"item_1\" ng-src=\"{{gameLobby.getItemImageFromBuild(spot.build, 'boots')}}\" />\n" +
    "    <img title=\"{{gameLobby.items[spot.build.item1].name}}\" ng-show=\"gameLobby.game.gameStarted\" class=\"hero_items\" id=\"item_2\" ng-src=\"{{gameLobby.getItemImageFromBuild(spot.build, 'item1')}}\"/>\n" +
    "    <img title=\"{{gameLobby.items[spot.build.item2].name}}\" ng-show=\"gameLobby.game.gameStarted\" class=\"hero_items\" id=\"item_3\" ng-src=\"{{gameLobby.getItemImageFromBuild(spot.build, 'item2')}}\"/>\n" +
    "    <img title=\"{{gameLobby.items[spot.build.item3].name}}\" ng-show=\"gameLobby.game.gameStarted\" class=\"hero_items\" id=\"item_4\" ng-src=\"{{gameLobby.getItemImageFromBuild(spot.build, 'item3')}}\"/>\n" +
    "    <img title=\"{{gameLobby.items[spot.build.item4].name}}\" ng-show=\"gameLobby.game.gameStarted\" class=\"hero_items\" id=\"item_5\" ng-src=\"{{gameLobby.getItemImageFromBuild(spot.build, 'item4')}}\"/>\n" +
    "    <img title=\"{{gameLobby.items[spot.build.item5].name}}\" ng-show=\"gameLobby.game.gameStarted\" class=\"hero_items\" id=\"item_6\" ng-src=\"{{gameLobby.getItemImageFromBuild(spot.build, 'item5')}}\"/>\n" +
    "\n" +
    "    <!-- <div class=\"hero-hover-stats\" id=\"hero-stats-ap\" ng-show=\"spot.showChampionDetails\">\n" +
    "        <img src=\"../../../images/icons/magic.png\" />\n" +
    "        <p class=\"p_bluetext\" style=\"float: left;\">500</p>\n" +
    "    </div>\n" +
    "    <div class=\"hero-hover-stats stats-second\" id=\"hero-stats-ad\" title=\"Attack damage\" ng-show=\"spot.showChampionDetails\">\n" +
    "        <img src=\"../../../images/icons/sword.png\" />\n" +
    "        <p class=\"p_bluetext\">600</p>\n" +
    "    </div>\n" +
    "    <div class=\"hero-hover-stats\" id=\"hero-stats-arm\" title=\"Armor\" ng-show=\"spot.showChampionDetails\">\n" +
    "        <img src=\"../../../images/icons/shield.png\" />\n" +
    "        <p class=\"p_bluetext\">200</p>\n" +
    "    </div>\n" +
    "    <div class=\"hero-hover-stats stats-second\" id=\"hero-stats-ms\" ng-show=\"spot.showChampionDetails\">\n" +
    "        <img src=\"../../../images/icons/movespeed.png\" style=\"width: 25px; height: 25px;\" />\n" +
    "        <p class=\"p_bluetext\">200</p>\n" +
    "    </div>\n" +
    "    <div class=\"hero-hover-stats\" id=\"hero-stats-mr\" ng-show=\"spot.showChampionDetails\">\n" +
    "        <img src=\"../../../images/icons/MagicResistance.png\" />\n" +
    "        <p class=\"p_bluetext\">200</p>\n" +
    "    </div>\n" +
    "    <div class=\"hero-hover-stats stats-second\" id=\"hero-stats-sv\" ng-show=\"spot.showChampionDetails\">\n" +
    "        <img src=\"../../../images/icons/shield.png\" />\n" +
    "        <p class=\"p_bluetext\">200</p>\n" +
    "    </div> -->\n" +
    "\n" +
    "    <div id=\"hero_backdrop\" ng-show=\"gameLobby.game.gameStarted\" ng-click=\"gameLobby.joinSpot(gameLobby.game, spot)\" ng-style=\"{{gameLobby.getChampionBackground(spot)}}\" ng-mouseover=\"spot.showChampionDetails = true\" ng-mouseleave=\"spot.showChampionDetails = false\"></div>\n" +
    "    <div id=\"build_info_backdrop\">\n" +
    "    <p id=\"champion_name\">{{gameLobby.getChampion(spot.champion).name}}</p>\n" +
    "    <img id=\"main_lvl_skill_bg\" ng-show=\"gameLobby.game.gameStarted\" title=\"{{gameLobby.getSkillFromChampion(spot.build, spot.champion).name}}\" ng-src=\"{{gameLobby.getChampionSkillImageFromBuild(spot.build,spot.champion)}}\" />\n" +
    "    <h2 id=\"main_lvl_skill\" ng-show=\"gameLobby.game.gameStarted\">{{gameLobby.getBuildFromGame(gameLobby.game, spot.build).skill_to_level}}</h2>\n" +
    "    <div id=\"hero_passives_container\" ng-show=\"gameLobby.game.gameStarted\">\n" +
    "        <img title=\"{{gameLobby.summoners[gameLobby.getBuildFromGame(gameLobby.game, spot.build)['summoner1']].name}}\" class=\"glyphicon glyphicon-headphone hero_passives\" id=\"passive_1\" ng-src=\"{{gameLobby.getSummonerImageFromBuild(spot.build, 'summoner1')}}\" />\n" +
    "        <img title=\"{{gameLobby.summoners[gameLobby.getBuildFromGame(gameLobby.game, spot.build)['summoner2']].name}}\" class=\"hero_passives\" id=\"passive_2\" ng-src=\"{{gameLobby.getSummonerImageFromBuild(spot.build, 'summoner2')}}\" />\n" +
    "    </div>\n" +
    "    <div id=\"hero_masteries\" ng-show=\"gameLobby.game.gameStarted\">\n" +
    "        <p class=\"masteries_text\" id=\"mastery_1\">{{gameLobby.getBuildFromGame(gameLobby.game, spot.build).mastery1}}</p>\n" +
    "        <p class=\"masteries_text\" id=\"mastery_2\">{{gameLobby.getBuildFromGame(gameLobby.game, spot.build).mastery2}}</p>\n" +
    "        <p class=\"masteries_text\" id=\"mastery_3\">{{gameLobby.getBuildFromGame(gameLobby.game, spot.build).mastery3}}</p>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("gamelobby/views/createModal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/createModal.tpl.html",
    "<div class=\"modal-content-container modal-content-container--has-graphic join-lobby\">\n" +
    "  <span class=\"modal-graphic modal-graphic--create-game\"></span>\n" +
    "  <div class=\"modal-header\">\n" +
    "    <h2 class=\"modal-title\">\n" +
    "    Create a new game, admin\n" +
    "    </h2>\n" +
    "  </div>\n" +
    "  <form name=\"createForm\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-xs-10\">\n" +
    "\n" +
    "        <div class=\"c-input\">\n" +
    "          \n" +
    "          <input placeholder=\"Your nickname\" name=\"input_game_nickname\" id=\"input_game_nickname\" maxlength=\"28\" class=\"form-control lob-form-input input-lg\" type=\"text\" autofocus ng-model=\"modalCtrl.user.nickname\" ng-change=\"modalCtrl.game.title = modalCtrl.getTitle()\" required>\n" +
    "\n" +
    "          \n" +
    "          <label for=\"input_game_nickname\" class=\"c-input__label\">\n" +
    "            <span class=\"c-input__label-content\">Your nickname</span>\n" +
    "          </label>\n" +
    "\n" +
    "        </div>\n" +
    "        \n" +
    "        <div class=\"c-input\">\n" +
    "          <input placeholder=\"Game title\" name=\"input_game_title\" id=\"input_game_title\" maxlength=\"28\" class=\"form-control lob-form-input input-lg\" type=\"text\" autofocus ng-model=\"modalCtrl.game.title\" required>\n" +
    "          \n" +
    "          <label for=\"input_game_title\" class=\"c-input__label\">\n" +
    "            <span class=\"c-input__label-content\">Game title</span>\n" +
    "          </label>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"c-input\">\n" +
    "          \n" +
    "          <input placeholder=\"Password (Optional)\" name=\"input_game_password\" id=\"input_game_password\" maxlength=\"28\" class=\"form-control lob-form-input input-lg\" type=\"password\" ng-model=\"modalCtrl.game.password\" ng-change=\"modalCtrl.game.private = modalCtrl.game.password ? true : false\">\n" +
    "          \n" +
    "          <label for=\"input_game_password\" class=\"c-input__label\">\n" +
    "            <span class=\"c-input__label-content\">Password (Optional)</span>\n" +
    "          </label>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"form-group input_dropdown__halfsize\">\n" +
    "          <select name=\"select_map\" id=\"select_map\" class=\"form-control lob-select\" ng-options=\"map as map.name for map in modalCtrl.maps track by map.id\" ng-model=\"modalCtrl.selected.map\" ng-change=\"modalCtrl.game.map = modalCtrl.selected.map.id\">\n" +
    "\n" +
    "          </select>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"form-group input_dropdown__halfsize\">\n" +
    "          <select name=\"select_mode\" id=\"select_mode\" class=\"form-control lob-select\" ng-options=\"gameMode as gameMode.name for gameMode in modalCtrl.gameModes track by gameMode.id\" ng-model=\"modalCtrl.selected.gameMode\" ng-change=\"modalCtrl.game.gameMode = modalCtrl.selected.gameMode.id\">\n" +
    "\n" +
    "          </select>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  </form>\n" +
    "  \n" +
    "  <div class=\"modal-footer\">\n" +
    "    \n" +
    "    <input type=\"submit\" class=\"lob-btn\" ng-disabled=\"createForm.$invalid\" ng-click=\"modalCtrl.createGame(modalCtrl.game, modalCtrl.user)\" value=\"Create Game\" />\n" +
    "    <input type=\"submit\" class=\"lob-btn\" ng-click=\"modalCtrl.cancel()\" value=\"Go back\" />\n" +
    "  </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("gamelobby/views/enterModal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/enterModal.tpl.html",
    "<div class=\"modal-content-container modal-content-container--has-graphic join-lobby\">\n" +
    "  <span class=\"modal-graphic modal-graphic--create-game\"></span>\n" +
    "  <div class=\"modal-header\">\n" +
    "    <h2 class=\"modal-title\">\n" +
    "    Your name, summoner\n" +
    "    </h2>\n" +
    "  </div>\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-8\">\n" +
    "      <form name=\"loginForm\">\n" +
    "        <input ng-model=\"modalCtrl.user.nickname\" placeholder=\"Write your nickname\" maxlength=\"28\" class=\"form-control lob-form-input input-lg\" type=\"text\" required>\n" +
    "        <input ng-model=\"modalCtrl.password\" placeholder=\"Password\" maxlength=\"28\" class=\"form-control lob-form-input input-lg\" type=\"password\" ng-if=\"modalCtrl.game.private\" required>\n" +
    "      </div>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    \n" +
    "    <input type=\"submit\" class=\"lob-btn\" ng-disabled=\"loginForm.$invalid\" ng-click=\"modalCtrl.user !== null && modalCtrl.ok(modalCtrl.user, modalCtrl.game.id, modalCtrl.password)\" value=\"Join Game\" />\n" +
    "    <input type=\"submit\" class=\"lob-btn\" ng-click=\"modalCtrl.cancel()\" value=\"Go back\" />\n" +
    "\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("gamelobby/views/game-lobby.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/game-lobby.tpl.html",
    "<div class=\"c-lobby-top-bar\" >\n" +
    "  <div class=\"l-wrapped\" layout=\"row\" layout-align=\"start center\">\n" +
    "  <div class=\"das-boot-wrapper dropdown-toggle\" title=\"Kick a player\" tooltip=\"Get outta' here!\" layout layout-align=\"center end\" data-toggle=\"dropdown\" ng-if=\"gameLobby.userOwnsGame()\">\n" +
    "    <div class=\"das-boot-icon\">\n" +
    "  </div>\n" +
    "</div>\n" +
    "<ul class=\"dropdown-menu\" role=\"menu\" id=\"das-boot-dropdown\" ng-if=\"gameLobby.userOwnsGame()\">\n" +
    "    <li role=\"presentation\" layout=\"column\" layout-align=\"center center\" ng-repeat=\"user in gameLobby.game.users\" ng-if=\"user.id !== gameLobby.game.user.id \" ng-click=\"gameLobby.kickUser(gameLobby.game, user)\">\n" +
    "      <a role=\"menuitem\" class=\"text-overflow-ellipsis\" tabindex=\"-1\" href=\"#\">{{user.nickname}}</a>\n" +
    "      <hr>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "   <span class=\"c-lobby-top-bar__item\">Game: {{ gameLobby.game.title }}</span>\n" +
    "   <span class=\"c-lobby-top-bar__item\" ng-if=\"gameLobby.game.private\">Private</span>\n" +
    "   \n" +
    "   <span flex></span>\n" +
    "   <span class=\"c-lobby-top-bar__item\">{{ gameLobby.game.spots.length }} / {{ gameLobby.game.numberOfSpots }} spots</span>\n" +
    "   <input type=\"submit\" class=\"lob-btn\" value=\"Add spot\" ng-click=\"gameLobby.addSpot(gameLobby.game)\" ng-if=\"gameLobby.userOwnsGame()\" />\n" +
    "  \n" +
    "   <input type=\"submit\" class=\"lob-btn\" value=\"Join game\" ng-click=\"gameLobby.joinGame(gameLobby.game)\" ng-if=\"!gameLobby.currentUser && !gameLobby.game.gameStarted\" />\n" +
    "   </div>\n" +
    "</div>\n" +
    "\n" +
    "<main id=\"lobby-faction-wrapper\">\n" +
    "<div id=\"team-color-bg\">\n" +
    "<div id=\"game-welcome-container\" flex layout=\"column\" layout-align=\"center center\" ng-class=\"{'pull-back-up' : gameLobby.game.gameStarted}\">\n" +
    "  <div layout=\"row\" class=\"rope-wrapper\">\n" +
    "    <div id=\"rope-left\"></div>\n" +
    "    <span flex></span>\n" +
    "    <div id=\"rope-right\"></div>\n" +
    "  </div>\n" +
    "  <div class=\"welcome-message-wrapper dark-wall-pattern_gold\" layout=\"column\" layout-align=\"start center\">\n" +
    "    <p class=\"welcome-text\">Welcome, {{gameLobby.currentUser.nickname}}!</p>\n" +
    "    <p>This game is playing <span>{{gameLobby.game.gameMode}} mode</span>.</p>\n" +
    "      <p>If you would like to review the rules for this game mode, you can find them <a href=\"/rules\" target=\"_blank\">here</a>.</p>\n" +
    "    <div ng-if=\"gameLobby.game.gameMode !== 'draft'\">\n" +
    "      <p>{{ gameLobby.userInSpot(gameLobby.currentUser.id, gameLobby.game) ? '' : 'The game cannot start until everyone has taken a spot, so..' }}</p>\n" +
    "      <p class=\"pick-spot-text\">{{ gameLobby.userInSpot(gameLobby.currentUser.id, gameLobby.game) ? 'Waiting for other players...' : gameLobby.currentUser.nickname + ', pick a spot!' }}</p>\n" +
    "    </div>\n" +
    "    <div ng-if=\"gameLobby.game.gameMode === 'draft'\">\n" +
    "      <p>Once the host starts the game, you will each take turns to pick a slot with a predefined build.</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "  <aside class=\"sidebar pull--left\" ng-if=\"!(!gameLobby.game.gameStarted && gameLobby.game.gameMode === 'draft')\">\n" +
    "    <ul class=\"players list-unstyled\" layout=\"column\" layout-align=\"center center\">\n" +
    "      <li ng-repeat=\"spot in gameLobby.game.spots track by $index\" ng-if=\"$even\" ng-class=\"{'shield__expanded':gameLobby.expandedSpots[spot.id]}\"\n" +
    "      class=\"player\" ng-disabled=\"!gameLobby.game.gameStarted\" ng-click=\"!gameLobby.game.gameStarted || gameLobby.toggleSpot(spot)\"\n" +
    "      data-champion=\"Jax\" layout=\"row\" layout-align=\"center center\" ng-include=\"'gamelobby/views/player-token-left.tpl.html'\">\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </aside>\n" +
    "\n" +
    "  <section class=\"content-container\" ng-include=\"'gamelobby/views/gamelobby-main-content.tpl.html'\" layout=\"column\" layout-align=\"center center\">\n" +
    "  </section>\n" +
    "  <aside class=\"sidebar pull--right\" ng-if=\"!(!gameLobby.game.gameStarted && gameLobby.game.gameMode === 'draft')\">\n" +
    "    <ul class=\"players list-unstyled\" layout=\"column\" layout-align=\"center center\" >\n" +
    "      <li ng-repeat=\"spot in gameLobby.game.spots track by $index\" ng-if=\"$odd\" ng-class=\"{'shield__expanded':gameLobby.expandedSpots[spot.id]}\"\n" +
    "      class=\"player\" ng-disabled=\"!gameLobby.game.gameStarted\" ng-click=\"!gameLobby.game.gameStarted || gameLobby.toggleSpot(spot)\"\n" +
    "      data-champion=\"Jax\" layout=\"row\" layout-align=\"center center\" ng-include=\"'gamelobby/views/player-token-right.tpl.html'\">\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </aside>\n" +
    "  </div>\n" +
    "</main>");
}]);

angular.module("gamelobby/views/gamelobby-main-content.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/gamelobby-main-content.tpl.html",
    "<!-- <div class=\"notification\" ng-if=\"!gameLobby.game.gameStarted && gameLobby.game.gameMode !== 'draft'\">{{ gameLobby.userInSpot(gameLobby.currentUser.id, gameLobby.game) ? '' : gameLobby.currentUser.nickname + ', pick a slot...' }}</div> -->\n" +
    "<div class=\"notification\" ng-if=\"gameLobby.game.gameStarted && gameLobby.game.gameMode === 'draft'\">{{ !gameLobby.getNextUser(gameLobby.game) ? '' : gameLobby.getNextUser(gameLobby.game).nickname + ', pick a slot...' }}</div>\n" +
    "<div class=\"notification\" ng-if=\"gameLobby.game.gameStarted && gameLobby.game.gameMode !== 'draft'\">{{ !gameLobby.getUserWithTurn(gameLobby.game) ? '' : gameLobby.getUserWithTurn(gameLobby.game).nickname + ', pick a card...' }}</div>\n" +
    "\n" +
    "\n" +
    "<button class=\"lob-btn btn--card-draw\" ng-click=\"gameLobby.startGame(gameLobby.game.id)\" ng-if=\"gameLobby.showStartGame(gameLobby.game)\">Start card draw</button>\n" +
    "\n" +
    "\n" +
    "<button class=\"lob-btn btn--end-game\" ng-click=\"gameLobby.endGame(gameLobby.game.id)\" ng-if=\"gameLobby.game.gameStarted && gameLobby.userOwnsGame()\">Start over</button> \n" +
    "<!-- ::::::::::::::::::::::::::::::::: -->\n" +
    "<!-- Unassigned player Hexagon section -->\n" +
    "<!-- ::::::::::::::::::::::::::::::::: -->\n" +
    "    \n" +
    "    <section class=\"hexagon-wrapper\" layout=\"column\" layout-align=\"center center\" ng-if=\"!gameLobby.game.gameStarted || gameLobby.game.gameMode === 'draft'\">\n" +
    "      <div class=\"incogneto-player-hexagon {{$index+1}}\" ng-include=\"'gamelobby/views/incogneto-hexagon.tpl.html'\" ng-repeat=\"user in gameLobby.unpickedUsers track by user.id\" ng-hide=\"gameLobby.userInSpot(user.id, gameLobby.game)\">\n" +
    "      </div>\n" +
    "    </section>    \n" +
    "    \n" +
    "<!-- ::::::::::::::::::::::::::::::::: -->\n" +
    "<!-- Card deck section                 -->\n" +
    "<!-- ::::::::::::::::::::::::::::::::: -->\n" +
    "    <div class=\"card-deck-container\" ng-if=\"gameLobby.game.gameStarted && !gameLobby.allSpotsAccepted(gameLobby.game) && gameLobby.game.gameMode !== 'draft'\">\n" +
    "     <!--  <button \n" +
    "        ng-if=\"gameLobby.userOwnsGame()\" \n" +
    "        ng-click=\"gameLobby.rollBuilds(gameLobby.game)\" \n" +
    "        id=\"lobby_btn-roll\" \n" +
    "        class=\"btn btn--success\">\n" +
    "        ROLL ALL\n" +
    "      </button> -->\n" +
    "      <div class=\"card-deck\">\n" +
    "        <article class=\"card\" ng-click=\"spot.drawn || gameLobby.drawCard(gameLobby.game.id, spot)\" ng-class=\"{'card--rotate-horizontally': spot.build.drawn, 'card--gets-overlayed': spot.build.denied, 'card--flies-to-player': spot.build.accepted}\" ng-repeat=\"spot in gameLobby.game.spots track by $index\" ng-include=\"'gamelobby/views/card.tpl.html'\" style=\"z-index: {{ 10 - $index}};\"></article>\n" +
    "\n" +
    "       \n" +
    "        <div class=\"overlay\" data-overlay-text=\"Admin is deciding your fate...\"></div>\n" +
    "      </div>\n" +
    "       <div class=\"card-interactions\" ng-class=\"{'slides-out-from-bottom': gameLobby.getNextRollableSpot(gameLobby.game).build.drawn}\">\n" +
    "          <button class=\"lob-btn btn--build-choice lob-btn--has-pulse\" ng-if=\"gameLobby.userOwnsGame() || (gameLobby.userHasTurn(gameLobby.game) && !gameLobby.getNextRollableSpot(gameLobby.game).build.denied)\" ng-click=\"gameLobby.acceptBuild(gameLobby.game, gameLobby.getNextRollableSpot(gameLobby.game))\">Accept Build</button>\n" +
    "          <button class=\"lob-btn btn--build-choice\" ng-if=\"gameLobby.userHasTurn(gameLobby.game)\" ng-click=\"gameLobby.denied(gameLobby.game, gameLobby.getNextRollableSpot(gameLobby.game))\" ng-class=\"{'disabled' : gameLobby.getNextRollableSpot(gameLobby.game).build.denied}\">Request Re-Roll</button>\n" +
    "\n" +
    "          <button class=\"lob-btn btn--build-choice\" ng-if=\"gameLobby.userOwnsGame() && gameLobby.getNextRollableSpot(gameLobby.game).build.denied\" ng-click=\"gameLobby.rerollSpot(gameLobby.game, gameLobby.getNextRollableSpot(gameLobby.game))\" ng-class=\"{'disabled' : spot.build.denied}\">Reroll</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <script>\n" +
    "(function() {\n" +
    "  $(function() {\n" +
    "    var card, deck, initialCard, layer, notificationInitialState, rerollButtonInitialState, _i, _len;\n" +
    "    initialCard = $('.card').html();\n" +
    "    notificationInitialState = $('.notification').text();\n" +
    "    \n" +
    "    $('.card').on(\"click\", function() {\n" +
    "      return $(this).toggleClass(\"card--rotate-horizontally\");\n" +
    "    });\n" +
    "    $(\"[ng-click=addBuildToPlayer]\").on(\"click\", function() {\n" +
    "      return $('.card-deck .card').first().toggleClass('fly-away');\n" +
    "    });\n" +
    "    rerollButtonInitialState = $('[ng-click=addBuildToPlayer]').text();\n" +
    "    $(\"[ng-click=requestReroll]\").on(\"click\", function() {\n" +
    "      $(this).text(\"Wait, telling admin...\").attr('disabled', 'disabled');\n" +
    "      return $('.notification').text('Lichine has requested a re-roll...');\n" +
    "    });\n" +
    "    return $('.revealer').on(\"click\", function() {\n" +
    "      return $(this).toggleClass(\"reveal-it\");\n" +
    "    });\n" +
    "  });\n" +
    "\n" +
    "}).call(this);\n" +
    "</script>");
}]);

angular.module("gamelobby/views/gamelobby.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/gamelobby.tpl.html",
    "<div class=\"gamelobby_content content_bg\">\n" +
    "\n" +
    "        <!-- Game title -->\n" +
    "        <div class=\"col-sm-12\">\n" +
    "            <div class=\"col-sm-5 col-sm-offset-2\">\n" +
    "                <p>{{gameLobby.game.title}}</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Roll - reroll button -->\n" +
    "        <div class=\"col-xs-6 col-xs-offset-3\" style=\"text-align: center;\">\n" +
    "            <div class=\"btn-group\">\n" +
    "            <button ng-if=\"gameLobby.userOwnsGame()\" ng-click=\"gameLobby.rollBuilds(gameLobby.game)\" id=\"lobby_btn-roll\" class=\"btn ub-custom-btn custom-btn-red center\">ROLL ALL</button>\n" +
    "            <button ng-if=\"gameLobby.userOwnsGame()\" ng-click=\"gameLobby.resetBuilds(gameLobby.game.id)\" id=\"lobby_btn-roll\" class=\"btn ub-custom-btn custom-btn-grey center\">RESET ALL</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        \n" +
    "        <!-- Player shields -->\n" +
    "        <div id=\"player_shield_container\">\n" +
    "            <div class=\"row partition_row\" ng-repeat=\"spot in gameLobby.game.spots\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                 <div class=\"row\" ng-include=\"'gamelobby/views/championShield.tpl.html'\"> \n" +
    "                </div>         \n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "</div>\n" +
    "<!--<script type=\"text/javascript\">\n" +
    "\n" +
    "    $(document).ready(function(){\n" +
    "        var classCycle=['bgImage1','bgImage2','bgImage3','bgImage4','bgImage5','bgImage6','bgImage7','bgImage8','bgImage9'];\n" +
    "\n" +
    "        var randomNumber = Math.floor(Math.random() * classCycle.length);\n" +
    "        var classToAdd = classCycle[randomNumber];\n" +
    "\n" +
    "        $('body').addClass(classToAdd);\n" +
    "\n" +
    "    });\n" +
    "</script> -->");
}]);

angular.module("gamelobby/views/incogneto-hexagon.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/incogneto-hexagon.tpl.html",
    "<div class=\"hexagon-bg\"></div>\n" +
    "    <div class=\"hexagon-edge\"></div>\n" +
    "    <div class=\"hexagon-banner\">\n" +
    "    <div class=\"player__token-nameplate\">\n" +
    "    	 <p class=\"token-nameplate__player-name\">\n" +
    "              {{::user.nickname}}\n" +
    "            </p>\n" +
    "           </div>\n" +
    "    </div>");
}]);

angular.module("gamelobby/views/partials/main-items.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/partials/main-items.tpl.html",
    "<div class=\"item shadow-inset\" style=\"background-image: url({{gameLobby.getItemImageFromBuild(spot.build, 'bootsEnchantment')}});\" title=\"{{gameLobby.getItemFromBuild(spot.build, 'boots').name}}\"></div>\n" +
    "  <div class=\"item shadow-inset\" style=\"background-image: url({{gameLobby.getItemImageFromBuild(spot.build, 'item1')}});\" title=\"{{gameLobby.getItemFromBuild(spot.build, 'item1').name}}\"></div>\n" +
    "  <div class=\"item shadow-inset\" style=\"background-image: url({{gameLobby.getItemImageFromBuild(spot.build, 'item2')}});\" title=\"{{gameLobby.getItemFromBuild(spot.build, 'item2').name}}\"></div>\n" +
    "  <div class=\"item shadow-inset\" style=\"background-image: url({{gameLobby.getItemImageFromBuild(spot.build, 'item3')}});\" title=\"{{gameLobby.getItemFromBuild(spot.build, 'item3').name}}\"></div>\n" +
    "  <div class=\"item shadow-inset\" style=\"background-image: url({{gameLobby.getItemImageFromBuild(spot.build, 'item4')}});\" title=\"{{gameLobby.getItemFromBuild(spot.build, 'item4').name}}\"></div>\n" +
    "  <div class=\"item shadow-inset\" style=\"background-image: url({{gameLobby.getItemImageFromBuild(spot.build, 'item5')}});\" title=\"{{gameLobby.getItemFromBuild(spot.build, 'item5').name}}\"></div>");
}]);

angular.module("gamelobby/views/partials/main-talents.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/partials/main-talents.tpl.html",
    "<div class=\"build__main-talents\" flex layout=\"row\" layout-align=\"center center\">\n" +
    "  <div class=\"talents-wrapper shadow-inset\" layout=\"row\" layout-align=\"center center\">\n" +
    "    <div class=\"talent\" layout layout-align=\"center center\">\n" +
    "      <p>{{ spot.build.mastery1 }}</p>\n" +
    "    </div>\n" +
    "    <div class=\"talent\" layout layout-align=\"center center\">\n" +
    "      <p>{{ spot.build.mastery2 }}</p>\n" +
    "    </div>\n" +
    "    <div class=\"talent\" layout layout-align=\"center center\">\n" +
    "      <p>{{ spot.build.mastery3 }}</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("gamelobby/views/partials/summoner-spells.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/partials/summoner-spells.tpl.html",
    "<div class=\"summoner-spell shadow-inset spell-one\" style=\"background-image: url({{gameLobby.getSummonerImageFromBuild(spot.build, 'summoner1')}});\"></div>\n" +
    "<div class=\"summoner-spell shadow-inset spell-two\" style=\"background-image: url({{gameLobby.getSummonerImageFromBuild(spot.build, 'summoner2')}});\"></div>");
}]);

angular.module("gamelobby/views/player-token-left.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/player-token-left.tpl.html",
    "<div class=\"player__build-wrapper\" flex layout=\"column\" layout-align=\"start start\" ng-if=\"spot.build && spot.build.accepted\">\n" +
    "    <div class=\"build__main-spells\" flex layout=\"row\" layout-align=\"space-around center\">\n" +
    "        <div class=\"main-spell-wrapper\" layout=\"row\" layout-align=\"center end\">\n" +
    "            <div class=\"main-spell shadow-inset\" style=\"background-image: url({{gameLobby.getChampionSkillImageFromBuild(spot.build,spot.build.champion)}})\"></div>\n" +
    "            <div class=\"main-spell-letter\" layout layout-align=\"center center\">\n" +
    "                <p>{{spot.build.skill_to_level}}</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"spell-separator\"></div>\n" +
    "        <ng-include layout=\"row\" layout-align=\"center center\" src=\"'gamelobby/views/partials/summoner-spells.tpl.html'\" ng-if=\"spot.build\"></ng-include>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <ng-include class=\"full-width-wrapper\" src=\"'gamelobby/views/partials/main-talents.tpl.html'\" ng-if=\"spot.build\"></ng-include>\n" +
    "\n" +
    "    <div class=\"build__main-items\" flex layout=\"row\" layout-align=\"space-around center\" ng-include=\"'gamelobby/views/partials/main-items.tpl.html'\"></div>\n" +
    "</div>\n" +
    "<span flex></span>\n" +
    "<div class=\"player__portrait-bg\"></div>\n" +
    "<div class=\"player__token-wrapper\" layout=\"column\" layout-align=\"center center\" >\n" +
    "\n" +
    "    <div\n" +
    "        class=\"player__option-icon option--one\"\n" +
    "        layout=\"row\"\n" +
    "        layout-align=\"center center\">\n" +
    "        <i\n" +
    "        class=\"fa fa-rocket\">\n" +
    "        </i>\n" +
    "    </div>\n" +
    "    <div class=\"player__option-icon option--two\" layout=\"row\" layout-align=\"center center\" ng-click=\"gameLobby.removeSpot(gameLobby.game, spot)\" ng-if=\"gameLobby.userOwnsGame() && !gameLobby.game.gameStarted\">\n" +
    "        <i class=\"fa fa-external-link\"> </i>\n" +
    "    </div>\n" +
    "    <div class=\"player__option-icon option--three\" layout=\"row\" layout-align=\"center center\" ng-click=\"gameLobby.removeUserFromSpot(gameLobby.game, spot)\" ng-if=\"(gameLobby.currentUser.id === spot.user || gameLobby.userOwnsGame(spot.user))  && !gameLobby.game.gameStarted && spot.user\">\n" +
    "        <i class=\"fa fa-times\"> </i>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"player__token-backdrop\"></div>\n" +
    "    <div class=\"player__token-image\" ng-class=\"{'invisible':!gameLobby.isBuildAccepted(spot)}\" style=\"background-image: url({{gameLobby.getChampionBackground(spot.build.champion)}});\"></div>\n" +
    "    <div class=\"player__token-polygon\" ng-click=\"gameLobby.joinSpot(gameLobby.game, spot)\" ng-disabled=\"gameLobby.game.gameStarted\"></div>\n" +
    "    <div class=\"player__token-nameplate\" ng-if=\"spot.user && spot.user !== gameLobby.game.user.id\"layout=\"row\">\n" +
    "        <p class=\"token-nameplate__player-name\">\n" +
    "        {{gameLobby.getUserFromGame(spot.user, gameLobby.game).nickname}}\n" +
    "        </p>\n" +
    "    </div>\n" +
    "    <div class=\"admin__token-nameplate\" ng-if=\"spot.user === gameLobby.game.user.id\" layout=\"row\">\n" +
    "        <div class=\"admin__nameplate-wrapper\" layout=\"row\" layout-align=\"center center\">\n" +
    "            <img src=\"images/admin-crown.png\" class=\"admin-crown\" />\n" +
    "            <p class=\"token-nameplate__player-name\">\n" +
    "            {{gameLobby.getUserFromGame(spot.user, gameLobby.game).nickname}}\n" +
    "            </p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("gamelobby/views/player-token-right.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/player-token-right.tpl.html",
    "<div class=\"player__token-wrapper\" layout=\"column\" layout-align=\"center center\">\n" +
    "          \n" +
    "         <div class=\"player__option-icon option--one\" layout=\"row\" layout-align=\"center center\">\n" +
    "          <i class=\"fa fa-rocket\"> </i>\n" +
    "          </div>\n" +
    "          <div class=\"player__option-icon option--two\" layout=\"row\" layout-align=\"center center\" ng-click=\"gameLobby.removeSpot(gameLobby.game, spot)\" ng-if=\"gameLobby.userOwnsGame() && !gameLobby.game.gameStarted\">\n" +
    "\n" +
    "            <i class=\"fa fa-external-link\"></i>\n" +
    "          </div>\n" +
    "          <div class=\"player__option-icon option--three\" layout=\"row\" layout-align=\"center center\" ng-click=\"gameLobby.removeUserFromSpot(gameLobby.game, spot)\" ng-if=\"(gameLobby.currentUser.id === spot.user || gameLobby.userOwnsGame(spot.user)) && !gameLobby.game.gameStarted && spot.user\">\n" +
    "            <i class=\"fa fa-times\"></i>\n" +
    "          </div>\n" +
    "\n" +
    "           <div class=\"player__token-backdrop\"></div>\n" +
    "          <div class=\"player__token-image\" ng-class=\"{'invisible':!gameLobby.isBuildAccepted(spot)}\" style=\"background-image: url({{gameLobby.getChampionBackground(spot.build.champion)}} );\"></div>\n" +
    "          <div class=\"player__token-polygon\" ng-click=\"gameLobby.joinSpot(gameLobby.game, spot)\" ng-disabled=\"gameLobby.game.gameStarted\"></div>\n" +
    "          <div class=\"player__token-nameplate\" ng-if=\"spot.user && spot.user !== gameLobby.game.user.id\">\n" +
    "            <p class=\"token-nameplate__player-name\">\n" +
    "              {{gameLobby.getUserFromGame(spot.user, gameLobby.game).nickname}}\n" +
    "            </p>\n" +
    "          </div>\n" +
    "          <div class=\"admin__token-nameplate\" ng-if=\"spot.user === gameLobby.game.user.id\" layout=\"row\">\n" +
    "            <div class=\"admin__nameplate-wrapper\" layout=\"row\" layout-align=\"center center\">\n" +
    "            <img src=\"images/admin-crown.png\" class=\"admin-crown\" />\n" +
    "            <p class=\"token-nameplate__player-name\">\n" +
    "              {{gameLobby.getUserFromGame(spot.user, gameLobby.game).nickname}}\n" +
    "            </p>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        \n" +
    "        <span flex></span>\n" +
    "        <div class=\"player__portrait-bg\"></div>\n" +
    "        <div class=\"player__build-wrapper\" flex layout=\"column\" layout-align=\"start end\" ng-if=\"spot.build && spot.build.accepted\">\n" +
    "          <div class=\"build__main-spells\" flex layout=\"row\" layout-align=\"space-around center\">\n" +
    "          <div class=\"main-spell-wrapper\" layout=\"row\" layout-align=\"center end\">\n" +
    "                <div class=\"main-spell shadow-inset\" ng-class=\"{'invisible':!gameLobby.isBuildAccepted(spot)}\" style=\"background-image: url({{gameLobby.getChampionSkillImageFromBuild(spot.build,spot.champion)}})\"></div>\n" +
    "                <div class=\"main-spell-letter\" layout layout-align=\"center center\">\n" +
    "                  <p>{{spot.build.skill_to_level}}</p>\n" +
    "              </div>\n" +
    "              </div>\n" +
    "            <div class=\"spell-separator\"></div>\n" +
    "            <ng-include layout=\"row\" layout-align=\"center center\" src=\"'gamelobby/views/partials/summoner-spells.tpl.html'\" ng-if=\"spot.build\"></ng-include>\n" +
    "\n" +
    "            \n" +
    "          </div>\n" +
    "          \n" +
    "          <ng-include class=\"full-width-wrapper\" src=\"'gamelobby/views/partials/main-talents.tpl.html'\" ng-if=\"spot.build\"></ng-include>\n" +
    "          \n" +
    "          <div class=\"build__main-items\" flex layout=\"row\" layout-align=\"space-around center\" ng-include=\"'gamelobby/views/partials/main-items.tpl.html'\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "");
}]);

angular.module("header/views/header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header/views/header.tpl.html",
    "<header class=\"c-header\">\n" +
    "  <div class=\"l-wrapped\" layout=\"row\">\n" +
    "    <div class=\"c-site-logo\"><a href=\"/\">L<span class=\"c-site-logo__subtext\">eague</span> <sup>o<span class=\"c-site-logo__subtext\">f</span></sup> B<span class=\"c-site-logo__subtext\">ravery</span></a></div>\n" +
    "    \n" +
    "    <nav class=\"c-navbar\">\n" +
    "      <a href=\"/about\" class=\"c-navbar__item\">About</a>\n" +
    "      <a href=\"/rules\" class=\"c-navbar__item\">Rules</a>\n" +
    "    </nav>\n" +
    "\n" +
    "    <span flex></span>\n" +
    "\n" +
    "    <input type=\"submit\" class=\"lob-btn lob-btn--has-pulse\" value=\"New Game\" ng-click=\"home.createGame()\" />\n" +
    "  </div>\n" +
    "</header>");
}]);

angular.module("home/views/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/views/home.tpl.html",
    "<div ng-include=\"'header/views/header.tpl.html'\" ng-show=\"main.state.current.name == 'home'\"></div>\n" +
    "\n" +
    "<div class=\"c-hero-banner l-wrapped\" layout=\"row\" layout-align=\"center center\">\n" +
    "  <h1 class=\"c-logo-graphic\">\n" +
    "    <span>League</span>\n" +
    "    <span>of</span>\n" +
    "    <span>Bravery</span>\n" +
    "    <div class=\"c-logo-graphic__subtext\">the Ultimate Bravery Team Builder App</div>\n" +
    "  </h1>\n" +
    "  <span class=\"c-hero-banner__graphic\"></span>\n" +
    "</div>\n" +
    "\n" +
    "<main layout=\"column\" flex layout-align=\"center center\">\n" +
    "  \n" +
    "  <section class=\"l-games-list-container is-framed\" layout=\"column\" flex=\"80\">\n" +
    "    \n" +
    "    <div class=\"frame frame--center\"></div>\n" +
    "\n" +
    "    <header class=\"l-games-list-container__header\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-sm-12\">\n" +
    "          <input type=\"search\" class=\"form-control input input-lg input--search lob-form-input\" placeholder=\"Search for a game\" ng-model=\"home.searchTerm\" api-search=\"home.games\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </header>\n" +
    "\n" +
    "    <ul class=\"c-games-list list-unstyled\">\n" +
    "      <li class=\"c-games-list__item\" ng-repeat=\"game in home.games track by $index\" ng-hide=\"game.private\" layout=\"row\" flex>\n" +
    "        \n" +
    "         <div class=\"c-games-list__item-meta\" flex>\n" +
    "         <div layout=\"row\" layout-align=\"start center\" flex>\n" +
    "           <div layout=\"column\" layout-align=\"center start\" flex>\n" +
    "             <div class=\"c-games-list__item-title\">{{game.title}}</div>\n" +
    "             <div layout=\"row\">\n" +
    "             <span am-time-ago=\"game.createdAt\"></span>, by \n" +
    "             <strong class=\"c-games-list__item-username\">{{ game.user.nickname }}</strong>\n" +
    "             </div>\n" +
    "             </div>\n" +
    "             <div layout=\"row\" flex=\"33\" layout-align=\"center center\">\n" +
    "              <div class=\"c-games-list__item-spots\">{{game.gameMode}}</div>\n" +
    "             </div>\n" +
    "             <div layout=\"row\" flex=\"33\" layout-align=\"end center\">\n" +
    "             <div class=\"c-games-list__item-spots\">{{game.users.length}}/{{game.numberOfSpots}} players</div>\n" +
    "             </div>\n" +
    "           \n" +
    "           </div>\n" +
    "         </div>\n" +
    "\n" +
    "         <button class=\"lob-btn c-games-list__item-button\" ng-click=\"home.joinGame(game.id)\">Join</button>  \n" +
    "      </li>\n" +
    "    </ul>\n" +
    "\n" +
    "  </section>\n" +
    "\n" +
    "</main>\n" +
    "");
}]);
