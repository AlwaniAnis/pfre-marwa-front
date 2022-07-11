import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Box, Container, Typography } from "@mui/material";
import { apiStatAll } from "../../contexts/TndevContext";

function Stats() {
  const [stats, setstats] = useState({ data: {}, data2: {}, data3: {} });

  const [data, setDatas] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["incidents ouverts", "incidents cloturés"],
      },
    },
    series: [
      {
        name: "volume incidents",
        data: [30, 40],
      },
    ],
  });
  const [data2, setDatas2] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["interventions ouverts", "interventions cloturés"],
      },
    },
    series: [
      {
        name: "volume interventions",
        data: [58, 20],
      },
    ],
  });
  const [data3, setDatas3] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["Taches ouverts", "Taches cloturés"],
      },
    },
    series: [
      {
        name: "",
        data: [20, 45],
      },
    ],
  });
  React.useEffect(() => {
    apiStatAll().then((res) => {
      let {
        closedTachesCount,
        closedIncidentsCount,
        closedinterventionsCount,
        openedTachesCount,
        openedIncidentsCount,
        openedinterventionsCount,
      } = res;
      setDatas({
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: ["incidents ouverts", "incidents cloturés"],
          },
        },
        series: [
          {
            name: "volume incidents",
            data: [openedIncidentsCount, closedIncidentsCount],
          },
        ],
      });
      setDatas2({
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: ["Interventions ouverts", "Interventions cloturés"],
          },
        },
        series: [
          {
            name: "volume Interventions",
            data: [openedinterventionsCount, closedinterventionsCount],
          },
        ],
      });
      setDatas3({
        options: {
          chart: {
            id: "basic-bar",
          },
          xaxis: {
            categories: ["Taches ouvertes", "Taches cloturées"],
          },
        },
        series: [
          {
            name: "volume Taches",
            data: [openedTachesCount, closedTachesCount],
          },
        ],
      });
    });
  }, []);

  return (
    <Container sx={{ marginTop: 25 }} maxWidth="xs">
      <Box sx={{ display: "flex" }}>
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={data.options}
              series={data.series}
              type="bar"
              width="500"
              backgroundColor="red"
            />
          </div>
          <Typography
            sx={{ backgroundColor: "#ddd" }}
            align="center"
            variant="h6"
          >
            {" "}
            Volumetrie des incidents par ingenieur{" "}
          </Typography>
        </div>
      </Box>
      <Box sx={{ display: "flex" }}>
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={data2.options}
              series={data2.series}
              type="bar"
              width="500"
            />
          </div>
          <Typography
            sx={{ backgroundColor: "#ddd" }}
            align="center"
            variant="h6"
          >
            Volumetrie des interventions par ingenieur{" "}
          </Typography>
        </div>
      </Box>
      <Box sx={{ display: "flex" }}>
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={data3.options}
              series={data3.series}
              type="bar"
              width="500"
            />
          </div>
          <Typography
            sx={{ backgroundColor: "#ddd" }}
            align="center"
            variant="h6"
          >
            Volumetrie des taches par ingenieur{" "}
          </Typography>
        </div>
      </Box>
    </Container>
  );
}

export default Stats;
