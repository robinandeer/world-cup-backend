App.TeamsRoute = Ember.Route.extend
  model: (params) ->
    return @store.find 'team'
