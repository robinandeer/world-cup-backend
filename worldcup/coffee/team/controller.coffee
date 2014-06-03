App.TeamController = Ember.ObjectController.extend
  needs: ['application']

  userBinding: 'controllers.application.model'

  usersByWinner: (->
    return @store.find 'user',
      finalWinner: @get('id')
  ).property 'id'
