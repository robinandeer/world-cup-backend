App.GroupsRoute = Ember.Route.extend
  model: ->
    # Fetch all groups from the database
    return @store.find('group')
