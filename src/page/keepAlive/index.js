import React from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { KeepaliveProvider, withKeepalive } from "./KeepAlive-react-component";
import Home from "./component/Home";
import UserAdd from "./component/UserAdd";
import UserList from "./component/UserList";
const KeepaliveHome = withKeepalive(Home, {});
const KeepaliveList = withKeepalive(UserList, {
  cacheId: "userList",
  scroll: true,
});
const KeepaliveAdd = withKeepalive(UserAdd, { cacheId: "add" });
function Keepalive() {
  return (
    <>
      <Router>
        <KeepaliveProvider>
          <Link to="/">Home</Link>
          <Link to="/add">UserAdd</Link>
          <Link to="/list">UserAdd</Link>

          <Switch>
            <Route path="/" component={KeepaliveHome} exact></Route>
            <Route path="/add" component={KeepaliveList}></Route>
            <Route path="/list" component={KeepaliveAdd}></Route>
          </Switch>
        </KeepaliveProvider>
      </Router>
    </>
  );
}

Keepalive.displayName = "Keepalive ";
export default Keepalive;
