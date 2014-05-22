App.GroupsController = Ember.ArrayController.extend
  needs: ['application']
  userBinding: 'controllers.application.model'

  actions:
    goToPlayoffs: (group) ->
      if @get('readyToMoveOn')
        @get('user').save()
        @transitionToRoute 'playoffs', 1

    setProperty: (model, key, value) ->
      model.set key, value

  groupParts: (->
    groups = @get('model')
    return [groups.slice(0, groups.get('length') / 2),
            groups.slice(groups.get('length') / 2)]
  ).property 'model.@each'

  readyToMoveOn: (->
    winners = @get('user.groupWinners.length')
    runnerUps = @get('user.groupRunnerUps.length')
    if  (winners + runnerUps) is 16
      return yes
  ).property 'user.groupWinners.length', 'user.groupRunnerUps.length'

  winnersObserver: (->
    teams = @get('model').getEach('winner')
    teams.clean()
    @get('user.groupWinners').then (userTeams) ->
      userTeams.clear()
      userTeams.pushObjects teams
  ).observes 'model.@each.winner'

  runnerUpsObserver: (->
    teams = @get('model').getEach('runnerUp')
    teams.clean()
    @get('user.groupRunnerUps').then (userTeams) ->
      userTeams.clear()
      userTeams.pushObjects teams
  ).observes 'model.@each.runnerUp'
