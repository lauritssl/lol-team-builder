angular.module('templates-app', ['authentication/views/login.tpl.html', 'authentication/views/signupModal.tpl.html', 'createGame/views/createGame.tpl.html', 'gamelobby/views/championShield.tpl.html', 'gamelobby/views/enterModal.tpl.html', 'gamelobby/views/game-lobby.tpl.html', 'gamelobby/views/gamelobby.tpl.html', 'gamelobby/views/player-token-left.tpl.html', 'header/views/header.tpl.html', 'home/views/home.tpl.html']);

angular.module("authentication/views/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("authentication/views/login.tpl.html",
    "<!-- BG animated -->\n" +
    "    <div id=\"single-login-bg-container\">\n" +
    "    <div class=\"col-xs-12\" style=\"padding: 0px;\">\n" +
    "        <video autoplay loop id=\"login_bg-render\">\n" +
    "        <source src=\"../../images/webm/BG_animated.webm\" type=\"video/webm\">\n" +
    "        </video>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "\n" +
    "<!-- Main content - Login -->\n" +
    "  <div class=\"content-bg\">\n" +
    "        <div class=\"sidebar-wrapper\">\n" +
    "                <div id=\"login_sidebar-iconholder\">\n" +
    "                    <img src=\"../../images/UB_logo.png\" />\n" +
    "                </div>\n" +
    "                <div id=\"login_sidebar-formholder\">\n" +
    "                    <div class=\"col-xs-8 col-xs-offset-2\">\n" +
    "                    <p class=\"p_bluetext\">ACCOUNT LOGIN</p>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label for=\"login_username\">USERNAME</label>\n" +
    "                         <input type=\"text\" class=\"form-control\" id=\"login_username\" name=\"\" value=\"\" ng-model=\"authentication.credentials.username\">\n" +
    "                         <label for=\"login_password\">PASSWORD</label>\n" +
    "                         <input type=\"password\" class=\"form-control\" id=\"login_password\" name=\"\" value=\"\" ng-model=\"authentication.credentials.password\">\n" +
    "                    </div>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" id=\"login-btn_frontpage\" ng-click=\"authentication.login(authentication.credentials)\">Login</button>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-8 col-xs-offset-2\" id=\"login_signup-router\">\n" +
    "                        <p>NEED AN ACCOUNT?</p>\n" +
    "                        <p><a href=\"/register\" class=\"p_bluetext\">SIGN UP NOW!</a></p>\n" +
    "                    </div>\n" +
    "                </div>    \n" +
    "            </div>\n" +
    "        </div>");
}]);

angular.module("authentication/views/signupModal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("authentication/views/signupModal.tpl.html",
    "");
}]);

