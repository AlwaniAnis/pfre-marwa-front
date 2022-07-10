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
import { tachesMethods } from "../../contexts/TndevContext";
import {
  Button,
  Collapse,
  Container,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Switch,
  TextField,
  Tooltip,
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

export default function Taches() {
  const queryClient = useQueryClient();
  const states = TndevCtx();
  const [showDetails, setshowDetails] = useState(false);
  const { taches, setTaches, total, settotal } = states;
  const [page, setPage] = React.useState(1);

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

  const { apiTachesAll, apiTacheDelete, apiTacheUpdate, apiTacheCreate } =
    tachesMethods;

  const { setLoguedIn, user, setUser, role } = states;
  const [order, setorder] = useState("asc");
  // console.log(user);
  const { isSuccess, isLoading, refetch, error, data, isFetching } = useQuery(
    ["taches-all"],
    () => apiTachesAll(order, page, rowsPerPage),
    {
      onSuccess: (data) => {
        setTaches(data.data);
        settotal(data.total);
        //console.log(Taches[0].user.role);
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate: deleteRecord, data: deleteMsg } = useMutation(
    (values) => apiTacheDelete(values),
    {
      onSuccess: (data) => {
        // console.log(data);
        queryClient.invalidateQueries("taches-all");
        refetch();
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate: createRecord, data: createMsg } = useMutation(
    (values) => apiTacheCreate(values),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("taches-all");
        refetch();

        setmodel({
          titre: "",
          sujet: "",
          contratMaintenance: "",
          codeContrat: "",

          type: "ouverte",
          note: "",

          owner: "",
          file: "",
          dateEcheance: Date(),
          dateProchaineEcheance: Date(),
          dateContrat: Date(),
          dateAppel: Date(),
          DateTache: Date(),
          userEmail: "",
          id: 0,
        });
        setnewFile(null);
        setOpenCreate(false);
      },
      onError: (error) => console.log(error),
    }
  );

  const { mutate: updateRecord, data: updateMsg } = useMutation(
    (values) => apiTacheUpdate(values),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("taches-all");
        setmodel({
          titre: "",
          sujet: "",
          description: "",
          ContratMaintenance: "",
          numSerie: "",
          typePrestation: "",
          type: "ouverte",
          askToClose: "",
          note: "",
          statut: "",
          priorite: "",
          owner: "",
          file: "",
          dateTache: Date(),
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
    sujet: "",
    titre: "",
    contratMaintenance: "",
    codeContrat: "",

    type: "ouverte",
    note: "",

    owner: "",
    file: "",
    dateEcheance: Date(),
    dateProchaineEcheance: Date(),
    dateContrat: Date(),
    dateAppel: Date(),
    DateTache: Date(),
    userEmail: "",
    id: 0,
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
    console.log(model);
    Object.entries(model).map((el) => {
      data.append(el[0], el[1]);
    });
    // // data.append("user_id", user.id);

    createRecord(data);
  };

  const handleClickOpenDeleteDialog = (id) => {
    let record = taches?.find((i) => i.id === id);
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
    console.log(id);
    let record = taches?.find((i) => i.id === id);
    console.log(record);
    setRecordValidation((v) => record);
    setOpenValidation(true);
  };

  const handleClickOpenUpdateDialog = (id) => {
    let record = taches?.find((i) => i.id === id);
    console.log(record);
    setmodel((m) => record);
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
  const closeRequest = (event, id) => {
    event.preventDefault();
    const data = new FormData();

    let m = { ...recordValidation };
    console.log("testttttt");
    console.log(m);
    m.type = m.type == "ouverte" ? "cloturé" : "ouverte"; // askedTobeClosed
    Object.entries(m).map((el) => {
      data.append(el[0], el[1]);
    });
    // // data.append("user_id", user.id);

    console.log(m);
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

  const [openSecondLevel, setOpenSecondLevel] = React.useState(false);
  const [openThirdLevel, setOpenThirdLevel] = React.useState(false);

  const handleClickCollapseSecond = () => {
    setOpenSecondLevel(!openSecondLevel);
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
  }, [order]);
  return (
    <>
      <Container sx={{ marginTop: 15 }} maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Typography variant="h4"> Gestion des Taches</Typography>
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
                Date {openSecondLevel ? <ExpandLess /> : <ExpandMore />}
              </MenuItem>
              <Collapse
                in={openSecondLevel}
                timeout="auto"
                unmountOnExit
                sx={{ paddingLeft: 3 }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setorder("asc");
                  }}
                >
                  {" "}
                  Ascendante
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    setorder("desc");
                  }}
                >
                  {" "}
                  Descendante
                </MenuItem>
              </Collapse>
            </Menu>
          </div>

          <Button onClick={handleClickOpenCreateDialog}> Creer un Tache</Button>
        </Box>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 700 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell> Taches </StyledTableCell>
                  <StyledTableCell align="right">
                    Contrat maintenance
                  </StyledTableCell>
                  <StyledTableCell align="right">Date appel</StyledTableCell>
                  <StyledTableCell align="right">Type</StyledTableCell>
                  <StyledTableCell align="right">Compte</StyledTableCell>
                  <StyledTableCell align="right">Date écheance</StyledTableCell>
                  <StyledTableCell align="right">Date Tache</StyledTableCell>
                  <StyledTableCell align="right">Propriétaire</StyledTableCell>

                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {taches
                  // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow
                        key={i.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          bgcolor: !i.closed ? "transparent" : "#ddd",
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {i.titre}
                        </TableCell>
                        <TableCell align="right">
                          {i.contratMaintenance}
                        </TableCell>
                        <TableCell align="right">
                          {" "}
                          {format(new Date(i.dateAppel), "dd-MM-yyyy")}
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={i.type}
                            sx={{
                              background:
                                i.type === "ouverte" ? "green" : "red",
                              color: "white",
                            }}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">{i.compte}</TableCell>
                        <TableCell align="right">
                          {" "}
                          {format(new Date(i.dateEcheance), "dd-MM-yyyy")}
                        </TableCell>
                        <TableCell align="right">
                          {format(new Date(i.dateTache), "dd-MM-yyyy")}
                        </TableCell>

                        <TableCell align="right">{i.owner}</TableCell>

                        <TableCell align="right">
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
                          <IconButton
                            // onClick={() =>
                            //   handleClickOpenValidationDialog(i.id)
                            // }
                            aria-label="validationcloture"
                            title="demande de validation de cloture"
                          >
                            <Tooltip title="Fermer Tache">
                              <Switch
                                //defaultChecked
                                checked={i.type === "ouverte" ? false : true}
                                onChange={(e) =>
                                  handleClickOpenValidationDialog(i.id)
                                }
                                size="small"
                                color="secondary"
                              />
                            </Tooltip>
                          </IconButton>
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
        onClose={() => {
          handleClose();
          setmodel({
            sujet: "",
            titre: "",
            contratMaintenance: "",
            codeContrat: "",

            type: "ouverte",
            note: "",

            owner: "",
            file: "",
            dateEcheance: Date(),
            dateProchaineEcheance: Date(),
            dateContrat: Date(),
            dateAppel: Date(),
            DateTache: Date(),
            userEmail: "",
            id: 0,
          });
        }}
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
              ? "Informations de l'Tache"
              : "Modifier l'Tache"
            : " Création nouvel Tache"}
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
                id="dateTache"
                name="dateTache"
                autoComplete="dateTache"
                label="date Tache"
                helperText=""
                variant="standard"
                sx={{ pt: 2.1 }}
                value={model.dateTache}
                onChange={handleOnChange}
              />

              <TextField
                type="datetime-local"
                margin="normal"
                required
                fullWidth
                id="dateEcheance"
                name="dateEcheance"
                autoComplete="dateEcheance"
                label="date Echeance"
                helperText=""
                variant="standard"
                sx={{ pt: 2.1 }}
                value={model.dateEcheance}
                onChange={handleOnChange}
              />
              <TextField
                type="datetime-local"
                margin="normal"
                required
                fullWidth
                id="dateAppel"
                name="dateAppel"
                autoComplete="dateAppel"
                label="Date Appel"
                helperText=""
                variant="standard"
                sx={{ pt: 2.1 }}
                value={model.dateAppel}
                onChange={handleOnChange}
              />
              <TextField
                type="datetime-local"
                margin="normal"
                required
                fullWidth
                id="dateProchaineEcheance"
                name="dateProchaineEcheance"
                autoComplete="dateProchaineEcheance"
                label="date prochaine echeance"
                helperText=""
                variant="standard"
                sx={{ pt: 2.1 }}
                value={model.dateProchaineEcheance}
                onChange={handleOnChange}
              />
              <TextField
                value={model.sujet}
                margin="normal"
                required
                fullWidth
                id="sujet"
                name="sujet"
                onChange={handleOnChange}
                label="Sujet"
                helperText=""
                variant="standard"
              />
            </div>

            <div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="contratMaintenance"
                name="contratMaintenance"
                autoComplete="contratMaintenance"
                label="N contrat"
                helperText=""
                variant="standard"
                value={model.contratMaintenance}
                onChange={handleOnChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="codeContrat"
                name="codeContrat"
                autoComplete="codeContrat"
                label="code contrat"
                helperText=""
                variant="standard"
                value={model.codeContrat}
                onChange={handleOnChange}
              />
              <TextField
                type="datetime-local"
                required
                fullWidth
                id="dateContrat"
                name="dateContrat"
                autoComplete="dateContrat"
                label="date contrat"
                helperText=""
                variant="standard"
                value={model.dateContrat}
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
          Suppression Tache
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
              Confirmez-vous la suppression de cet Tache ?
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
          Demande de cloture Tache
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
              Merci de cloturer cet Tache .
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
