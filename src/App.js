import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../src/assets/css/main.css";
import CanvasSlide from "./components/CanvasSlide";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-offwhite relative font-serif">
      <CanvasSlide />
      <p className="font-bold text-sm flex justify-start items-baseline text-blue-400 gap-x-2 my-4">
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>
          Please save your changes before moving forward to next slide.
        </span>
      </p>
    </div>
  );
}

export default App;
