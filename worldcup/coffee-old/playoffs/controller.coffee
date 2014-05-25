App.PlayoffsController = Ember.ArrayController.extend
  roundRunnerUpsId: (->
    return "round#{@get('currentPlayoff.id')}RunnerUps"
  ).property 'currentPlayoff.id'

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

  currentPlayoffObserver: (->
    # Reset for next round
    @get('winners').setEach 'isWinner', no
  ).observes 'currentPlayoff'
