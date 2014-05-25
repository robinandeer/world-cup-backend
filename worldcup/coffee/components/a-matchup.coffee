App.AMatchupComponent = Ember.Component.extend
  classNames: ['a-matchup', 'a-layout__wrapper']

  # All teams in the matchup
  teams: Em.A()

  # Teams advancing to the next round
  winners: Em.A()
  losers: Em.A()

  # Team selected as winner
  winner: (->
    teams = @get 'teams'
    winners = @get 'winners'

    for team in teams
      winner = winners.findBy 'id', team.get('id')
      if winner
        break

    return winner
  ).property 'winners.@each', 'teams.@each'

  loser: (->
    teams = @get 'teams'
    winner = @get 'winner'

    for team in teams
      if team.get('id') is not winner.get('id')
        break

    return team
  ).property 'teams.@each', 'winner'

  winnerObserver: (->
    @get('teams').setEach 'isStageWinner', no
    winner = @get('winner')
    if winner
      winner.set 'isStageWinner', yes
  ).observes 'winner', 'teams.@each'

  actions:
    advanceTeam: (team) ->
      winners = @get 'winners'
      winners.removeObjects @get 'teams'
      winners.addObject team

      losers = @get 'losers'
      losers.removeObjects @get 'teams'
      losers.addObject @get 'loser'
