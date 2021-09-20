import { Header } from "./src/components/Header/Header";
import { Dashboard } from "./src/components/Dashboard";
import { GlobalStyle } from "./src/styles/global";

export function App() {
  return (
    <>
      <Header />
      <Dashboard />
      <GlobalStyle />
    </>
  );
}

export default App;
