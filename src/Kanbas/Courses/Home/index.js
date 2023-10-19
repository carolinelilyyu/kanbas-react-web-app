import ModuleList from "../Modules/ModuleList";
import Status from "../Status";
import TopNav from "./TopNav"
function Home() {
  return (
    <div className="row">
      <TopNav />
      <div className="col-8">
        <ModuleList />
      </div>
      <div className="col-4">
        <Status />
      </div>
    </div>
  );
}
export default Home;

