// import "sw";
import "../src/assets/css/main.css";
import CanvasSlide from "./components/CanvasSlide";

function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-offwhite relative font-sans">
      <CanvasSlide />
    </div>
  );
}

export default App;
