import React from "react";
import ValueProvider from './ValueStorageContext';
import AsyncDemo from './MissingDogStack';

const App = () => {
  let data = {
    name: "",
    address: "",
    breed: "",
    image: "",
    time: new Date(),
  }
  return (
    <ValueProvider value={data} tag="missingdog">
      <AsyncDemo />
    </ValueProvider>
  )
}
export default App;