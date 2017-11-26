import React from 'react'
import { Grid, Jumbotron } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom'
import {Home, Admin, Audience} from './containers'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
<Jumbotron>
    <Grid>
        <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/admin' component={Admin}/>
        <Route exact path='/audience' component={Audience}/>
        </Switch>
    </Grid>
</Jumbotron>
)

export default Main
