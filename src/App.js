import logo from "./logo.svg";
import "./App.css";
import FriendsList from "./components/FriendsList";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FriendsList />
    </div>
  );
}

export default App;
