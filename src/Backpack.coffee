root = exports ? this

Backpack = 
    VERSION: '0.0.1'

    Helpers: 
      slug: (string) ->
              string?.toLowerCase()
                .replace(/\ +/g, "-")
                .replace(/[^a-z0-9-]/g, "")

root.Backpack = Backpack
