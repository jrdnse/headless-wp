# Headless WordPress with Gatsby

A simple Gatsby blog front-end using the gatsby-source-wordpress plugin. The plugin uses the Wordpress REST API to source all the data. The result is a blazing fast front-end, while still keeping WordPress as the back-end. 

## Pros
* Really snappy and fast website because of Gatsby
* The code can be easily changed so it can generate more pages/taxonomies

## Cons
* The gatsby-source-wordpress plugin does not yet support inline images that are a part of the post content.

## Deploy
**Make sure to either create the environmental variables in Netlify prior deploying or change mine in the .env file**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jrdnse/headless-wp)
