App.ApplicationRoute = Ember.Route.extend
  model: ->
    return @store.find('user', 'current')
