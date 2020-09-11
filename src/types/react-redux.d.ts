import { AppState } from '../main/app-state';

declare module 'react-redux' {

    interface DefaultRootState extends AppState {}

}
