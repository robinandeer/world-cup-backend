App.ApplicationRoute = Ember.Route.extend
  model: ->
    # Get the logged-in user
    return @store.find 'user', 'current'
