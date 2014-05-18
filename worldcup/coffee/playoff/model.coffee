App.Round = DS.Model.extend
  name: DS.attr('string')
  matchups: DS.attr('string')

  matchupParts: (->
    matchups = (@get('matchups') or [])
    return [matchups.slice(0, matchups.get('length') / 2),
            matchups.slice(matchups.get('length') / 2)]
  ).property 'matchups.@each'

App.RoundAdapter = DS.RESTAdapter.extend
  namespace: 'api/v1'