App.User = DS.Model.extend
  name: DS.attr('string')
  loggedInAt: DS.attr('string')
  accessToken: DS.attr('string')
  active: DS.attr('boolean')
  email: DS.attr('string')
  family_name: DS.attr('string')
  given_name: DS.attr('string')
  nickname: DS.attr('string')

  groupWinners: DS.hasMany('team')
  groupRunnerUps: DS.hasMany('team')

  # Round of 16
  round1Winners: DS.hasMany('team')

  # Quarter finals
  round2Winners: DS.hasMany('team')

  # Semi finals
  round3Winners: DS.hasMany('team')
  round3Losers: DS.hasMany('team')

  # Final
  finalWinner: DS.belongsTo('team')

  # Third place
  thirdPlaceWinner: DS.belongsTo('team')
