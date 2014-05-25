App.FinalsRoute = Ember.Route.extend
  model: (params) ->
    user = @modelFor 'application'

    semiFinalWinners = user.get('round3Winners')
    semiFinalLosers = user.get('round3Losers')

    return @store.find 'matchup',
      round: '4'
      winners: semiFinalWinners.getEach('code').join(',')
      runner_ups: semiFinalLosers.getEach('code').join(',')
