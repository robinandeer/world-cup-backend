App.IndexController = Ember.Controller.extend
  actions:
    peekFriend: ->
      # Use email as unique user id
      @transitionToRoute 'profile', @get('friendEmail')
