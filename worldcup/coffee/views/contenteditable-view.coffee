Ember.ContenteditableView = Ember.View.extend
  tagName: 'div'
  attributeBindings: ['contenteditable']

  # Variables:
  editable: no
  isUserTyping: no
  plaintext: no

  # Properties:
  contenteditable: (->
    editable = @get('editable')
    return if editable then 'true' else undefined
  ).property 'editable'

  # Observers:
  valueObserver: (->
    if (!@get('isUserTyping') && @get('value'))
      return @setContent()
  ).observes 'value'

  # Events:
  didInsertElement: ->
    return @setContent()

  focusOut: ->
    return @set 'isUserTyping', no

  keyDown: (event) ->
    if !event.metaKey
      return @set 'isUserTyping', yes

  keyUp: (event) ->
    if @get 'plaintext'
      return @set 'value', @$().text()
    else
      return @set 'value', @$().html()

  # Render our own html so there are no metamorphs to get screwed up
  # when the user changes the html
  render: (buffer) ->
    buffer.push @get('value')

  setContent: ->
    return @$().html @get('value')
