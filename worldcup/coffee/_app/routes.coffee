App.Router.map ->
  @resource 'groups'
  @resource 'playoffs', { path: '/playoffs/:round_id'}
