App.IndexController = Ember.ObjectController.extend
  needs: ['application']
  userBinding: 'controllers.application.model'

  actions:
    peekFriend: ->
      # Use email as unique user id
      @transitionToRoute 'profile', @get('friendEmail')

  stat: (->
    return @store.find 'stat', (@get('user.finalWinner.id') or 'unknown')
  ).property 'user.finalWinner.id'
