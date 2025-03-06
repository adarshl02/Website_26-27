import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const TeamDetails = ({ data }) => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center mb-4">All About Team</h1>
      <div className="space-y-4">
        <AttendeeCard
          name={data.team_leader_name}
          phone={data.team_leader_phone}
          driveLink={data.team_leader_drive_link}
          attended1={data.team_leader_attended_1}
          attended2={data.team_leader_attended_2}
          role="Team Leader"
        />
        {[...Array(8)].map((_, index) => {
          const keyPrefix = [
            "sec", "third", "fourth", "fifth", "sixth", "seventh", "eighth"
          ][index - 1];
          if (!keyPrefix) return null;

          return (
            <AttendeeCard
              key={index}
              name={data[`${keyPrefix}_participant_name`]}
              phone={data[`${keyPrefix}_participant_phone`]}
              driveLink={data[`${keyPrefix}_participant_drive_link`]}
              attended1={data[`${keyPrefix}_participant_attended_1`]}
              attended2={data[`${keyPrefix}_participant_attended_2`]}
              role={`Participant ${index}`}
            />
          );
        })}
      </div>
    </div>
  );
};

const AttendeeCard = ({ name, phone, driveLink, attended1, attended2, role }) => {
  const [attendedAM, setAttendedAM] = useState(attended1);
  const [attendedPM, setAttendedPM] = useState(attended2);

  return (
    <Card className="p-4 rounded-lg shadow-md border border-gray-300">
      <CardContent>
        <h2 className="text-lg font-semibold">{role}</h2>
        <p className="text-sm text-gray-600">{name}</p>
        <p className="text-sm text-gray-600">{phone}</p>
        <a
          href={driveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-500 underline mt-2"
        >
          View Drive Photo
        </a>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={attendedAM}
              onCheckedChange={() => setAttendedAM(!attendedAM)}
            />
            <Label>10:00 AM</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={attendedPM}
              onCheckedChange={() => setAttendedPM(!attendedPM)}
            />
            <Label>10:00 PM</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamDetails;
