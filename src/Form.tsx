import { useFormik } from "formik";
import * as Yup from "yup";

const Form = () => {
  enum InputType {
    "radio" = "radio"
  }

  type Question = {
    uuid: string;
    name: string;
    question: string;
    type: InputType;
    questionOptions: string[];
    initialValue: string;
    validationSchema: any;
  };

  const data: Question[] = [
    {
      uuid: "f86d42bd-56ac-4f29-8b69-457e840bbe47",
      name: "isSeries",
      question: "Is this event part of a series of events?",
      type: InputType.radio,
      questionOptions: ["Yes", "No"],
      initialValue: "",
      validationSchema: Yup.string().required("Required")
    }
  ];

  const formik = useFormik({
    initialValues: data.reduce((acc, elem) => {
      acc[elem.name] = elem.initialValue; // or what ever object you want inside
      return acc;
    }, {}),
    // validationSchema: data.reduce((acc, elem) => {
    //   acc[elem.name] = elem.validationSchema; // or what ever object you want inside
    //   return acc;
    // }, {}),
    onSubmit: (values) => {
      // if (formik.errors) {
      //   alert(JSON.stringify(formik.errors));
      //   return;
      // }
      alert(JSON.stringify(values, null, 2));
    }
  });

  const renderInput = (name: string, question: Question) => {
    switch (question.type) {
      case "radio":
        return (
          <>
            <label>{name}</label>
            {question.questionOptions.map((questionOption) => (
              <div className="radio-item">
                <input
                  id={questionOption}
                  value={questionOption}
                  onChange={formik.handleChange}
                  name={name}
                  type="radio"
                />
                <label htmlFor={questionOption}>{questionOption}</label>
              </div>
            ))}
          </>
        );
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {data.map((question) => renderInput(question.name, question))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
