# motorscrap.github.io

Setting up heroku

Add the following as Buildpacks

    https://github.com/timanovsky/subdir-heroku-buildpack - This allows us to deploy to heroku while having the server and the client folder in the same github repo
    heroku/nodejs

Add the following Config Vars

    PROJECT_PATH server
    ORIGIN_URL https://motorscrap.co.uk
    API_KEY "SEND GRID API KEY"
    TO_EMAIL "EMAIL TO SEND TO"
    FROM_EMAIL Info@motorscrap.co.uk
