import * as React from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { incidentsMethods } from "../../contexts/TndevContext";
import {
  Button,
  Collapse,
  Container,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TndevCtx } from "../../contexts/TndevContext";
import { Box } from "@mui/system";
import { format, differenceInHours } from "date-fns";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { red, orange, blue, blueGrey, green } from "@mui/material/colors";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: blue[900],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function Incidents() {
  const queryClient = useQueryClient();
  const states = TndevCtx();
  const [showDetails, setshowDetails] = useState(false);
  const { incidents, setincidents, total, settotal } = states;
  const [page, setPage] = React.useState(1);
  const [filter, setfilter] = React.useState({
    statut: "",
    priority: "",
  });
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // tree
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  // tree

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const {
    apiIncidentsAll,
    apiIncidentDelete,
    apiIncidentUpdate,
    apiIncidentCreate,
  } = incidentsMethods;

  const { setLoguedIn, user, setUser, role } = states;
  // console.log(user);
  const { isSuccess, isLoading, refetch, error, data, isFetching } = useQuery(
    ["incidents-all"],
    () => apiIncidentsAll(filter.statut, filter.priority, page, rowsPerPage),
    {
      onSuccess: (data) => {
        setincidents(data.data);
        settotal(data.total);
        //console.log(incidents[0].user.role);
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate: deleteRecord, data: deleteMsg } = useMutation(
    (values) => apiIncidentDelete(values),
    {
      onSuccess: (data) => {
        // console.log(data);
        queryClient.invalidateQueries("incidents-all");
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate: createRecord, data: createMsg } = useMutation(
    (values) => apiIncidentCreate(values),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("incidents-all");
        setmodel({
          titre: "",
          sujet: "",
          description: "",
          numContratMaintenance: "",
          numSerie: "",
          typePrestation: "",
          type: "",
          askToClose: "",
          note: "",
          statut: "",
          priorite: "",
          owner: "",
          file: "",
          dateIncident: Date(),
          duration: 0,
          id: 0,
        });
        setnewFile(null);
        setOpenCreate(false);
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate: updateRecord, data: updateMsg } = useMutation(
    (values) => apiIncidentUpdate(values),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("incidents-all");
        setmodel({
          titre: "",
          sujet: "",
          description: "",
          numContratMaintenance: "",
          numSerie: "",
          typePrestation: "",
          type: "",
          askToClose: "",
          note: "",
          statut: "",
          priorite: "",
          owner: "",
          file: "",
          dateIncident: Date(),
          duration: 0,
          id: 0,
        });
        setnewFile(null);
      },
      onError: (error) => console.log(error),
    }
  );

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openValidation, setOpenValidation] = React.useState(false);
  const [recordDelete, setRecordDelete] = React.useState({});
  const [recordValidation, setRecordValidation] = React.useState({});
  const [model, setmodel] = React.useState({
    titre: "",
    sujet: "",
    description: "",
    numContratMaintenance: "",
    numSerie: "",
    typePrestation: "",
    type: "",
    askToClose: "",
    note: "",
    statut: "",
    priorite: "",
    owner: "",
    file: "",
    dateIncident: Date(),
    id: null,
    duration: 0,
    userEmail: "",
  });
  const [newFile, setnewFile] = useState(null);
  const handleOnChange = (e) => {
    setmodel((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickOpenCreateDialog = () => {
    setOpenCreate(true);
  };
  const handleCreate = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (newFile) data.append("newFile", newFile);
    Object.entries(model).map((el) => {
      data.append(el[0], el[1]);
    });
    // // data.append("user_id", user.id);

    createRecord(data);
  };

  const handleClickOpenDeleteDialog = (id) => {
    let record = incidents?.find((i) => i.id === id);
    //console.log(record);
    setRecordDelete(record);

    setOpenDelete(true);
  };

  const handleDelete = (id) => {
    //console.log(id);
    deleteRecord(id);
    setOpenDelete(false);
  };

  const handleClickOpenValidationDialog = (id) => {
    let record = incidents?.find((i) => i.id === id);
    console.log(record);
    setRecordValidation(record);

    setOpenValidation(true);
  };

  const handleValidation = (id) => {
    console.log(id);
    deleteRecord(id);
    setOpenValidation(false);
  };

  const handleClickOpenUpdateDialog = (id) => {
    let record = incidents?.find((i) => i.id === id);
    setmodel(record);
    //console.log(record);
    setOpenCreate(true);
  };
  const handleUpdate = (event, id) => {
    event.preventDefault();
    const data = new FormData();
    if (newFile) data.append("newFile", newFile);
    Object.entries(model).map((el) => {
      data.append(el[0], el[1]);
    });
    // // data.append("user_id", user.id);

    // console.log(model);
    updateRecord(data);
    // setOpenUpdate(false);
  };
  const closeRequest = (event) => {
    event.preventDefault();
    const data = new FormData();

    let m = { ...recordValidation };
    m.askToClose = 1; // askedTobeClosed
    Object.entries(m).map((el) => {
      data.append(el[0], el[1]);
    });
    // // data.append("user_id", user.id);

    // console.log(model);
    updateRecord(data);
    // setOpenUpdate(false);
  };
  const handleClose = () => {
    setOpenCreate(false);
    setOpenDelete(false);

    setOpenValidation(false);

    setAnchorEl(null);
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleTree = (sujet) => {
    //console.log(dt);
    // setSubject(dt);
    setmodel((prev) => ({ ...prev, sujet }));
    setAnchorEl(null);
    setOpen(false);
  };

  const [openSecondLevel, setOpenSecondLevel] = React.useState(false);
  const [openThirdLevel, setOpenThirdLevel] = React.useState(false);

  const handleClickCollapseSecond = () => {
    setOpenSecondLevel(!openSecondLevel);
  };
  const handleClickCollapseThird = () => {
    setOpenThirdLevel(!openThirdLevel);
  };
  // download file link
  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  React.useEffect(() => {
    refetch();
  }, [filter]);
  return (
    <>
      <Container sx={{ marginTop: 15 }} maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Typography variant="h4"> Gestion des incidents</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              onMouseEnter={handleClick}
            >
              Filtrer par
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClickCollapseSecond}>
                Statut {openSecondLevel ? <ExpandLess /> : <ExpandMore />}
              </MenuItem>
              <Collapse
                in={openSecondLevel}
                timeout="auto"
                unmountOnExit
                sx={{ paddingLeft: 3 }}
              >
                <MenuItem
                  onClick={() => setfilter((f) => ({ ...f, statut: "" }))}
                >
                  Tous
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    setfilter((f) => ({ ...f, statut: "en-attente" }))
                  }
                >
                  En cours
                </MenuItem>
                <MenuItem
                  onClick={() => setfilter((f) => ({ ...f, statut: "resolu" }))}
                >
                  {" "}
                  Résolu
                </MenuItem>
              </Collapse>
              <MenuItem onClick={handleClickCollapseThird}>
                Priorite {openThirdLevel ? <ExpandLess /> : <ExpandMore />}
              </MenuItem>
              <Collapse
                in={openThirdLevel}
                timeout="auto"
                unmountOnExit
                sx={{ paddingLeft: 3 }}
              >
                <MenuItem
                  onClick={() => setfilter((f) => ({ ...f, statut: "" }))}
                >
                  Tous
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    setfilter((f) => ({ ...f, priority: "haute" }))
                  }
                >
                  {" "}
                  Haute
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    setfilter((f) => ({ ...f, priority: "basse" }))
                  }
                >
                  Basse
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    setfilter((f) => ({ ...f, priority: "moyenne" }))
                  }
                >
                  {" "}
                  Moyenne
                </MenuItem>
              </Collapse>
            </Menu>
          </div>

          <Button onClick={handleClickOpenCreateDialog}>
            {" "}
            Creer un incident
          </Button>
        </Box>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 700 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell> Incident</StyledTableCell>
                  <StyledTableCell align="right">Description</StyledTableCell>
                  <StyledTableCell align="right">Serie Machine</StyledTableCell>
                  <StyledTableCell align="right">Type</StyledTableCell>
                  <StyledTableCell align="right">Statut</StyledTableCell>
                  <StyledTableCell align="right">priorite</StyledTableCell>
                  <StyledTableCell align="right">Duree(h)</StyledTableCell>
                  <StyledTableCell align="right">Proprietaire</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>

                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incidents
                  ?.filter(
                    (i) =>
                      // user.role === "admin" ? true : i.user.email === user.email
                      true
                  )
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow
                        key={i.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          bgcolor: i.type === "ouvert" ? "transparent" : "#ddd",
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {i.titre}
                        </TableCell>
                        <TableCell align="right">{i.note}</TableCell>
                        <TableCell align="right">{i.numSerie}</TableCell>
                        <TableCell align="right">{i.typePrestation}</TableCell>
                        <TableCell align="right">{i.statut}</TableCell>
                        <TableCell align="right">
                          <Chip
                            label={i.priorite}
                            sx={{
                              background:
                                i.priorite === "haute"
                                  ? "red"
                                  : i.priorite === "basse"
                                  ? "green"
                                  : "orange",
                              color: "white",
                            }}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>

                        <TableCell align="right">{i.duration}</TableCell>
                        <TableCell align="right">{i.userEmail}</TableCell>
                        <TableCell align="right">
                          {format(new Date(i.dateIncident), "dd-MM-yyyy")}
                        </TableCell>
                        <TableCell align="right">
                          {role !== "admin" && i.askToClose == 0 ? (
                            <Button
                              onClick={(e) =>
                                handleClickOpenValidationDialog(i.id)
                              }
                              aria-label="validationcloture"
                              title="demande de validation de cloture"
                            >
                              Cloturer
                            </Button>
                          ) : (
                            <span
                              style={{
                                color: i.askToClose == 2 ? "red" : "green",
                              }}
                            >
                              {i.askToClose == 2 ? "cloturé" :role !== "admin"? "en attente":""}
                            </span>
                          )}
                          <IconButton
                            onClick={() => {
                              handleClickOpenUpdateDialog(i.id);
                              setshowDetails(true);
                            }}
                            aria-label="details"
                            title="details"
                          >
                            <VisibilityIcon sx={{ color: "#09f" }} />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              handleClickOpenDeleteDialog(i.id);
                              setshowDetails(false);
                            }}
                            aria-label="delete"
                            title="suppression"
                          >
                            <DeleteIcon sx={{ color: "red" }} />
                          </IconButton>

                          <IconButton
                            onClick={() => {
                              handleClickOpenUpdateDialog(i.id);
                              setshowDetails(false);
                            }}
                            aria-label="update"
                            title="mise a jour"
                          >
                            <BorderColorIcon sx={{ color: "orange" }} />
                          </IconButton>

                          {role !== "admin" ? (
                            <IconButton
                              onClick={() =>
                                handleClickOpenValidationDialog(i.id)
                              }
                              aria-label="validationcloture"
                              title="demande de validation de cloture"
                            >
                              <EventAvailableIcon sx={{ color: "green" }} />
                            </IconButton>
                          ) : (
                            ""
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            c
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>

      <Dialog
        component="form"
        onSubmit={!model.id ? handleCreate : handleUpdate}
        maxWidth="xl"
        open={openCreate}
        onClose={handleClose}
      >
        <DialogTitle
          sx={{
            color: "white",
            backgroundColor: model.id
              ? showDetails
                ? "rgb(0,121,173)"
                : "rgb(230,128,25)"
              : blue[500],
          }}
        >
          {model.id
            ? showDetails
              ? "Informations de l'incident"
              : "Modifier l'incident"
            : " Création nouvel incident"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ marginTop: "1rem" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="titre"
                name="titre"
                autoComplete="titre"
                autoFocus
                label="Intitule"
                helperText=""
                variant="standard"
                value={model.titre}
                onChange={handleOnChange}
              />
              <TextField
                type="datetime-local"
                margin="normal"
                required
                fullWidth
                id="dateIncident"
                name="dateIncident"
                autoComplete="dateIncident"
                label=""
                helperText=""
                variant="standard"
                sx={{ pt: 2.1 }}
                value={model.dateIncident}
                onChange={handleOnChange}
              />

              <Menu
                sx={{ width: "40rem" }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>Typologies Incidents:</MenuItem>
                <MenuItem sx={{ minWidth: "14rem" }}>
                  <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{
                      // height: 240,
                      flexGrow: 1,
                      maxWidth: 800,
                      overflowY: "auto",
                      padding: "0px",
                    }}
                  >
                    <TreeItem nodeId="1" label="Serveur">
                      <TreeItem
                        nodeId="11"
                        label="Adressage-ip"
                        onClick={() => handleTree("Serveur/Adressage-ip")}
                      />
                    </TreeItem>
                    <TreeItem nodeId="2" label="Stockage">
                      <TreeItem
                        nodeId="21"
                        label="Natif"
                        onClick={() => handleTree("Stockage/Natif")}
                      />
                      <TreeItem nodeId="22" label="V8">
                        <TreeItem
                          nodeId="221"
                          label="V8"
                          onClick={() => handleTree("Stockage/Natif/V8")}
                        />
                      </TreeItem>
                    </TreeItem>
                    <TreeItem nodeId="3" label="Application">
                      <TreeItem
                        nodeId="31"
                        label="Software"
                        onClick={() => handleTree("Application/Software")}
                      />
                      <TreeItem nodeId="32" label="Configuration">
                        <TreeItem
                          nodeId="321"
                          label="Bios"
                          onClick={() =>
                            handleTree("Application/Software/Bios")
                          }
                        />
                      </TreeItem>
                    </TreeItem>
                  </TreeView>
                </MenuItem>
              </Menu>

              <TextField
                onClick={handleClick}
                value={model.sujet}
                margin="normal"
                required
                fullWidth
                id="sujet"
                name="sujet"
                autoComplete="sujet"
                label="Sujet"
                helperText=""
                variant="standard"
              />

              <TextField
                value={model.description}
                onChange={handleOnChange}
                margin="normal"
                required
                fullWidth
                id="description"
                name="description"
                autoComplete="description"
                label="Details"
                helperText=""
                variant="standard"
              />
            </div>

            <div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="numContratMaintenance"
                name="numContratMaintenance"
                autoComplete="numContratMaintenance"
                label="N contrat"
                helperText=""
                variant="standard"
                value={model.numContratMaintenance}
                onChange={handleOnChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="numSerie"
                name="numSerie"
                autoComplete="numSerie"
                label="N serie"
                helperText=""
                variant="standard"
                value={model.numSerie}
                onChange={handleOnChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="typePrestation"
                name="typePrestation"
                autoComplete="typePrestation"
                label="Type prestation"
                helperText=""
                variant="standard"
                value={model.typePrestation}
                onChange={handleOnChange}
              />
              {/* <TextField
                margin="normal"
                fullWidth
                id="assignation"
                name="assignation"
                autoComplete="assignation"
                label="Assignation"
                helperText=""
                variant="standard"
              /> */}
            </div>
            <div>
              {/* <TextField
                margin="normal"
                fullWidth
                id="raison_assignation"
                name="raison_assignation"
                autoComplete="raison_assignation"
                label="Raison assignation"
                helperText=""
                variant="standard"
              /> */}
              {/*  */}
              <FormControl variant="standard" sx={{ m: 1, width: 220 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Statut
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={model.statut}
                  name="statut"
                  onChange={handleOnChange}
                  label="Statut"
                >
                  <MenuItem value="">
                    <em>Aucun</em>
                  </MenuItem>
                  <MenuItem value={`initial`}>Initial</MenuItem>
                  <MenuItem value={`resolu`}>Resolu</MenuItem>
                  <MenuItem value={"en-attente"}>En attente</MenuItem>
                </Select>
              </FormControl>
              {/*  */}
              <FormControl variant="standard" sx={{ m: 1, width: 220 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Priorite
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={model.priorite}
                  name="priorite"
                  onChange={handleOnChange}
                  label="Priorite"
                >
                  <MenuItem value="">
                    <em>Aucun</em>
                  </MenuItem>
                  <MenuItem value={`haute`}>haute</MenuItem>
                  <MenuItem value={`basse`}>basse</MenuItem>
                  <MenuItem value={"moyenne"}>moyenne</MenuItem>
                </Select>
              </FormControl>

              <TextField
                value={model.duration}
                onChange={handleOnChange}
                margin="normal"
                fullWidth
                id="duration"
                name="duration"
                autoComplete="duration"
                label="Durée"
                helperText=""
                variant="standard"
                type={"number"}
              />
            </div>

            <div style={{ paddingTop: "2rem" }}>
              <TextareaAutosize
                sx={{ pt: 6, BorderColor: "red", outline: "none" }}
                id="note"
                name="note"
                aria-label="minimum height"
                minRows={3}
                placeholder="Note"
                style={{ width: "100%" }}
                onChange={handleOnChange}
                value={model.note}
              />

              <TextField
                type="file"
                margin="normal"
                fullWidth
                id="filel"
                name="newFile"
                label="piece jointe"
                onChange={(e) => {
                  let newFile = e.target.files[0];
                  setnewFile(newFile);
                }}
                helperText=""
                variant="standard"
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "gray" }}>
            Annuler
          </Button>
          <Button
            type="submit"
            // onClick={() => handleCreate()}
            sx={{ color: blue[500] }}
          >
            {model.id ? (showDetails ? "" : "modifier") : "  Creer"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth="xl" open={openDelete} onClose={handleClose}>
        <DialogTitle sx={{ color: "white", backgroundColor: red[500] }}>
          Suppression Incident
        </DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <Typography sx={{ mt: 4 }} variant="h6">
              {" "}
              <PriorityHighIcon sx={{ verticalAlign: "middle" }} />{" "}
              Confirmez-vous la suppression de cet incident ?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "gray" }}>
            Annuler
          </Button>
          <Button
            onClick={() => handleDelete(recordDelete.id)}
            sx={{ color: red[500] }}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        className="validation"
        maxWidth="xl"
        open={openValidation}
        onClose={handleClose}
      >
        <DialogTitle sx={{ color: "white", backgroundColor: green[500] }}>
          Demande de cloture incident
        </DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <Typography sx={{ mt: 4 }} variant="h6">
              {" "}
              Merci de cloturer cet incident .
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "gray" }}>
            Annuler
          </Button>
          <Button onClick={closeRequest} sx={{ color: red[500] }}>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
