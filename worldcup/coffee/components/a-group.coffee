App.AGroupComponent = Ember.Component.extend
  classNames: ['group', 'a-layout__panel--full', 'a-layout__wrapper', 'br--listed']
  model: null

  actions:
    setPosition: (team_id, position) ->
      teams = @get('model.teams')
      teams.filterBy('position', position).setEach 'position', null
      team = teams.findBy('id', team_id)
      team.set 'position', position

      if position is 1
        @set 'model.winner', team
      else
        @set 'model.runnerUp', team
