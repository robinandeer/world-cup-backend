App.HighscoreRoute = Ember.Route.extend
  model: ->
    return @store.find 'highscore'
