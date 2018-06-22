import express from "express"
import cors from "cors"
import React from "react"
import { renderToString } from "react-dom/server"
import App from '../shared/App'
import serialize from 'serialize-javascript'

import { fetchPopularRepos } from '../shared/api'

const app = express()

app.use(cors())
app.use(express.static("public"))

app.get("*", (req, res, next) => {

    fetchPopularRepos()
        .then(data => {
            const markup = renderToString(
                <App data={data} />
            )
            res.send(`
                <!DOCTYPE html>
                <html>
                    <head>
                    <title>SSR with RR</title>
                    <script src="/bundle.js" defer ></script>
                    <script>window.__INITIAL_STATE__=${serialize(data)}</script>
                    </head>
                    <body>
                    <div id="app">${markup}</div>
                    </body>
                </html>
            `)
        })

})


app.listen(3000, () => {
    console.log(`Server is listening on port: 3000`)
})

/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/