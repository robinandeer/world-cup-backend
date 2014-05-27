App.ProfilesRoute = Ember.Route.extend
  model: (params) ->
    return @store.find 'user'
