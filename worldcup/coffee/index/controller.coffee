App.IndexController = Ember.ObjectController.extend
  needs: ['application']
  userBinding: 'controllers.application.model'

  actions:
    peekFriend: ->
      # Use email as unique user id
      @transitionToRoute 'profile', @get('friendEmail')

  stat: (->
    return @store.find 'stat', @get 'user.finalWinner.id'
  ).property 'user.finalWinner.id'
