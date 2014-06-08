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
  this.resource('playoffs', {
    path: '/playoffs/:round_id'
  });
  this.resource('finals');
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
  return this.resource('rules');
});

App.ApplicationController = Ember.ObjectController.extend({
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

App.User = DS.Model.extend({
  name: DS.attr('string'),
  loggedInAt: DS.attr('string'),
  accessToken: DS.attr('string'),
  active: DS.attr('boolean'),
  email: DS.attr('string'),
  family_name: DS.attr('string'),
  given_name: DS.attr('string'),
  nickname: DS.attr('string'),
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

App.AGroupComponent = Ember.Component.extend({
  classNames: ['a-group'],
  title: null,
  teams: Em.A(),
  init: function() {
    var runnerUp, runnerUps, team, teams, winner, winners, _i, _len, _ref, _results;
    this._super();
    teams = this.get('teams');
    winners = this.get('winners');
    runnerUps = this.get('runnerUps');
    _ref = teams.get('content');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      team = _ref[_i];
      winner = winners.findBy('id', team.get('id'));
      runnerUp = runnerUps.findBy('id', team.get('id'));
      if (winner) {
        winner.set('isWinner', true);
      }
      if (runnerUp) {
        _results.push(runnerUp.set('isRunnerUp', true));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  },
  winner: (function() {
    var team, teams, winner, winners, _i, _len, _ref;
    teams = this.get('teams');
    winners = this.get('winners');
    _ref = teams.get('content');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      team = _ref[_i];
      winner = winners.findBy('id', team.get('id'));
      if (winner) {
        return winner;
      }
    }
  }).property('winners.@each', 'teams.@each'),
  runnerUp: (function() {
    var runnerUp, runnerUps, team, teams, _i, _len, _ref;
    teams = this.get('teams');
    runnerUps = this.get('runnerUps');
    _ref = teams.get('content');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      team = _ref[_i];
      runnerUp = runnerUps.findBy('id', team.get('id'));
      if (runnerUp) {
        return runnerUp;
      }
    }
  }).property('runnerUps.@each', 'teams.@each'),
  winnerObserver: (function() {
    var winner;
    this.get('teams').setEach('isWinner', false);
    winner = this.get('winner');
    if (winner) {
      return winner.set('isWinner', true);
    }
  }).observes('winner', 'teams.@each'),
  runnerUpObserver: (function() {
    var runnerUp;
    this.get('teams').setEach('isRunnerUp', false);
    runnerUp = this.get('runnerUp');
    if (runnerUp) {
      return runnerUp.set('isRunnerUp', true);
    }
  }).observes('runnerUp', 'teams.@each'),
  winners: Em.A(),
  runnerUps: Em.A(),
  actions: {
    advanceTeam: function(team, position) {
      var other, userTeams;
      userTeams = this.get(position);
      other = position === 'winners' ? 'runnerUps' : 'winners';
      this.get(other).removeObject(team);
      userTeams.removeObjects(this.get('teams'));
      return userTeams.addObject(team);
    }
  }
});

App.AMatchupComponent = Ember.Component.extend({
  classNames: ['a-matchup', 'a-layout__wrapper'],
  order: null,
  teams: Em.A(),
  winners: Em.A(),
  losers: Em.A(),
  winner: (function() {
    var team, teams, winner, winners, _i, _len;
    teams = this.get('teams');
    winners = this.get('winners');
    for (_i = 0, _len = teams.length; _i < _len; _i++) {
      team = teams[_i];
      winner = winners.findBy('id', team.get('id'));
      if (winner) {
        return winner;
      }
    }
  }).property('winners.@each', 'teams.@each'),
  loser: (function() {
    var team, teams, winnerId, _i, _len;
    teams = this.get('teams');
    winnerId = this.get('winner.id');
    for (_i = 0, _len = teams.length; _i < _len; _i++) {
      team = teams[_i];
      if (team.get('id') !== winnerId) {
        return team;
      }
    }
  }).property('teams.@each', 'winner.id'),
  winnerObserver: (function() {
    var winner;
    this.get('teams').setEach('isStageWinner', false);
    winner = this.get('winner');
    if (winner) {
      return winner.setProperties({
        isStageWinner: true,
        stageOrder: this.get('order')
      });
    }
  }).observes('winner', 'teams.@each', 'order'),
  actions: {
    advanceTeam: function(team) {
      var losers, winners;
      winners = this.get('winners');
      winners.removeObjects(this.get('teams'));
      winners.addObject(team);
      losers = this.get('losers');
      losers.removeObjects(this.get('teams'));
      return losers.addObject(this.get('loser'));
    }
  }
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

App.FinalsController = Ember.ArrayController.extend({
  needs: ['application'],
  userBinding: 'controllers.application.model',
  actions: {
    moveOn: function() {
      if (this.get('readyToMoveOn')) {
        this.get('user').save();
        return this.transitionToRoute('profile', this.get('user'));
      }
    },
    selectWinner: function(team) {
      return this.set('user.finalWinner', team);
    },
    selectThirdPlaceWinner: function(team) {
      return this.set('user.thirdPlaceWinner', team);
    }
  },
  finalTeams: (function() {
    return Em.A(this.get('model.firstObject.teams'));
  }).property('model.firstObject.teams.@each'),
  runnerUp: (function() {
    var team, _i, _len, _ref;
    _ref = this.get('finalTeams');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      team = _ref[_i];
      if (team.get('id') !== this.get('user.finalWinner.id')) {
        return team;
      }
    }
  }).property('finalTeams.@each.id', 'user.finalWinner.id'),
  thirdPlaceTeams: (function() {
    return Em.A(this.get('model.lastObject.teams'));
  }).property('model.lastObject.teams.@each'),
  readyToMoveOn: (function() {
    return this.get('user.finalWinner') && this.get('user.thirdPlaceWinner');
  }).property('user.finalWinner', 'user.thirdPlaceWinner')
});

App.FinalsRoute = Ember.Route.extend({
  model: function(params) {
    var semiFinalLosers, semiFinalWinners, user;
    user = this.modelFor('application');
    semiFinalWinners = user.get('round3Winners');
    semiFinalLosers = user.get('round3Losers');
    return this.store.find('matchup', {
      round: '4',
      winners: semiFinalWinners.getEach('code').join(','),
      runner_ups: semiFinalLosers.getEach('code').join(',')
    });
  }
});

App.GroupsController = Ember.ArrayController.extend({
  needs: ['application'],
  userBinding: 'controllers.application.model',
  actions: {
    goToPlayoffs: function(group) {
      var roundId, roundLosers, roundWinners, _i;
      if (this.get('readyToMoveOn')) {
        for (roundId = _i = 1; _i <= 3; roundId = ++_i) {
          roundWinners = this.get("user.round" + roundId + "Winners");
          roundLosers = this.get("user.round" + roundId + "Winners");
          if (roundWinners) {
            roundWinners.clear();
          }
          if (roundLosers) {
            roundLosers.clear();
          }
        }
        this.set('user.finalWinner');
        this.set('user.thirdPlaceWinner');
        this.get('user').save();
        return this.transitionToRoute('playoffs', 1);
      }
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
  }).property('user.groupWinners.length', 'user.groupRunnerUps.length')
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

App.GroupsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('group');
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

App.PlayoffsController = Ember.ArrayController.extend({
  needs: ['application'],
  userBinding: 'controllers.application.model',
  playoffsBinding: 'controllers.application.playoffs',
  actions: {
    moveOn: function() {
      var nextPlayoffId, roundLosers, roundWinners, sortedLosers, sortedWinners;
      if (this.get('readyToMoveOn')) {
        roundLosers = this.get('userStageLosers');
        sortedLosers = roundLosers.sortBy('stageOrder');
        roundWinners = this.get('userStageWinners');
        sortedWinners = roundWinners.sortBy('stageOrder');
        roundLosers.clear();
        roundLosers.pushObjects(sortedLosers);
        roundWinners.clear();
        roundWinners.pushObjects(sortedWinners);
        this.get('user').save();
        nextPlayoffId = this.get('nextPlayoff.id');
        if (nextPlayoffId === 4) {
          return this.transitionToRoute('finals');
        } else {
          return this.transitionToRoute('playoffs', nextPlayoffId);
        }
      }
    }
  },
  currentPlayoff: (function() {
    return this.get('playoffs').objectAt((this.get('roundId') || 1) - 1);
  }).property('roundId', 'playoffs.@each'),
  nextPlayoff: (function() {
    var current, nextIndex, playoffs;
    playoffs = this.get('playoffs');
    current = this.get('currentPlayoff');
    nextIndex = playoffs.indexOf(current) + 1;
    return playoffs[nextIndex];
  }).property('playoffs.@each', 'currentPlayoff'),
  roundWinnersId: (function() {
    return "round" + (this.get('currentPlayoff.id')) + "Winners";
  }).property('currentPlayoff.id'),
  matchupParts: (function() {
    var matchups;
    matchups = this.get('model');
    return [matchups.slice(0, matchups.get('length') / 2), matchups.slice(matchups.get('length') / 2)];
  }).property('model.@each'),
  teams: (function() {
    var matchup, teams, _i, _len, _ref;
    teams = Em.A();
    _ref = this.get('model.content');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      matchup = _ref[_i];
      teams.pushObjects(matchup.get('teams'));
    }
    return teams;
  }).property('model.@each.teams.@each'),
  readyToMoveOn: (function() {
    return this.get('userStageWinners.length') === this.get('model.length');
  }).property('userStageWinners.length', 'model.length')
});

App.Matchup = DS.Model.extend({
  homeTeam: DS.belongsTo('team'),
  awayTeam: DS.belongsTo('team'),
  teams: (function() {
    return Em.A([this.get('homeTeam'), this.get('awayTeam')]);
  }).property('homeTeam', 'awayTeam'),
  order: (function() {
    return parseInt(this.get('id').split('|')[0]);
  }).property('id')
});

App.PlayoffsRoute = Ember.Route.extend({
  model: function(params) {
    var controller, losers, prevRoundLosersId, prevRoundWinnersId, runnerUps, user, userLosers, userWinners, winners;
    user = this.modelFor('application');
    losers = user.get("round" + params.round_id + "Losers");
    if (!losers) {
      user.set("round" + params.round_id + "Losers", Em.A());
    } else {
      losers.clear();
    }
    userWinners = user.get("round" + params.round_id + "Winners");
    userLosers = user.get("round" + params.round_id + "Losers");
    this.controllerFor('playoffs').setProperties({
      userStageWinners: userWinners,
      userStageLosers: userLosers
    });
    this.controllerFor('playoffs').set('roundId', params.round_id);
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
