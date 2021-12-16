import "./App.css";

import ChatBody from "./components/chat-body/chat-body.component";

import { Route,Routes} from "react-router";

import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="__main">
      <Routes>
        <Route exact path="/" element={<ChatBody/>} />
      </Routes>
    </div>
  );
}

export default App;
