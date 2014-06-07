App.GroupsController = Ember.ArrayController.extend
  needs: ['application']
  userBinding: 'controllers.application.model'

  actions:
    goToPlayoffs: (group) ->
      if @get('readyToMoveOn')

        # Clear all (round) winners on restart
        for roundId in [1..3]
          roundWinners = @get("user.round#{roundId}Winners")
          if roundWinners
            roundWinners.clear()

        @set('user.finalWinner')
        @set('user.thirdPlaceWinner')

        @get('user').save()
        @transitionToRoute 'playoffs', 1

  groupParts: (->
    # Split the groups into 2 equally big sub-groups
    groups = @get('model')
    return [groups.slice(0, groups.get('length') / 2),
            groups.slice(groups.get('length') / 2)]
  ).property 'model.@each'

  readyToMoveOn: (->
    # Switch on when the user has selected all advancing teams
    winners = @get('user.groupWinners.length')
    runnerUps = @get('user.groupRunnerUps.length')
    if  (winners + runnerUps) is 16
      return yes
  ).property 'user.groupWinners.length', 'user.groupRunnerUps.length'
