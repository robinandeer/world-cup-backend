App.ATeamComponent = Ember.Component.extend
  classNames: ['a-team']
  classNameBindings: ['isShowingDetails:expanded:normal', 'isSelected']
  model: null

  stageWinners: Em.A()
  stageRunnerUps: Em.A()

  isStageWinner: (->
    return @get('stageWinners').indexOf(@get('model')) > 0
  ).property 'stageWinners.@each', 'model'

  isStageRunnerUp: (->
    return @get('stageRunnerUps').indexOf(@get('model')) > 0
  ).property 'stageRunnerUps.@each', 'model'

  mouseEnter: ->
    @set 'isHovering', yes

  mouseLeave: ->
    @set 'isHovering', no
    @set 'isShowingDetails', no

  actions:
    toggleProperty: (property) ->
      @toggleProperty property

    wasClicked: (position) ->
      @set 'isSelected', yes
      @sendAction 'clicked', @get('model'), position

  properties: (->
    return [
      value: @get 'model.confederation'
      title: 'Confederation'
    ,
      value: @get 'model.fifaRank'
      title: 'Fifa rank'
    ,
      value: @get 'model.eloRank'
      title: 'ELO rank'
    ,
      value: "#{@get('model.betfair')}%"
      title: 'Betfair'
    ,
      value: "#{@get('model.likelihoodToAdvance')}%"
      title: 'Advance'
    ,
      value: "#{@get('model.likelihoodToWin')}%"
      title: 'Win'
    ]
  ).property 'model.confederation', 'model.fifaRank', 'model.eloRank',
             'model.betfair', 'model.likelihoodToWin',
             'model.likelihoodToAdvance'
