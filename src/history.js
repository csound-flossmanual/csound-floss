import { createBrowserHistory } from "history";

export const browserHistory = createBrowserHistory();

export const navigate = path => browserHistory.push(path);
