App.User = DS.Model.extend
  name: DS.attr('string')
  loggedInAt: DS.attr('string')
  accessToken: DS.attr('string')
  active: DS.attr('boolean')
  email: DS.attr('string')

  groupWinners: DS.hasMany('team')
  groupRunnerUps: DS.hasMany('team')
  round1Winners: DS.hasMany('team')
  round2Winners: DS.hasMany('team')
  round3Winners: DS.hasMany('team')
  round4Winners: DS.hasMany('team')
  round4RunnerUps: DS.hasMany('team')
