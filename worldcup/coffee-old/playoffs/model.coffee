App.Matchup = DS.Model.extend
  homeTeam: DS.belongsTo('team')
  awayTeam: DS.belongsTo('team')

  teams: (->
    return Em.A([@get('homeTeam'), @get('awayTeam')])
  ).property 'homeTeam', 'awayTeam'
