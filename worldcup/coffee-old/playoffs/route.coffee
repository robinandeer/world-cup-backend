App.PlayoffsRoute = Ember.Route.extend
  model: (params) ->
    user = @modelFor('application')
    @controllerFor('playoffs').set('roundId', params.round_id)
    if params.round_id is '1'
      # Directly after group stage
      winners = user.get('groupWinners').getEach('code').join(',')
      runnerUps = user.get('groupRunnerUps').getEach('code').join(',')

    else
      # Regular rounds
      controller = @controllerFor 'playoffs'
      prevRoundWinnersId = "round#{params.round_id - 1}Winners"
      prevRoundLosersId = "round#{params.round_id - 1}Losers"
      winners = user.get(prevRoundWinnersId).getEach('code').join(',')
      runnerUps = (user.get(prevRoundLosersId) or Em.A()).getEach('code').join(',')

    return @store.find 'matchup',
      round: params.round_id
      winners: winners
      runner_ups: runnerUps
