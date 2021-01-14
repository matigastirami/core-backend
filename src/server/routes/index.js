import RoleRoutes from './Role.routes';
import UserRoutes from './User.routes';
import AppRoutes from './App.routes'

export default function(app){
    app.use('/api', RoleRoutes);
    app.use('/api', UserRoutes);
    app.use('/api', AppRoutes);
}