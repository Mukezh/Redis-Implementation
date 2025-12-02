import Dashboard from "./pages/Dashboard";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function App() {
  return <Dashboard />;
}
