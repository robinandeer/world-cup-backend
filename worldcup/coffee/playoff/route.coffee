App.PlayoffsRoute = Ember.Route.extend
  model: (params) ->
    return @store.find('round', params.round_id)
