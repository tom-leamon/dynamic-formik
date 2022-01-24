import { useFormik } from "formik";
import * as Yup from "yup";

import ListOfDaysAndTimes from "./ListOfDaysAndTimes";

function Form() {
  enum InputType {
    "radio" = "radio",
    "date" = "date",
    "time" = "time",
    "ListOfDaysAndTimes" = "ListOfDaysAndTimes"
  }

  type Question = {
    name: string;
    question: string;
    type: InputType;
    questionOptions: string[];
    initialValue: string | {};
    validationSchema: any;
    enabledConditions: {
      name: string;
      value: string;
    }[];
  };

  const data: Question[] = [
    {
      name: "IsSeries",
      question: "Is this event part of a series of events?",
      type: InputType.radio,
      questionOptions: ["Yes", "No"],
      initialValue: "",
      validationSchema: Yup.string().required("Required"),
      enabledConditions: []
    },
    {
      name: "IsSeriesFirst",
      question: "Is this the first event in this series?",
      type: InputType.radio,
      questionOptions: ["Yes", "No"],
      initialValue: "",
      validationSchema: Yup.string().required("Required"),
      enabledConditions: [
        {
          name: "IsSeries",
          value: "Yes"
        }
      ]
    },
    {
      name: "SeriesType",
      question: "What kind of Series is this Event?",
      type: InputType.radio,
      questionOptions: [
        "A weekly event",
        "Touring performance",
        "Run of shows",
        "Other"
      ],
      initialValue: "",
      validationSchema: Yup.string().required("Required"),
      enabledConditions: [
        {
          name: "IsSeries",
          value: "Yes"
        },
        {
          name: "IsSeriesFirst",
          value: "Yes"
        }
      ]
    },
    {
      name: "IsMultiday",
      question: "Is this a multi-day event?",
      type: InputType.radio,
      questionOptions: ["Yes", "No"],
      initialValue: "",
      validationSchema: Yup.string().required("Required"),
      enabledConditions: []
    },
    {
      name: "EventDate",
      question: "When is the event?",
      type: InputType.date,
      questionOptions: ["Next week", "Next month"],
      initialValue: "",
      validationSchema: Yup.string().required("Required"),
      enabledConditions: [
        {
          name: "IsMultiday",
          value: "No"
        }
      ]
    },
    {
      name: "EventStartTime",
      question: "When does the event start?",
      type: InputType.time,
      questionOptions: ["Next week", "Next month"],
      initialValue: "",
      validationSchema: Yup.string().required("Required"),
      enabledConditions: [
        {
          name: "IsMultiday",
          value: "No"
        }
      ]
    },
    {
      name: "EventStartEnd",
      question: "When does the event end?",
      type: InputType.time,
      questionOptions: ["Next week", "Next month"],
      initialValue: "",
      validationSchema: Yup.string().required("Required"),
      enabledConditions: [
        {
          name: "IsMultiday",
          value: "No"
        }
      ]
    },
    {
      name: "ListOfDaysAndTimes",
      question: "What days will the event take place on?",
      type: InputType.ListOfDaysAndTimes,
      questionOptions: ["Next week", "Next month"],
      initialValue: {},
      validationSchema: Yup.string().required("Required"),
      enabledConditions: [
        {
          name: "IsMultiday",
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

  const renderInternal = (question: Question) => {
    switch (question.type) {
      case "radio":
        return (
          <>
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
          </>
        );

      case "date":
        return (
          <>
            <input
              type="date"
              onChange={formik.handleChange}
              name={question.name}
            />
          </>
        );

      case "time":
        return (
          <>
            <input
              type="time"
              onChange={formik.handleChange}
              name={question.name}
            />
          </>
        );
      case "ListOfDaysAndTimes":
        return (
          <ListOfDaysAndTimes
            onChangeFunction={(value) => {
              formik.setFieldValue(question.name, value);
            }}
          />
        );
    }
  };

  const renderInput = (question: Question) => (
    <div
      className="input"
      style={{ display: calculateIsEnabled(question) ? "block" : "none" }}
    >
      <label>{question.question}</label>
      <br />
      {renderInternal(question)}
    </div>
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      {data.map((question) => renderInput(question))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
