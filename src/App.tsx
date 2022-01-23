import "./styles.css";

import Form from "./Form";

export default function App() {
  return (
    <div className="App">
      <h1>Dynamic Formik</h1>
      <h3>Show revlevant fields based on answers.</h3>
      <Form />
    </div>
  );
}
