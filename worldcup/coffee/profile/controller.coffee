App.ProfileController = Ember.ObjectController.extend
  needs: ['application']

  userBinding: 'controllers.application.model'

  actions:
    setNickname: ->
      if @get('isYourProfile')
        @set 'nickname', @get('nicknameInput')
        @get('model').save()

    unsetNickname: ->
      @set 'nickname', null

  isYourProfile: (->
    return @get('user.email') is @get('email')
  ).property 'user.email', 'email'