angular.module("createGame/views/createGame.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("createGame/views/createGame.tpl.html",
    "<!-- BG animated -->\n" +
    " <div id=\"single-login-bg-container\">\n" +
    " 	<div class=\"col-xs-12\" style=\"padding: 0px;\">\n" +
    " 		<video autoplay loop id=\"login_bg-render\">\n" +
    " 			<source src=\"../../images/webm/BG_animated.webm\" type=\"video/webm\">\n" +
    " 			</video>\n" +
    " 		</div>\n" +
    " 	</div>\n" +
    "\n" +
    "\n" +
    " 	<div class=\"auth_content content-bg\">\n" +
    " 		<div class=\"col-md-4 main-sidebar-wrapper\">\n" +
    " 			<div class=\"main-sidebar\">\n" +
    " 				<div class=\"col-xs-8 col-xs-offset-2\">\n" +
    " 					<p class=\"p_bluetext\">CREATE NEW GAME</p>\n" +
    " 					<div class=\"form-group\">\n" +
    " 						<label for=\"game_name\">GAME NAME</label>\n" +
    " 						<input type=\"text\" class=\"form-control\" id=\"game_name\"  name=\"game_name\" ng-model=\"createGame.game.title\"> \n" +
    " 						<label for=\"game_private\">PRIVATE</label>\n" +
    " 						<input type=\"checkbox\" ng-model=\"createGame.game.public\" ng-true-value=\"true\" ng-false-value=\"false\" ng-false class=\"form-control\" id=\"game_name\"  name=\"game_private\"> \n" +
    " 						<label for=\"game_name\">NUMBER OF PLAYERS</label>\n" +
    " 						<input type=\"range\" ng-model=\"createGame.game.numberOfSpots\" min=\"1\" max=\"10\" step=\"1\" style=\"width: 140px\" class=\"ng-valid ng-dirty\">\n" +
    " 						<p>{{createGame.game.numberOfSpots}}</p>                \n" +
    " 					</div>\n" +
    " 					<input type=\"submit\" class=\"btn ub-custom-btn custom-btn-red\" value=\"Create\" ng-click=\"createGame.createGame(createGame.game)\">\n" +
    " 				</div> 				\n" +
    " 			</div>    \n" +
    " 		</div>\n" +
    " 		<div class=\"col-md-8 content-wrapper create-game-content-wrapper\">\n" +
    " 			<div class=\"row  create-game-content\">\n" +
    "				<div ng-click=\"createGame.changeMap(11)\"  class=\"col-xs-6 col-lg-4 map-image-container\"><img ng-class=\"{highligthed: createGame.game.map == 11}\"  src=\"{{createGame.getMapImage(11)}}\" alt=\"\" title=\"Summoners rift\"></div>\n" +
    "				<div ng-click=\"createGame.changeMap(12)\" class=\"col-xs-6 col-lg-4  map-image-container\"><img  ng-class=\"{highligthed: createGame.game.map == 12}\" src=\"{{createGame.getMapImage(12)}}\" alt=\"\" title=\"Howling abyss\"></div>\n" +
    "				<div ng-click=\"createGame.changeMap(10)\" class=\"col-xs-6 col-lg-4  map-image-container\"><img ng-class=\"{highligthed: createGame.game.map == 10}\"  src=\"{{createGame.getMapImage(10)}}\" alt=\"\" title=\"Twisted Treeline\"></div>\n" +
    " 			</div>\n" +
    " 		</div>\n" +
    " 	</div>\n" +
    "\n" +
    " </div>");
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
    "    <p id=\"champion_name\">{{spot.champion}}</p>\n" +
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

angular.module("gamelobby/views/enterModal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/enterModal.tpl.html",
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "  Your nickname\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <input ng-model=\"user.nickname\" type=\"text\">\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-success\" ng-click=\"user !== null && modalCtrl.ok(user)\">Join</button>\n" +
    "  <button class=\"btn btn-warning\" ng-click=\"modalCtrl.cancel()\">Cancel</button>\n" +
    "</div>");
}]);

