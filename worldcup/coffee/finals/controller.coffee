App.FinalsController = Ember.ArrayController.extend
  needs: ['application']

  userBinding: 'controllers.application.model'

  actions:
    moveOn: ->
      if @get('readyToMoveOn')
        @get('user').save()
        @transitionToRoute 'profile', @get('user')

    selectWinner: (team) ->
      @set 'user.finalWinner', team

    selectThirdPlaceWinner: (team) ->
      @set 'user.thirdPlaceWinner', team

  # +------------------------------------------------------------------+
  # | .
  # +------------------------------------------------------------------+
  finalTeams: (->
    return Em.A(@get('model.firstObject.teams'))
  ).property 'model.firstObject.teams.@each'

  runnerUp: (->
    for team in @get('finalTeams')
      if team.get('id') isnt @get('user.finalWinner.id')
        return team
  ).property 'finalTeams.@each.id', 'user.finalWinner.id'

  thirdPlaceTeams: (->
    return Em.A(@get('model.lastObject.teams'))
  ).property 'model.lastObject.teams.@each'

  readyToMoveOn: (->
    # User has selected one winner from each matchup
    return (@get('user.finalWinner') and @get('user.thirdPlaceWinner'))
  ).property 'user.finalWinner', 'user.thirdPlaceWinner'
