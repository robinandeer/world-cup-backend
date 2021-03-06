var App;

App = Ember.Application.create();

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id'
});

DS.RESTAdapter.reopen({
  namespace: 'api/v1'
});


Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
;

Ember.Handlebars.registerHelper('eachIndexed', function(path, options) {
  var eachFn, fn, keywordName;
  keywordName = 'item';
  if (arguments.length === 4) {
    keywordName = arguments[0];
    options = arguments[3];
    path = arguments[2];
    options.hash.keyword = keywordName;
    if (path === '') {
      path = 'this';
    }
  }
  if (arguments.length === 1) {
    options = path;
    path = 'this';
  }
  fn = options.fn;
  eachFn = function() {
    var index, keywords, len, list, view;
    keywords = arguments[1].data.keywords;
    view = arguments[1].data.view;
    index = view.contentIndex;
    list = view._parentView.get('content') || [];
    len = list.length;
    keywords['index'] = index;
    keywords['index_1'] = index + 1;
    keywords['first'] = index === 0;
    keywords['last'] = index + 1 === len;
    keywords['even'] = index % 2 === 0;
    keywords['odd'] = !keywords['even'];
    arguments[1].data.keywords = keywords;
    return fn.apply(this, arguments);
  };
  options.fn = eachFn;
  options.hash.dataSourceBinding = path;
  if (options.data.insideGroup && !options.hash.groupedRows && !options.hash.itemViewClass) {
    return new Ember.Handlebars.GroupedEach(this, path, options).render();
  } else {
    return Ember.Handlebars.helpers.collection.call(this, 'Ember.Handlebars.EachView', options);
  }
});

App.Router.map(function() {
  this.resource('consensus');
  this.resource('profiles', function() {
    return this.resource('profile', {
      path: '/:user_id'
    });
  });
  this.resource('teams', function() {
    return this.resource('team', {
      path: '/:team_id'
    });
  });
  this.resource('rules');
  return this.resource('highscore');
});

App.ApplicationController = Ember.ObjectController.extend();

App.User = DS.Model.extend({
  name: DS.attr('string'),
  loggedInAt: DS.attr('string'),
  accessToken: DS.attr('string'),
  active: DS.attr('boolean'),
  email: DS.attr('string'),
  family_name: DS.attr('string'),
  given_name: DS.attr('string'),
  nickname: DS.attr('string'),
  points: DS.attr('number'),
  groupWinners: DS.hasMany('team'),
  groupRunnerUps: DS.hasMany('team'),
  round1Winners: DS.hasMany('team'),
  round2Winners: DS.hasMany('team'),
  round3Winners: DS.hasMany('team'),
  round3Losers: DS.hasMany('team'),
  finalWinner: DS.belongsTo('team'),
  thirdPlaceWinner: DS.belongsTo('team')
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('user', 'current');
  }
});

App.ApplicationView = Ember.View.extend({
  classNames: ['fill-up']
});

App.ConsensusController = Ember.ObjectController.extend();

App.Tree = DS.Model.extend({
  groupWinners: DS.hasMany('team'),
  groupRunnerUps: DS.hasMany('team'),
  round1Winners: DS.hasMany('team'),
  round2Winners: DS.hasMany('team'),
  round3Winners: DS.hasMany('team'),
  round3Losers: DS.hasMany('team'),
  finalWinner: DS.belongsTo('team'),
  thirdPlaceWinner: DS.belongsTo('team')
});

App.ConsensusRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('tree', 'whatever');
  }
});

App.Team = DS.Model.extend({
  code: DS.attr('string'),
  name: DS.attr('string'),
  rank: DS.attr('number'),
  points: DS.attr('number'),
  fifaRank: DS.attr('number'),
  eloRank: DS.attr('number'),
  eloScore: DS.attr('number'),
  confederation: DS.attr('string'),
  betfair: DS.attr('number'),
  likelihoodToWin: DS.attr('number'),
  likelihoodToAdvance: DS.attr('number'),
  flagImage: (function() {
    return "/static/img/flags/" + (this.get('name')) + ".png";
  }).property('name'),
  group: DS.belongsTo('group')
});

App.Group = DS.Model.extend({
  group_id: DS.attr('string'),
  teams: DS.hasMany('team')
});

App.HighscoreController = Ember.ArrayController.extend();

App.Highscore = DS.Model.extend({
  name: DS.attr('string'),
  nickname: DS.attr('string'),
  points: DS.attr('number')
});

App.HighscoreRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('highscore');
  }
});

App.IndexController = Ember.ObjectController.extend({
  needs: ['application'],
  userBinding: 'controllers.application.model',
  actions: {
    peekFriend: function() {
      return this.transitionToRoute('profile', this.get('friendEmail'));
    }
  },
  stat: (function() {
    return this.store.find('stat', this.get('user.finalWinner.id') || 'unknown');
  }).property('user.finalWinner.id')
});

App.Stat = DS.Model.extend({
  userCount: DS.attr('number'),
  completeCount: DS.attr('number'),
  winnerCount: DS.attr('number'),
  completeRatio: (function() {
    return this.get('completeCount') / 100;
  }).property('completeCount'),
  completeRatioCSS: (function() {
    return "width: " + (this.get('completeRatio') * 100) + "%";
  }).property('completeRatio'),
  isComplete: (function() {
    return this.get('completeCount') >= 100;
  }).property('completeCount')
});

App.ProfileController = Ember.ObjectController.extend({
  needs: ['application'],
  userBinding: 'controllers.application.model',
  actions: {
    setNickname: function() {
      if (this.get('isYourProfile')) {
        this.set('nickname', this.get('nicknameInput'));
        return this.get('model').save();
      }
    },
    unsetNickname: function() {
      return this.set('nickname', null);
    }
  },
  isYourProfile: (function() {
    return this.get('user.email') === this.get('email');
  }).property('user.email', 'email')
});

App.ProfileRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('user', params.user_id);
  }
});

App.ProfilesController = Ember.ArrayController.extend({
  users: (function() {
    return this.get('model').slice(1);
  }).property('model.@each')
});

App.ProfilesRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('user');
  }
});

App.TeamController = Ember.ObjectController.extend({
  needs: ['application'],
  userBinding: 'controllers.application.model',
  usersByWinner: (function() {
    return this.store.find('user', {
      finalWinner: this.get('id')
    });
  }).property('id')
});

App.TeamRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('team', params.team_id);
  }
});

App.TeamsController = Ember.ArrayController.extend();

App.TeamsRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('team');
  }
});
