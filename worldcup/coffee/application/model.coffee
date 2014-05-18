App.User = DS.Model.extend
  name: DS.attr('string')
  loggedInAt: DS.attr('string')
  accessToken: DS.attr('string')
  active: DS.attr('boolean')
  email: DS.attr('string')

  groupWinners: DS.hasMany('team')
  groupRunnerUps: DS.hasMany('team')

App.UserAdapter = DS.RESTAdapter.extend
  namespace: 'api/v1'
