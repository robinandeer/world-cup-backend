App.Router.map ->
  @resource 'groups'
  @resource 'playoffs', { path: '/playoffs/:round_id' }
  @resource 'finals'
  @resource 'consensus'
  @resource 'profiles', ->
    @resource 'profile', { path: '/:user_id' }
  @resource 'rules'
