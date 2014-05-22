App.PlayoffsController = Ember.ArrayController.extend
  needs: ['application']

  userBinding: 'controllers.application.model'
  playoffsBinding: 'controllers.application.playoffs'

  init: ->
    @get('teams').setEach 'isWinner', no

  currentPlayoff: (->
    teamCount = @get('model.length') * 2
    return @get('playoffs').filterBy('teamCount', teamCount).get('firstObject')
  ).property 'model.length', 'playoffs'

  roundWinnersId: (->
    return "round#{@get('currentPlayoff.id')}Winners"
  ).property 'currentPlayoff.id'

  roundRunnerUpsId: (->
    return "round#{@get('currentPlayoff.id')}RunnerUps"
  ).property 'currentPlayoff.id'

  nextPlayoff: (->
    playoffs = @get 'playoffs'
    current = @get 'currentPlayoff'

    nextIndex = playoffs.indexOf(current) + 1
    return playoffs[nextIndex]
  ).property 'currentPlayoff'

  matchupParts: (->
    matchups = @get('model')
    return [matchups.slice(0, matchups.get('length') / 2),
            matchups.slice(matchups.get('length') / 2)]
  ).property 'model.@each'

  isReadyToMoveOn: (->
    # User has selected one winner from each match up
    return @get('winners.length') == @get('model.length')
  ).property 'winners.length', 'model.length'

  winners: (->
    return @get('teams').filterBy 'isWinner', yes
  ).property 'teams.@each.isWinner'

  winnersObserver: (->
    user = @get('user')
    roundWinners = user.get(@get('roundWinnersId'))
    roundWinners.clear()
    roundWinners.pushObjects @get('winners')
  ).observes 'winners.@each', 'roundWinnersId'

  runnerUps: (->
    return @get('teams').filterBy 'isWinner', no
  ).property 'teams.@each.isWinner'

  runnerUpsObserver: (->
    user = @get('user')
    roundRunnerUps = user.get(@get('roundRunnerUpsId'))
    roundRunnerUps.clear()
    roundRunnerUps.pushObjects @get('runnerUps')
  ).observes 'runnerUps.@each', 'roundRunnerUpsId'

  teams: (->
    teams = Em.A()
    @get('model').forEach (matchup) ->
      teams.pushObjects matchup.get('teams')

    return teams
  ).property 'model.@each.teams.@each'

  currentPlayoffObserver: (->
    # Reset for next round
    @get('winners').setEach 'isWinner', no
  ).observes 'currentPlayoff'

  actions:
    pickWinner: (match, team) ->
      # Reset and set winner
      match.get('teams').setEach 'isWinner', no
      team.set 'isWinner', yes

    moveOn: ->
      if @get('isReadyToMoveOn')
        @get('user').save()
        @transitionToRoute 'playoffs', @get('nextPlayoff.id')
