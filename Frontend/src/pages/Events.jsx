import React, { useEffect, useState } from "react";
import Card from "../components/general/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvents,
  ongoingFailure,
  ongoingStart,
  ongoingSuccess,
  pastStart,
  pastSuccess,
  pastFailure,
  flagshipStart,
  flagshipSuccess,
  flagshipFailure,
  minipratibimbStart,
  minipratibimbSuccess,
  minipratibimbFailure,
} from "../redux/events/eventsSlice";
import { Skeleton, Stack } from "@mui/material";
import { fetchEventsByStatus } from "../service/api";

const Event = () => {
  const [selectedOption, setSelectedOption] = useState("Ongoing event");

  const dispatch = useDispatch();
  const { ongoing, past, flagship, minipratibimb, loading } = useSelector(
    (state) => state.events
  );

  // Fetch ongoing events on component mount
  useEffect(() => {
    const fetchOngoingEvent = async () => {
      dispatch(ongoingStart());
      dispatch(deleteEvents());
      try {
        const response = await fetchEventsByStatus("ONGOING");
        dispatch(ongoingSuccess(response.response.data)); // Store ongoing events in Redux
      } catch (error) {
        dispatch(ongoingFailure(error));
        console.log("Error fetching ongoing events:", error);
      }
    };

    fetchOngoingEvent();
  }, [dispatch]);

  // Function to fetch event data based on the selected option
  const fetchEventData = async (eventType) => {
    let startAction, successAction, failureAction, status;

    switch (eventType) {
      case "Past event":
        startAction = pastStart;
        successAction = pastSuccess;
        failureAction = pastFailure;
        status = "PAST";
        break;
      case "Flagship Event":
        startAction = flagshipStart;
        successAction = flagshipSuccess;
        failureAction = flagshipFailure;
        status = "FLAGSHIP";
        break;
      case "Mini Pratibimb":
        startAction = minipratibimbStart;
        successAction = minipratibimbSuccess;
        failureAction = minipratibimbFailure;
        status = "MINI_PRATIBIMB";
        break;
      default:
        return;
    }

    dispatch(startAction());

    try {
      const response = await fetchEventsByStatus(status);
      dispatch(successAction(response.response.data)); // Store data in Redux
    } catch (error) {
      dispatch(failureAction(error));
      console.log(`Error fetching ${eventType.toLowerCase()}:`, error);
    }
  };

  const handleOptionChange = (event) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);

    // Check if the data for the selected option is already in Redux
    if (
      (newOption === "Past event" && !past) ||
      (newOption === "Flagship Event" && !flagship) ||
      (newOption === "Mini Pratibimb" && !minipratibimb)
    ) {
      fetchEventData(newOption);
    }
  };

  return (
    <div className="p-6 mt-10">
      <h2 className="text-7xl font-bold mb-4 text-center">Events</h2>

      {/* Radio Button Group */}
      <div className="flex w-full justify-center space-x-2 md:space-x-8 mb-4">
        {["Ongoing event", "Past event", "Flagship Event", "Mini Pratibimb"].map(
          (option) => (
            <div key={option}>
              <input
                type="radio"
                className="btn-check hidden"
                name="eventOptions"
                id={option}
                value={option}
                autoComplete="off"
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              <label
                className={`btn font-medium text-sm cursor-pointer px-4 py-2 rounded-lg flex items-center transition duration-200 ${
                  selectedOption === option
                    ? "bg-blue-500 text-white border border-blue-500" // Solid bg for selected
                    : "btn-outline-success text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500"
                }`}
                htmlFor={option}
              >
                <i className="fa-solid fa-circle-plus mr-1"></i>
                {option}
              </label>
            </div>
          )
        )}
      </div>

      <hr />

      {loading ? (
        <div className="flex gap-10 justify-center mt-5 flex-wrap">
          {[...Array(3)].map((_, index) => (
            <Stack key={index}>
              <Skeleton variant="circular" width={50} height={50} />
              <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "80%" }} />
              <Skeleton variant="rounded" width={384} height={200} />
            </Stack>
          ))}
        </div>
      ) : (
        <div className="flex gap-10 mt-5 justify-start flex-wrap">
          {selectedOption === "Ongoing event" &&
            ongoing &&
            ongoing.map((event) => <Card key={event.event_id} event={event} />)}
          {selectedOption === "Past event" &&
            past &&
            past.map((event) => <Card key={event.event_id} event={event} />)}
          {selectedOption === "Flagship Event" &&
            flagship &&
            flagship.map((event) => <Card key={event.event_id} event={event} />)}
          {selectedOption === "Mini Pratibimb" &&
            minipratibimb &&
            minipratibimb.map((event) => <Card key={event.event_id} event={event} />)}
        </div>
      )}
    </div>
  );
};

export default Event;
