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
    enabledConditions: {
      name: string;
      value: string;
    }[];
  };

  const data: Question[] = [
    {
      uuid: "f86d42bd-56ac-4f29-8b69-457e840bbe47",
      name: "isSeries",
      question: "Is this event part of a series of events?",
      type: InputType.radio,
      questionOptions: ["Yes", "No"],
      initialValue: "",
      validationSchema: Yup.string().required("Required"),
      enabledConditions: []
    },
    {
      uuid: "ba279a7b-2c1a-4aed-9dd4-bcbc4dffb4c8",
      name: "isSeriesFirst",
      question: "Is this the first event in this series?",
      type: InputType.radio,
      questionOptions: ["Yes", "No"],
      initialValue: "",
      validationSchema: Yup.string().required("Required"),
      enabledConditions: [
        {
          name: "isSeries",
          value: "Yes"
        }
      ]
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

  const calculateIsEnabled = (question: Question): boolean => {
    let isEnabled = true;
    question.enabledConditions.forEach((question) => {
      if (formik.values[question.name] !== question.value) {
        isEnabled = false;
      }
    });

    return isEnabled;
  };

  const renderInput = (question: Question) => {
    switch (question.type) {
      case "radio":
        return (
          <div
            style={{
              marginBottom: "1rem",
              display: calculateIsEnabled(question) ? "block" : "none"
            }}
          >
            <label>{question.question}</label>
            {question.questionOptions.map((questionOption) => (
              <div className="radio-item">
                <input
                  id={questionOption}
                  value={questionOption}
                  onChange={formik.handleChange}
                  name={question.name}
                  type="radio"
                />
                <label htmlFor={questionOption}>{questionOption}</label>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {data.map((question) => renderInput(question))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
