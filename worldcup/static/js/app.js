var App;

App = Ember.Application.create();

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id'
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

App.Router.map(function() {
  this.resource('groups');
  return this.resource('playoffs', {
    path: '/playoffs/:round_id'
  });
});

App.ApplicationController = Ember.ObjectController.extend({
  theContent: 'Say no more...',
  isEditing: true,
  init: function() {
    return console.log('H!!!');
  }
});

App.ApplicationView = Ember.View.extend({
  classNames: ['fill-up']
});

App.User = DS.Model.extend({
  name: DS.attr('string'),
  loggedInAt: DS.attr('string'),
  accessToken: DS.attr('string'),
  active: DS.attr('boolean'),
  email: DS.attr('string'),
  groupWinners: DS.hasMany('team'),
  groupRunnerUps: DS.hasMany('team')
});

App.UserAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1'
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('user', 'current');
  }
});

App.AGroupComponent = Ember.Component.extend({
  classNames: ['group', 'a-layout__panel--full', 'a-layout__wrapper', 'br--listed'],
  model: null,
  actions: {
    setPosition: function(team_id, position) {
      var team, teams;
      teams = this.get('model.teams');
      teams.filterBy('position', position).setEach('position', null);
      team = teams.findBy('id', team_id);
      team.set('position', position);
      if (position === 1) {
        return this.set('model.winner', team);
      } else {
        return this.set('model.runnerUp', team);
      }
    }
  }
});

App.GroupsController = Ember.ArrayController.extend({
  needs: ['application'],
  userBinding: 'controllers.application.model',
  actions: {
    goToPlayoffs: function(group) {
      if (this.get('readyToMoveOn')) {
        this.get('user').save();
        return this.transitionToRoute('playoffs', 16);
      }
    },
    setProperty: function(model, key, value) {
      return model.set(key, value);
    }
  },
  groupParts: (function() {
    var groups;
    groups = this.get('model');
    return [groups.slice(0, groups.get('length') / 2), groups.slice(groups.get('length') / 2)];
  }).property('model.@each'),
  readyToMoveOn: (function() {
    var runnerUps, winners;
    winners = this.get('user.groupWinners.length');
    runnerUps = this.get('user.groupRunnerUps.length');
    if ((winners + runnerUps) === 16) {
      return true;
    }
  }).property('user.groupWinners.length', 'user.groupRunnerUps.length'),
  winnersObserver: (function() {
    var teams, userTeams;
    teams = this.get('model').getEach('winner');
    teams.clean();
    userTeams = this.get('user.groupWinners');
    userTeams.clear();
    return userTeams.pushObjects(teams);
  }).observes('model.@each.winner'),
  runnerUpsObserver: (function() {
    var teams, userTeams;
    teams = this.get('model').getEach('runnerUp');
    teams.clean();
    userTeams = this.get('user.groupRunnerUps');
    userTeams.clear();
    return userTeams.pushObjects(teams);
  }).observes('model.@each.runnerUp')
});

App.Team = DS.Model.extend({
  code: DS.attr('string'),
  name: DS.attr('string'),
  rank: DS.attr('number'),
  points: DS.attr('number'),
  position: DS.attr('number'),
  group: DS.belongsTo('group'),
  isWinner: (function() {
    return this.get('position') === 1;
  }).property('position'),
  isRunnerUp: (function() {
    return this.get('position') === 2;
  }).property('position')
});

App.TeamAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1'
});

App.Group = DS.Model.extend({
  group_id: DS.attr('string'),
  teams: DS.hasMany('team')
});

App.GroupAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1'
});

App.GroupsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('group');
  }
});

App.Round = DS.Model.extend({
  name: DS.attr('string'),
  matchups: DS.attr('string'),
  matchupParts: (function() {
    var matchups;
    matchups = this.get('matchups') || [];
    return [matchups.slice(0, matchups.get('length') / 2), matchups.slice(matchups.get('length') / 2)];
  }).property('matchups.@each')
});

App.RoundAdapter = DS.RESTAdapter.extend({
  namespace: 'api/v1'
});

App.PlayoffsRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('round', params.round_id);
  }
});

Ember.ContenteditableView = Ember.View.extend({
  tagName: 'div',
  attributeBindings: ['contenteditable'],
  editable: false,
  isUserTyping: false,
  plaintext: false,
  contenteditable: (function() {
    var editable;
    editable = this.get('editable');
    if (editable) {
      return 'true';
    } else {
      return void 0;
    }
  }).property('editable'),
  valueObserver: (function() {
    if (!this.get('isUserTyping') && this.get('value')) {
      return this.setContent();
    }
  }).observes('value'),
  didInsertElement: function() {
    return this.setContent();
  },
  focusOut: function() {
    return this.set('isUserTyping', false);
  },
  keyDown: function(event) {
    if (!event.metaKey) {
      return this.set('isUserTyping', true);
    }
  },
  keyUp: function(event) {
    if (this.get('plaintext')) {
      return this.set('value', this.$().text());
    } else {
      return this.set('value', this.$().html());
    }
  },
  render: function(buffer) {
    return buffer.push(this.get('value'));
  },
  setContent: function() {
    return this.$().html(this.get('value'));
  }
});
