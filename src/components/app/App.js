import {lazy, Suspense} from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";

// import {MainPage, ComicsPage, SingleComicPage} from "../pages"

const Page404 = lazy(() => import('../pages/Page404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage/SingleComicPage'));


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<div>Завантаження...</div>}>
                        <Switch>
                            <Route exact path="/">
                                <MainPage />
                            </Route>
                            <Route exact path="/comics">
                                <ComicsPage />
                            </Route>
                            <Route exact path="/comics/:comicId">
                                <SingleComicPage />
                            </Route>
                            <Route path="*">
                                <Page404 />
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}
export default App;