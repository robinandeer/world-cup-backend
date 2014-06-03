App.TeamRoute = Ember.Route.extend
  model: (params) ->
    return @store.find 'team', params.team_id
