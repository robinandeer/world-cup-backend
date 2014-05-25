App.Team = DS.Model.extend
  code: DS.attr('string')
  name: DS.attr('string')
  rank: DS.attr('number')
  points: DS.attr('number')
  fifaRank: DS.attr('number')
  eloRank: DS.attr('number')
  eloScore: DS.attr('number')
  confederation: DS.attr('string')
  betfair: DS.attr('number')
  likelihoodToWin: DS.attr('number')
  likelihoodToAdvance: DS.attr('number')

  flagImage: (->
    return "/static/img/flags/#{@get('name')}.png"
  ).property 'name'

  group: DS.belongsTo('group')

App.Group = DS.Model.extend
  group_id: DS.attr('string')
  teams: DS.hasMany('team')
