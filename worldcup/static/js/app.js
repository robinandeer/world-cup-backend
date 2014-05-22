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

App.Router.map(function() {
  this.resource('groups');
  return this.resource('playoffs', {
    path: '/playoffs/:round_id'
  });
});

App.ApplicationController = Ember.ObjectController.extend({
  theContent: 'Say no more...',
  isEditing: true,
  playoffs: [
    {
      id: 1,
      teamCount: 16,
      name: 'Round of 16'
    }, {
      id: 2,
      teamCount: 8,
      name: 'Quarter Finals'
    }, {
      id: 3,
      teamCount: 4,
      name: 'Semi Finals'
    }, {
      id: 4,
      teamCount: 2,
      bonusCount: 2,
      name: 'Finals'
    }
  ]
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
  groupRunnerUps: DS.hasMany('team'),
  round1Winners: DS.hasMany('team'),
  round2Winners: DS.hasMany('team'),
  round3Winners: DS.hasMany('team'),
  round4Winners: DS.hasMany('team'),
  round4RunnerUps: DS.hasMany('team')
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
        return this.transitionToRoute('playoffs', 1);
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
    var teams;
    teams = this.get('model').getEach('winner');
    teams.clean();
    return this.get('user.groupWinners').then(function(userTeams) {
      userTeams.clear();
      return userTeams.pushObjects(teams);
    });
  }).observes('model.@each.winner'),
  runnerUpsObserver: (function() {
    var teams;
    teams = this.get('model').getEach('runnerUp');
    teams.clean();
    return this.get('user.groupRunnerUps').then(function(userTeams) {
      userTeams.clear();
      return userTeams.pushObjects(teams);
    });
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

App.Group = DS.Model.extend({
  group_id: DS.attr('string'),
  teams: DS.hasMany('team')
});

App.GroupsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('group');
  }
});

App.PlayoffsController = Ember.ArrayController.extend({
  needs: ['application'],
  userBinding: 'controllers.application.model',
  playoffsBinding: 'controllers.application.playoffs',
  init: function() {
    return this.get('teams').setEach('isWinner', false);
  },
  currentPlayoff: (function() {
    var teamCount;
    teamCount = this.get('model.length') * 2;
    return this.get('playoffs').filterBy('teamCount', teamCount).get('firstObject');
  }).property('model.length', 'playoffs'),
  roundWinnersId: (function() {
    return "round" + (this.get('currentPlayoff.id')) + "Winners";
  }).property('currentPlayoff.id'),
  roundRunnerUpsId: (function() {
    return "round" + (this.get('currentPlayoff.id')) + "RunnerUps";
  }).property('currentPlayoff.id'),
  nextPlayoff: (function() {
    var current, nextIndex, playoffs;
    playoffs = this.get('playoffs');
    current = this.get('currentPlayoff');
    nextIndex = playoffs.indexOf(current) + 1;
    return playoffs[nextIndex];
  }).property('currentPlayoff'),
  matchupParts: (function() {
    var matchups;
    matchups = this.get('model');
    return [matchups.slice(0, matchups.get('length') / 2), matchups.slice(matchups.get('length') / 2)];
  }).property('model.@each'),
  isReadyToMoveOn: (function() {
    return this.get('winners.length') === this.get('model.length');
  }).property('winners.length', 'model.length'),
  winners: (function() {
    return this.get('teams').filterBy('isWinner', true);
  }).property('teams.@each.isWinner'),
  winnersObserver: (function() {
    var roundWinners, user;
    user = this.get('user');
    roundWinners = user.get(this.get('roundWinnersId'));
    roundWinners.clear();
    return roundWinners.pushObjects(this.get('winners'));
  }).observes('winners.@each', 'roundWinnersId'),
  runnerUps: (function() {
    return this.get('teams').filterBy('isWinner', false);
  }).property('teams.@each.isWinner'),
  runnerUpsObserver: (function() {
    var roundRunnerUps, user;
    user = this.get('user');
    roundRunnerUps = user.get(this.get('roundRunnerUpsId'));
    roundRunnerUps.clear();
    return roundRunnerUps.pushObjects(this.get('runnerUps'));
  }).observes('runnerUps.@each', 'roundRunnerUpsId'),
  teams: (function() {
    var teams;
    teams = Em.A();
    this.get('model').forEach(function(matchup) {
      return teams.pushObjects(matchup.get('teams'));
    });
    return teams;
  }).property('model.@each.teams.@each'),
  currentPlayoffObserver: (function() {
    return this.get('winners').setEach('isWinner', false);
  }).observes('currentPlayoff'),
  actions: {
    pickWinner: function(match, team) {
      match.get('teams').setEach('isWinner', false);
      return team.set('isWinner', true);
    },
    moveOn: function() {
      if (this.get('isReadyToMoveOn')) {
        this.get('user').save();
        return this.transitionToRoute('playoffs', this.get('nextPlayoff.id'));
      }
    }
  }
});

App.Matchup = DS.Model.extend({
  homeTeam: DS.belongsTo('team'),
  awayTeam: DS.belongsTo('team'),
  teams: (function() {
    return Em.A([this.get('homeTeam'), this.get('awayTeam')]);
  }).property('homeTeam', 'awayTeam')
});

App.PlayoffsRoute = Ember.Route.extend({
  model: function(params) {
    var controller, prevRoundLosersId, prevRoundWinnersId, runnerUps, user, winners;
    user = this.modelFor('application');
    if (params.round_id === '1') {
      winners = user.get('groupWinners').getEach('code').join(',');
      runnerUps = user.get('groupRunnerUps').getEach('code').join(',');
    } else {
      controller = this.controllerFor('playoffs');
      prevRoundWinnersId = "round" + (params.round_id - 1) + "Winners";
      prevRoundLosersId = "round" + (params.round_id - 1) + "Losers";
      winners = user.get(prevRoundWinnersId).getEach('code').join(',');
      runnerUps = (user.get(prevRoundLosersId) || Em.A()).getEach('code').join(',');
    }
    return this.store.find('matchup', {
      round: params.round_id,
      winners: winners,
      runner_ups: runnerUps
    });
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
