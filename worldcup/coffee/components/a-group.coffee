App.AGroupComponent = Ember.Component.extend
  classNames: ['a-group']

  # Title of group
  title: null

  # All teams in the group
  teams: Em.A()

  init: ->
    @_super()
    teams = @get 'teams'
    winners = @get 'winners'
    runnerUps = @get 'runnerUps'

    for team in teams.get('content')
      winner = winners.findBy 'id', team.get('id')
      runnerUp = runnerUps.findBy 'id', team.get('id')

      if winner
        winner.set 'isWinner', yes

      if runnerUp
        runnerUp.set 'isRunnerUp', yes

  # Team selected as winner
  winner: (->
    teams = @get 'teams'
    winners = @get 'winners'

    for team in teams.get('content')
      winner = winners.findBy 'id', team.get('id')
      if winner
        break

    return winner
  ).property 'winners.@each', 'teams.@each'

  # Team selected as runner up
  runnerUp: (->
    teams = @get 'teams'
    runnerUps = @get 'runnerUps'

    for team in teams.get('content')
      runnerUp = runnerUps.findBy 'id', team.get('id')
      if runnerUp
        break

    return runnerUp
  ).property 'runnerUps.@each', 'teams.@each'

  winnerObserver: (->
    @get('teams').setEach 'isWinner', no
    winner = @get('winner')
    if winner
      winner.set 'isWinner', yes
  ).observes 'winner', 'teams.@each'

  runnerUpObserver: (->
    @get('teams').setEach 'isRunnerUp', no
    runnerUp = @get('runnerUp')
    if runnerUp
      runnerUp.set 'isRunnerUp', yes
  ).observes 'runnerUp', 'teams.@each'

  # Teams advancing from the group as winners
  winners: Em.A()
  # Teams ending up as runner ups
  runnerUps: Em.A()

  actions:
    advanceTeam: (team, position) ->
      userTeams = @get position

      # You can't put the same team as both winner and runner up
      other = if (position is 'winners') then 'runnerUps' else 'winners'
      @get(other).removeObject team

      userTeams.removeObjects @get 'teams'
      userTeams.addObject team
