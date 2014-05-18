App.GroupsRoute = Ember.Route.extend
  model: ->
    return @store.find('group')
