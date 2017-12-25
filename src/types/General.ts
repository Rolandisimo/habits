export interface Navigation {
    navigate: (routeName: string, params?: {[K: string]: any}, action?: {[K: string]: any}) => void; // TODO: Add types to params
    state: {
        key: string;
        routeName: string;
        params: {[K: string]: any};
    };
}
