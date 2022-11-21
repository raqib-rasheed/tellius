import React, { useEffect, useState } from "react";
import initialWeekPlans from "../constants/initialWeekPlans";
import PlanDetail from "./plan/PlanDetail";
import PlanNote from "./plan/PlanNote";
import { v4 as uuidv4 } from "uuid";
import { Tabs } from "antd";

export default function PlansContainer() {
  const [plans, setPlans] = useState([]);

  function checkForPlansInLS() {
    const preservedPlans = localStorage?.getItem("week-plans");
    if (Array.isArray(plans) && plans?.length > 0) {
      setPlans(preservedPlans);
    } else {
      setPlans(initialWeekPlans);
    }
  }

  useEffect(() => {
    checkForPlansInLS();
    if (Array.isArray(plans) && plans?.length < 1) {
      localStorage.setItem("week-plans", JSON.stringify(initialWeekPlans));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tabs defaultActiveKey="1">
      {Array.isArray(plans) &&
        plans?.map((dayPlan, index) => {
          return (
            dayPlan && (
              <Tabs.TabPane tab={dayPlan?.day} key={index}>
                <div key={uuidv4()} className="planDetailsContainer">
                  <>
                    {dayPlan?.note && <PlanNote />}
                    <PlanDetail setPlans={setPlans} details={dayPlan} />
                  </>
                </div>
              </Tabs.TabPane>
            )
          );
        })}
    </Tabs>
  );
}
