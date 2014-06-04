App.ConsensusRoute = Ember.Route.extend
  model: ->
    return @store.find('tree', 'whatever')
