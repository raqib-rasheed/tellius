import { Checkbox } from "antd";
import _ from "lodash";
import React, { useMemo } from "react";
import { AddTodoForm } from "./AddToDoForm";

export default function PlanDetail({ details, setPlans }) {
  const generateDetails = useMemo(() => {
    if (details.todos && Array.isArray(details?.todos)) {
      return details?.todos?.map((todo) => {
        return { label: todo?.label, value: todo?.value?.toUpperCase() };
      });
    }
  }, [details]);

  function handleChange() {}
  function handleAddTodoSubmit({ name }) {
    setPlans((prevPlans) => {
      let modifiedPlans = _.clone(prevPlans);
      const previousPlansForDayIndex = prevPlans?.findIndex(
        (plan) => plan?.day === details?.day
      );
      modifiedPlans[previousPlansForDayIndex]?.todos?.push({
        value: name,
        label: name?.toUpperCase(),
      });
      return modifiedPlans;
    });
  }
  return (
    <>
      <AddTodoForm onFormSubmit={handleAddTodoSubmit} />
      <Checkbox.Group options={generateDetails} onChange={handleChange} />
    </>
  );
}
