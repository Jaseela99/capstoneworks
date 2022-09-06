import "./App.css";
import Products from "./components/Products";


function App() {
  return (
    <div className="w-full max-w-full flex flex-col items-center justify-center pt-6 pb-10 pl-10 pr-10">
      <h2 className="text-2xl font-semibold">React Tables</h2>
      
      <Products />
    </div>
  );
}

export default App;