angular.module("gamelobby/views/game-lobby.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/game-lobby.tpl.html",
    "<main>\n" +
    "  <aside class=\"sidebar pull--left\">\n" +
    "    <ul class=\"players list-unstyled\" layout=\"column\" layout-align=\"center center\">\n" +
    "      <li\n" +
    "      class=\"player\"\n" +
    "      data-champion=\"Jax\" layout=\"row\" layout-align=\"center center\">\n" +
    "        <div ng-include='\"assets/app/gamelobby/views/player-token-left.tpl.html\"'></div>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </aside>\n" +
    "  <section class=\"content-container\">\n" +
    "  <div class=\"col-xs-6 col-xs-offset-3\" style=\"text-align: center;\">\n" +
    "            <div class=\"btn-group\">\n" +
    "            <button ng-if=\"gameLobby.userOwnsGame()\" ng-click=\"gameLobby.rollBuilds(gameLobby.game)\" id=\"lobby_btn-roll\" class=\"btn ub-custom-btn custom-btn-red center\">ROLL ALL</button>\n" +
    "            <button ng-if=\"gameLobby.userOwnsGame()\" ng-click=\"gameLobby.resetBuilds(gameLobby.game.id)\" id=\"lobby_btn-roll\" class=\"btn ub-custom-btn custom-btn-grey center\">RESET ALL</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    <div class=\"card-deck centered-container\">\n" +
    "      <div class=\"notification\">Draw a card...</div>\n" +
    "      <article class=\"card\" style=\"z-index: 100;\">\n" +
    "        <div class=\"card__back\"></div>\n" +
    "        <div class=\"card__front fluid-background\" ng-style=\"{{gameLobby.getChampionBackground(gameLobby.game.spots[0])}}\">\n" +
    "          <div class=\"card__title\">{{gameLobby.game.spots[0].build.champion}}</div>\n" +
    "          <div class=\"card__meta-icon fluid-background\" style=\"background-image: url({{gameLobby.getChampionSkillImageFromBuild(gameLobby.game.spots[0].build,gameLobby.game.spots[0].champion)}})\" data-sub-icon=\"\"><p>{{gameLobby.getBuildFromGame(gameLobby.game, gameLobby.game.spots[0].build).skill_to_level}}</p></div>\n" +
    "            <div class=\"grid\">\n" +
    "              <div class=\"grid__parent grid__parent--4\">\n" +
    "                \n" +
    "                  <div class=\"pill-bar\">\n" +
    "                    <div class=\"pill\" data-mastery-points=\"10\"></div>\n" +
    "                    <div class=\"pill\" data-mastery-points=\"10\"></div>\n" +
    "                    <div class=\"pill\" data-mastery-points=\"10\"></div>\n" +
    "                  </div>\n" +
    "                \n" +
    "                <div class=\"sub-container group\">\n" +
    "                  <div class=\"grid__child rounded grid__parent--2 float--left revealer\" data-summoner-spell=\"Heal\"></div>\n" +
    "\n" +
    "                  <div class=\"grid__child rounded grid__parent--2 float--left revealer\" data-summoner-spell=\"Lightning\"></div>\n" +
    "                 \n" +
    "                </div>\n" +
    "                \n" +
    "                \n" +
    "              </div>\n" +
    "              <div class=\"grid__parent grid__parent--2\">\n" +
    "                <div class=\"grid__child revealer\" data-item=\"\"></div>\n" +
    "                <div class=\"grid__child revealer\" data-item=></div>\n" +
    "              </div>\n" +
    "              <div class=\"grid__parent grid__parent--2\">\n" +
    "                <div class=\"grid__child revealer\" data-item=\"\"></div>\n" +
    "                <div class=\"grid__child revealer\" data-item=\"\"></div>  \n" +
    "              </div>\n" +
    "              <div class=\"grid__parent grid__parent--2\">\n" +
    "                <div class=\"grid__child revealer\" data-item=\"\"></div>\n" +
    "                <div class=\"grid__child revealer\" data-item=\"\"></div>                \n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "      </article> <!-- /card --> \n" +
    "      \n" +
    "       <div class=\"card-interactions\">\n" +
    "        <button class=\"btn btn--success\" ng-click=\"addBuildToPlayer\">Accept Build</button>\n" +
    "        <button class=\"btn btn--danger\" ng-click=\"requestReroll\">Request Re-Roll</button>\n" +
    "      </div> \n" +
    "    </div>\n" +
    "   \n" +
    "  </section>\n" +
    "  <aside class=\"sidebar pull--right\">\n" +
    "    <ul class=\"players list-unstyled\" layout=\"column\" layout-align=\"center center\">\n" +
    "      <li\n" +
    "      class=\"player\"\n" +
    "      data-champion=\"Jax\" layout=\"row\" layout-align=\"center center\">\n" +
    "        \n" +
    "        <div class=\"player__token-wrapper\" layout=\"column\" layout-align=\"center center\">\n" +
    "          <div class=\"player__option-icon option--one\" layout=\"row\" layout-align=\"center center\">\n" +
    "            \n" +
    "          </div>\n" +
    "          <div class=\"player__option-icon option--two\" layout=\"row\" layout-align=\"center center\">\n" +
    "            \n" +
    "          </div>\n" +
    "          <div class=\"player__option-icon option--three\" layout=\"row\" layout-align=\"center center\">\n" +
    "            \n" +
    "          </div>\n" +
    "          <div class=\"player__token-image\"></div>\n" +
    "          <div class=\"player__token-polygon\"></div>\n" +
    "          <div class=\"player__token-nameplate\">\n" +
    "            <p class=\"token-nameplate__player-name\">\n" +
    "              Lichine\n" +
    "            </p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <p class=\"player__hero-name\">Jax</p>\n" +
    "        <div class=\"player__portrait-bg\"></div>\n" +
    "        <span flex></span>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </aside>\n" +
    "</main>\n" +
    "\n" +
    "<script>\n" +
    "(function() {\n" +
    "  $(function() {\n" +
    "    var card, deck, initialCard, layer, notificationInitialState, rerollButtonInitialState, _i, _len;\n" +
    "    initialCard = $('.card').html();\n" +
    "    notificationInitialState = $('.notification').text();\n" +
    "    deck = ['', '', '', '', '', '', '', ''];\n" +
    "    layer = 0;\n" +
    "    for (_i = 0, _len = deck.length; _i < _len; _i++) {\n" +
    "      card = deck[_i];\n" +
    "      $('.card-deck').append(\"<article class=\\\"card\\\" style=\\\"z-index:\" + layer + \"\\\">\" + initialCard + \"</article>\");\n" +
    "      layer++;\n" +
    "    }\n" +
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
    "                 <div class=\"row\" ng-include=\"'gamelobby/views/championShield.tpl.html'\">\n" +
    "                       \n" +
    "                </div>\n" +
    "                                \n" +
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

angular.module("gamelobby/views/player-token-left.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("gamelobby/views/player-token-left.tpl.html",
    "<div class=\"player__build-wrapper\" flex layout=\"column\" layout-align=\"start start\">\n" +
    "          <div class=\"build__main-spells\" flex layout=\"row\" layout-align=\"space-around center\">\n" +
    "            <div class=\"main-spell-wrapper\" layout=\"row\" layout-align=\"center end\">\n" +
    "                <div class=\"main-spell\"></div>\n" +
    "                <div class=\"main-spell-letter\" layout layout-align=\"center center\">\n" +
    "                  <p>W</p>\n" +
    "              </div>\n" +
    "              </div>\n" +
    "            <div class=\"spell-separator\"></div>\n" +
    "            <div class=\"summoner-spell spell-one\"></div>\n" +
    "            <div class=\"summoner-spell spell-two\"></div>\n" +
    "          </div>\n" +
    "          \n" +
    "          <div class=\"build__main-talents\" flex layout=\"row\" layout-align=\"center center\">\n" +
    "            <div class=\"talents-wrapper\" layout=\"row\" layout-align=\"center center\">\n" +
    "              <div class=\"talent\" layout layout-align=\"center center\">\n" +
    "                <p>10</p>\n" +
    "              </div>\n" +
    "              <div class=\"talent\" layout layout-align=\"center center\">\n" +
    "                <p>10</p>\n" +
    "              </div>\n" +
    "              <div class=\"talent\" layout layout-align=\"center center\">\n" +
    "                <p>10</p>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          \n" +
    "          <div class=\"build__main-items\" flex layout=\"row\" layout-align=\"space-around center\">\n" +
    "            <div class=\"item\"></div>\n" +
    "            <div class=\"item\"></div>\n" +
    "            <div class=\"item\"></div>\n" +
    "            <div class=\"item\"></div>\n" +
    "            <div class=\"item\"></div>\n" +
    "            <div class=\"item\"></div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <span flex></span>\n" +
    "        <div class=\"player__portrait-bg\"></div>\n" +
    "        <div class=\"player__token-wrapper\" layout=\"column\" layout-align=\"center center\">\n" +
    " \n" +
    "          <div class=\"player__option-icon option--one\" layout=\"row\" layout-align=\"center center\">\n" +
    "          </div>\n" +
    "          <div class=\"player__option-icon option--two\" layout=\"row\" layout-align=\"center center\">\n" +
    "          </div>\n" +
    "          <div class=\"player__option-icon option--three\" layout=\"row\" layout-align=\"center center\">\n" +
    "          </div>\n" +
    "          \n" +
    "          <div class=\"player__token-image\"></div>\n" +
    "          <div class=\"player__token-polygon\"></div>\n" +
    "          <div class=\"player__token-nameplate\">\n" +
    "            <p class=\"token-nameplate__player-name\">\n" +
    "              Scrappycoco\n" +
    "            </p>\n" +
    "          </div>\n" +
    "        </div>");
}]);

