App.Router.map ->
  @resource 'consensus'
  @resource 'profiles', ->
    @resource 'profile', { path: '/:user_id' }
  @resource 'teams', ->
    @resource 'team', { path: '/:team_id' }
  @resource 'rules'
  @resource 'highscore'
