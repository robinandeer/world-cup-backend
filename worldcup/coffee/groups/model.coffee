App.Team = DS.Model.extend
  code: DS.attr('string')
  name: DS.attr('string')
  rank: DS.attr('number')
  points: DS.attr('number')
  position: DS.attr('number')

  group: DS.belongsTo('group')

  isWinner: (->
    return @get('position') is 1
  ).property 'position'

  isRunnerUp: (->
    return @get('position') is 2
  ).property 'position'

App.Group = DS.Model.extend
  group_id: DS.attr('string')
  teams: DS.hasMany('team')
