import { useEffect, useState } from "react";

interface Props {
  onChangeFunction: Function;
}

const ListOfDaysAndTimes = ({ onChangeFunction }: Props) => {
  const [state, setState] = useState([
    {
      date: "",
      startTime: "",
      endTime: ""
    }
  ]);

  useEffect(() => {
    onChangeFunction(state);
  }, [state]);

  const addDay = () => {
    setState([
      ...state,
      {
        date: "",
        startTime: "",
        endTime: ""
      }
    ]);
  };

  const removeDay = (index: number) => {
    setState(state.filter((x, i) => i !== index));
  };

  const setValue = (index: number, field: string, value: string) => {
    setState(
      state.map((day, i) =>
        index === i
          ? {
              ...day,
              [field]: value
            }
          : day
      )
    );
  };

  return (
    <>
      <table>
        <tr>
          <th>Day</th>
          <th>Start</th>
          <th>End</th>
          <th></th>
        </tr>

        {state.map(({ date, startTime, endTime }, index) => (
          <tr>
            <td>
              <input
                type="date"
                onChange={(e) => setValue(index, "date", e.target.value)}
              />
            </td>
            <td>
              <input
                type="time"
                onChange={(e) => setValue(index, "startTime", e.target.value)}
              />
            </td>
            <td>
              <input
                type="time"
                onChange={(e) => setValue(index, "endTime", e.target.value)}
              />
            </td>
            <td>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeDay(index);
                }}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </table>
      <button
        onClick={(e) => {
          e.preventDefault();
          addDay();
        }}
      >
        Add day
      </button>
    </>
  );
};

export default ListOfDaysAndTimes;
