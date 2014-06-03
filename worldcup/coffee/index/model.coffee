App.Stat = DS.Model.extend
  userCount: DS.attr('number')
  completeCount: DS.attr('number')
  winnerCount: DS.attr('number')

  completeRatio: (->
    return @get('completeCount') / 100
  ).property 'completeCount'

  completeRatioCSS: (->
    return "width: #{@get('completeRatio') * 100}%"
  ).property 'completeRatio'

  isComplete: (->
    return @get('completeCount') >= 100
  ).property 'completeCount'
