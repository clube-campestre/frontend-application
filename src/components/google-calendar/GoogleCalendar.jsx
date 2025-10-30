import React from "react";

const GoogleCalendar = () => {
  const calendarId =
    "834494d2284f166422d9aeb3ce2e91306304536b6a1c9e8043ef5e98610ee32a@group.calendar.google.com";

  const calendarSrcUrl = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
    calendarId
  )}&ctz=America%2FSao_Paulo&showTitle=0&showPrint=0&showCalendars=0&showTz=0`;

  return (
    <div>
      <div className="">
        <iframe
          src={calendarSrcUrl}
          style={{ border: 0, borderRadius: 10 }}
          width="100%"
          height="560"
          title="Calendário Google"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleCalendar;