angular.module("header/views/header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header/views/header.tpl.html",
    "<div ng-controller=\"HeaderCtrl\" ng-cloak>\n" +
    "    <div id=\"top-bar\"  class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n" +
    "      <div class=\"container\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "          <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n" +
    "            <span class=\"sr-only\">Toggle navigation</span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "            <span class=\"icon-bar\"></span>\n" +
    "          </button>\n" +
    "          <a class=\"navbar-brand\" href=\"/home\">UB Team Builder</a>\n" +
    "        </div>\n" +
    "        <div class=\"collapse navbar-collapse\">\n" +
    "          <ul class=\"nav navbar-nav pull-right\">\n" +
    "            <li ng-repeat=\"navItem in navItems\">\n" +
    "                <a href=\"{{navItem.url}}\"><i class=\"{{navItem.cssClass}}\"></i> {{navItem.title}}</a>\n" +
    "            </li>\n" +
    "\n" +
    "            <li class=\"divider-vertical\"></li>\n" +
    "\n" +
    "            <li ng-if=\"currentUser\" id=\"current-user-dropdown\" class=\"dropdown\">\n" +
    "                <div class=\"btn-group\">\n" +
    "                    <a class=\"btn btn-default btn-sm dropdown-toggle\">\n" +
    "                        <i class=\"fa fa-user\"></i> {{currentUser.email}}    <span class=\"caret\"></span>\n" +
    "                    </a>\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                        <li><a href=\"/logout\"><i class=\"fa fa-share\"></i> Logout</a></li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "\n" +
    "          </ul>\n" +
    "        </div><!--/.nav-collapse -->\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("home/views/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/views/home.tpl.html",
    "<!-- BG animated -->\n" +
    "    <div id=\"single-login-bg-container\">\n" +
    "    <div class=\"col-xs-12\" style=\"padding: 0px;\">\n" +
    "        <video autoplay loop id=\"login_bg-render\">\n" +
    "        <source src=\"../../images/webm/BG_animated.webm\" type=\"video/webm\">\n" +
    "        </video>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "  <div class=\"home_content-wrapper content-bg\">\n" +
    "        <div class=\"col-md-4 main-sidebar-wrapper\">\n" +
    "            <div class=\"main-sidebar\">\n" +
    "                <div class=\"col-xs-8 col-xs-offset-2\">\n" +
    "                    <p class=\"p_bluetext\">JOIN OR CREATE A GAME</p>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label for=\"game_name\">GAME ID</label>\n" +
    "                        <input type=\"text\" class=\"form-control\" name=\"\" value=\"\" placeholder=\"Enter game id\" ng-model=\"home.game.id\">     \n" +
    "                         <button type=\"button\" class=\"btn ub-custom-btn custom-btn-red\" ng-click=\"home.joinGame(home.game.id)\">Join game</button>\n" +
    "                    </div>\n" +
    "                    <input type=\"submit\" class=\"btn ub-custom-btn custom-btn-red\" style=\"width: auto !important;\"value=\"Create a new game\" ng-click=\"main.go('/new/game')\">\n" +
    "                </div>              \n" +
    "            </div>    \n" +
    "        </div>\n" +
    "        <div class=\"content-wrapper col-md-7\" id=\"home-content\">\n" +
    "           <div>\n" +
    "               <h2>Games</h2>\n" +
    "               <div class=\"games-list\">\n" +
    "                   <div class=\"panel panel-default\">\n" +
    "                   <div class=\"panel-body\">\n" +
    "                   <div class=\"row\">\n" +
    "                    <div class=\"col-md-2\"> TITLE</div>\n" +
    "                     <div class=\"col-md-2\"> CREATED AT</div>\n" +
    "                     <div class=\"col-md-3\"> OWNER</div>\n" +
    "                     <div class=\"col-md-1\"> SPOTS</div>\n" +
    "                     <div class=\"col-md-2\"> MAP</div>\n" +
    "                     <div class=\"col-md-2\"></div>\n" +
    "                    </div>\n" +
    "                     <div ng-repeat=\"game in home.games\" class=\"row\" ng-hide=\"game.private\"> \n" +
    "\n" +
    "                     <div class=\"col-md-2\"> <b>{{game.title}}</b></div>\n" +
    "                     <div class=\"col-md-2\"> <span am-time-ago=\"game.createdAt\"></span></div>\n" +
    "                       <div class=\"col-md-3\"> {{game.user.username}}</div>\n" +
    "                     <div class=\"col-md-1\"> Coming soon <!-- {{game.spotsTaken}}/{{game.numberOfSpots}} --></div>\n" +
    "                     <div class=\"col-md-2\"> Summoners Rift</div>\n" +
    "                     <div class=\"col-md-2\">\n" +
    "                     <button class=\"btn btn-success\" ng-click=\"home.joinGame(game.id)\">JOIN</button>   \n" +
    "                     </div>\n" +
    "                    \n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "                   </div>\n" +
    "                   </div>\n" +
    "               </div>\n" +
    "           </div>\n" +
    "        </div>\n" +
    "    </div>");
}]);
