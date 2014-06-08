App.AMatchupComponent = Ember.Component.extend
  classNames: ['a-matchup', 'a-layout__wrapper']

  order: null

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
        return winner
  ).property 'winners.@each', 'teams.@each'

  loser: (->
    teams = @get 'teams'
    winnerId = @get 'winner.id'

    for team in teams
      if team.get('id') isnt winnerId
        return team
  ).property 'teams.@each', 'winner.id'

  winnerObserver: (->
    @get('teams').setEach 'isStageWinner', no
    winner = @get('winner')
    if winner
      winner.setProperties
        isStageWinner: yes
        stageOrder: @get('order')
  ).observes 'winner', 'teams.@each', 'order'

  actions:
    advanceTeam: (team) ->
      winners = @get 'winners'
      winners.removeObjects @get 'teams'
      winners.addObject team

      losers = @get 'losers'
      losers.removeObjects @get 'teams'
      losers.addObject @get 'loser'
