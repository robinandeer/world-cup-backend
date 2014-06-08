App.PlayoffsController = Ember.ArrayController.extend
  needs: ['application']

  userBinding: 'controllers.application.model'
  playoffsBinding: 'controllers.application.playoffs'

  actions:
    moveOn: ->

      if @get('readyToMoveOn')
        # Sort winners by matchup order
        roundLosers = @get('userStageLosers')
        sortedLosers = roundLosers.sortBy('stageOrder')
        roundWinners = @get('userStageWinners')
        sortedWinners = roundWinners.sortBy('stageOrder')
        roundLosers.clear()
        roundLosers.pushObjects sortedLosers
        roundWinners.clear()
        roundWinners.pushObjects sortedWinners

        @get('user').save()

        nextPlayoffId = @get('nextPlayoff.id')
        # If the final is upcoming
        if nextPlayoffId is 4
          @transitionToRoute 'finals'
        else
          @transitionToRoute 'playoffs', nextPlayoffId

  # +------------------------------------------------------------------+
  # | Related playoff rounds
  # +------------------------------------------------------------------+
  currentPlayoff: (->
    return @get('playoffs').objectAt((@get('roundId') or 1) - 1)
  ).property 'roundId', 'playoffs.@each'

  nextPlayoff: (->
    playoffs = @get 'playoffs'
    current = @get 'currentPlayoff'

    nextIndex = playoffs.indexOf(current) + 1

    return playoffs[nextIndex]
  ).property 'playoffs.@each', 'currentPlayoff'

  roundWinnersId: (->
    return "round#{@get('currentPlayoff.id')}Winners"
  ).property 'currentPlayoff.id'

  # +------------------------------------------------------------------+
  # | Stuff to do with matchups
  # +------------------------------------------------------------------+
  # Split matchups in two halves
  matchupParts: (->
    matchups = @get('model')
    return [matchups.slice(0, matchups.get('length') / 2),
            matchups.slice(matchups.get('length') / 2)]
  ).property 'model.@each'

  # +------------------------------------------------------------------+
  # | .
  # +------------------------------------------------------------------+
  teams: (->
    teams = Em.A()
    for matchup in @get('model.content')
      teams.pushObjects matchup.get('teams')

    return teams
  ).property 'model.@each.teams.@each'

  readyToMoveOn: (->
    # User has selected one winner from each matchup
    return @get('userStageWinners.length') == @get('model.length')
  ).property 'userStageWinners.length', 'model.length'
