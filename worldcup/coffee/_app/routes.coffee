App.Router.map ->
  @resource 'groups'
  @resource 'playoffs', { path: '/playoffs/:round_id' }
  @resource 'finals'
  @resource 'consensus'
  @resource 'profile', { path: '/profile/:user_id' }
