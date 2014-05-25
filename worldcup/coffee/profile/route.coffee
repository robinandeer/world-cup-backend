App.ProfileRoute = Ember.Route.extend
  model: (params) ->
    return @store.find 'user', params.user_id
