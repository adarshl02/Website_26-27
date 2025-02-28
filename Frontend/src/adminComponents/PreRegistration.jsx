import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CircularProgress, MenuItem, Select, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { fetchAttendees, updateStatus } from "@/service/api2";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function PreRegistration() {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, email: "", status: "", initialStatus: "" });
  const [filterApproved, setFilterApproved] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { token } = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const loadAttendees = async () => {
      setLoading(true);
      try {
        const attendeeData = await fetchAttendees(token);
        if (attendeeData.success) {
          setAttendees(attendeeData.data);
        }
      } catch (error) {
        console.error("Error loading attendees:", error);
        toast.error("Error fetching attendees");
      } finally {
        setLoading(false);
      }
    };
    loadAttendees();
  }, [token]);

  const handleStatusUpdate = async (email, status) => {
    setUpdating(true);
    try {
      const response = await updateStatus(email, status, token);
      toast[response.success ? "success" : "error"](response.message);
      if (response.success) {
        const attendeeData = await fetchAttendees(token);
        if (attendeeData.success) {
          setAttendees(attendeeData.data);
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    } finally {
      setUpdating(false);
    }
  };

  const openConfirmDialog = (email, newStatus, initialStatus) => {
    setConfirmDialog({ open: true, email, status: newStatus, initialStatus });
  };

  const handleConfirmStatusUpdate = async () => {
    setConfirmDialog({ ...confirmDialog, open: false });
    await handleStatusUpdate(confirmDialog.email, confirmDialog.status);
  };

  const filteredAttendees = attendees.filter((a) =>
    filterApproved ? a.payment_status === "APPROVED" : true
  ).filter((a) =>
    Object.values(a).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="pt-2 max-w-md mx-auto">
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-2"
      />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-700 text-white p-1 rounded-lg shadow-md text-center mb-2 my-4"
      >
        <h2 className="text-base font-semibold">Total Pre-Registrations</h2>
        <p className="text-2xl font-bold">{attendees.filter(a => a.payment_status === "APPROVED").length}</p>
      </motion.div>

      <div className="flex justify-end mb-2">
        <button className="px-2 py-1 bg-gray-300 rounded-lg" onClick={() => setFilterApproved(!filterApproved)}>
          {filterApproved ? "Show All" : "Show Approved"}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-4">
          <CircularProgress />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 mb-16">
          {filteredAttendees.map((attendee) => (
            <div key={attendee.attendee_id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{attendee.team_name}</h3>
              <p className="text-gray-600 text-sm">Leader: {attendee.team_leader_name} ({attendee.team_leader_phone})</p>
              <p className="text-gray-600 text-sm">Email: {attendee.team_leader_email}</p>
              <p className="text-gray-600 text-sm">Batch: {attendee.team_leader_batch}</p>
              <p className="text-gray-600 text-sm">Branch: {attendee.team_leader_branch}</p>
              <p className="text-gray-600 text-sm">Participants: {[
                attendee.sec_participant,
                attendee.third_participant,
                attendee.fourth_participant,
                attendee.fifth_participant,
                attendee.sixth_participant,
                attendee.seventh_participant,
                attendee.eight_participant
              ].filter(name => name).join(", ")}</p>
              <p className="text-gray-600 text-sm">
                Status: <span className={`font-medium ${attendee.team_status === "APPROVED" ? "text-green-600" : attendee.team_status === "REJECTED" ? "text-red-600" : "text-yellow-600"}`}>{attendee.team_status}</span>
              </p>
              <p className="text-gray-600 text-sm">
                Payment: <span className={`font-medium ${attendee.payment_status === "APPROVED" ? "text-green-600" : "text-red-600"}`}>{attendee.payment_status}</span>
              </p>
              <Select
                value={attendee.team_status}
                onChange={(e) => openConfirmDialog(attendee.team_leader_email, e.target.value, attendee.team_status)}
                fullWidth
                className="mt-2 text-sm h-8"
                disabled={updating}
                size="small"
              >
                <MenuItem value="PENDING" className="text-xs">PENDING</MenuItem>
                <MenuItem value="APPROVED" className="text-xs">APPROVED</MenuItem>
                <MenuItem value="REJECTED" className="text-xs">REJECTED</MenuItem>
              </Select>
            </div>
          ))}
        </motion.div>
      )}

      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          Are you sure you want to change the status from <b>{confirmDialog.initialStatus}</b> to <b>{confirmDialog.status}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>Cancel</Button>
          <Button onClick={handleConfirmStatusUpdate} color="primary">Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
