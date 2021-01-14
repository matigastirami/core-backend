import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Notfound from '../components/NotFound/NotFound'
import LoginComponent from '../components/Login/Login.component'
import DashboardComponent from '../components/Dashboard/Dashboard.component'
import UsersComponent from '../components/Users/Users.component'
import UserCreateComponent from '../components/Users/UserCreate.component'
import RoleComponent from '../components/Roles/Roles.component';
import RoleCreateComponent from '../components/Roles/RoleCreate.component'
import AppComponent from '../components/Apps/AppComponent'
import AppCreateComponent from '../components/Apps/AppCreateComponent'
import MyProfile from '../components/MyProfile/MyProfile';
//import MyProfileComponent from '../components/MyProfile/MyProfileView'

const AppRouter = () => {
    return(
        <Switch>
            <Route exact path="/"  component={ LoginComponent } />
            <Route exact path="/signin" component={ LoginComponent } />
            <Route exact path="/dashboard" component={ DashboardComponent }  />
            <Route exact path="/users" component={ UsersComponent } />
            <Route exact path="/user/:id" component={ UserCreateComponent } />
            <Route exact path="/roles" component={ RoleComponent } />
            <Route path="/role/:id" component={ RoleCreateComponent } />
            <Route path="/apps" component={ AppComponent } />
            <Route path="/app/:id" component={ AppCreateComponent } />
            <Route path="/myprofile" component={ MyProfile } />
            <Route component={ Notfound } />
        </Switch>
    )
}

export default AppRouter;