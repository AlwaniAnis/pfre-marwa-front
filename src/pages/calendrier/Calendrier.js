import * as React from "react";
import { red, orange, blue, blueGrey, green } from "@mui/material/colors";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { eventsMethods, TndevCtx } from "../../contexts/TndevContext";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Box } from "@mui/system";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Button, Container, TextField, Typography } from "@mui/material";
import { daysToWeeks } from "date-fns/esm";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Visite curative",
    allDay: true,
    start: new Date(2022, 3, 21),
    end: new Date(2022, 3, 21),
  },
  {
    title: "Intervention Technique",
    start: new Date(2022, 3, 21),
    end: new Date(2022, 3, 27),
  },
  {
    title: "Adressage ip",
    start: new Date("2022-04-22T08:45:00"),
    end: new Date("2022-04-22T18:45:00"),
  },
];

export default function Calendrier() {
  const queryClient = useQueryClient();
  const states = TndevCtx();
  const { apiEventsAll, apiEventCreate } = eventsMethods;
  const { events, setevents } = states;

  const { isSuccess, isLoading, refetch, error, data, isFetching } = useQuery(
    ["events-all"],
    () => apiEventsAll(),
    {
      onSuccess: (data) => {
        setevents(
          data.map((d) => ({
            ...d,
            start: new Date(d.start),
            end: new Date(d.end),
          }))
        );
      },
      onError: (error) => console.log(error),
    }
  );

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [openCalendar, setOpenCalendar] = React.useState(false);
  const [recordCalendar, setRecordCalendar] = React.useState({});
  // console.log(" from calendar");
  // console.log(events);

  React.useEffect(() => {}, []);

  const handleAddEvents = () => {
    // setevents([...events, newEvent]);
    createRecord(newEvent);
    setOpenCalendar(false);
  };

  const { mutate: createRecord, data: createMsg } = useMutation(
    (values) => apiEventCreate(values),
    {
      onSuccess: (data) => {
        refetch();
        setNewEvent({ title: "", start: "", end: "" });
      },
      onError: (error) => console.log(error),
    }
  );
  const handleClickCreateCalendar = (id) => {
    // let record = data?.find((i) => i.id === id);
    console.log("handleClickCreationCalendar");
    //console.log(record);
    //setRecorddetails(record);
    setOpenCalendar(true);
  };
  const handleClickOpenCalendar = (event) => {
    event.preventDefault();
    //const data = new FormData(event.currentTarget);

    let dataUpdate = {
      // id: data.get("id"),
      // data: recordUpdate,
    };

    // console.log(recordUpdate);
    //updateRecord(dataUpdate);
    setOpenCalendar(false);
  };

  const handleClose = () => {
    setOpenCalendar(false);
  };
  return (
    <>
      <Container style={{ marginTop: "8rem" }}>
        <Button onClick={handleClickCreateCalendar}> Creer un evenement</Button>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ marginTop: "3rem", height: 500 }}
        />

        <Dialog
          maxWidth="xl"
          open={openCalendar}
          onClose={handleClose}
          sx={{ minHeight: "700px" }}
          component="form"
        >
          <DialogTitle sx={{ color: "white", backgroundColor: blue[500] }}>
            Ajouter une Tache
          </DialogTitle>
          <DialogContent>
            <Box
              noValidate
              sx={{
                // display: "flex",
                // flexDirection: "column",
                m: "auto",
                minWidth: "350px",
                minHeight: "350px",
              }}
            >
              <div style={{ marginTop: "1.3rem" }}>
                <TextField
                  // style={{ width: "185px", marginBottom: "1rem" }}
                  fullWidth
                  type="text"
                  id="standard-basic"
                  label="titre"
                  variant="standard"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
                <div style={{ marginTop: "1.3rem" }}>
                  <DatePicker
                    placeholderText="Date debut"
                    style={{
                      marginBottom: "1rem",
                      paddingTop: "3rem",
                      marginRight: "10px",
                    }}
                    selected={newEvent.start}
                    onChange={(start) => setNewEvent({ ...newEvent, start })}
                  />
                </div>

                <h2></h2>
                <div style={{ marginTop: "1.3rem" }}>
                  <DatePicker
                    placeholderText="Date de fin"
                    selected={newEvent.end}
                    onChange={(end) => setNewEvent({ ...newEvent, end })}
                  />
                </div>
                {/* <Box sx={{ mt: 9 }}>
                  <Typography>Note:</Typography>
                  <Typography>
                    Pour la creation d'un evenement ou tache, veuillez cliquer
                    sur le bouton ajouter
                  </Typography>
                </Box> */}
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: "gray" }}>
              Annuler
            </Button>
            <Button variant="outlined" onClick={handleAddEvents}>
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
