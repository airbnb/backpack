# **Backpack.Observer** 

class Backpack.Observer

  constructor: ->
    @callbacks = {}
  
  publish: (event, args...) =>
    console.log "published #{event}"

    callbacks = @callbacks[event]
    unless callbacks then return

    # Call all functions subscribed to the event
    for callback in callbacks
      callback.apply @, args
    @

  on: (event, fn) =>
    # Subscribe function to event
    (@callbacks[event] = @callbacks[event] or []).push fn
    @
  
  off: (event) =>

