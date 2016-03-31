
CardCtrl['$inject'] = ['ChampionService', '$q'];

function CardCtrl(ChampionService, $q) {

var vm = this;
var items;
var summoners;
var champions;

vm.init = function(){
  $q.all([
  ChampionService.getItems(),
  ChampionService.getSummoners(),
  ChampionService.getChampions()
  ]).then(function(result){
  items= result[0];
  summoners= result[1];
  champions= result[2];
});
};


vm.getItems = function(){
  ChampionService.getItems().then(function(result){
    items=result;
  });
};
vm.getSummoners = function(){
  ChampionService.getSummoners().then(function(result){
    summoners=result;
  });
};
vm.getChampions = function(){
  ChampionService.getChampions().then(function(result){
    champions=result;
  });
};

vm.getItemDecription = function(item){
    return items[item];
};
vm.getChampionImage = function(championImageId){
  return ChampionService.getChampionImage(championImageId);
};

vm.getItemImageFromBuild = function(build, type){
  if(items[build[type]].group && items[build[type]].group.lastIndexOf("JungleItems",0) === 0){
    return ChampionService.getItemImage(build.jungleItemEnchantment);
  } else {
    return ChampionService.getItemImage(build[type]);
  }
};

vm.getSummonerImageFromBuild = function(build, type){
  return ChampionService.getSummonerImage(summoners[build[type]].image.full);
};


vm.getChampion = function(championId) {
  return ChampionService.getChampion(championId);
};

vm.getChampionSkillImageFromBuild = function(build){
  var spell = vm.getSkillFromChampion(build);

  return ChampionService.getAbilityImage(build.champion, spell.image.full);
};

vm.getItemFromBuild = function(build, type) {
  var item = angular.copy(items[build[type]]);
  var combinedName;
  if(item.group === "JungleItems") {
    item = angular.copy(items[build.jungleItemEnchantment]);
    combinedName = items[build[type]].name + " with " + item.name;
    item.name = combinedName;
  }else if(type === "boots"){
    item = angular.copy(items[build.bootsEnchantment]);
    combinedName = items[build[type]].name + " with " + item.name;
    item.name = combinedName;
  }
  return item;
};

vm.getChampionBackground = function(championImageId) {
    return ChampionService.getChampionBackground(championImageId);
};

vm.getSkillFromChampion = function(build) {
  var index = 0;
  switch(build.skill_to_level){
    case "Q":
    index = 0;
     break;
     case "W":
    index = 1;
     break;
     case "E":
    index = 2;
     break;
     default:
      index = 0;
  }

  return champions[build.champion].spells[index];
};



vm.init();
}

angular.module('ubteambuilder').component('cards', {
  templateUrl: '/app/common/components/cards/cards.tpl.html',
  controller: CardCtrl,
  controllerAs: 'vm',
  bindings: {
    build: '='
  }
});
