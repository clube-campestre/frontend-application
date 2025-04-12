import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

const CustomCalendar = () => {
	const [value, setValue] = useState(new Date());

	return (
		<div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
			<h2 className="text-xl font-semibold mb-4 text-[#022C81]">
				Calendário
			</h2>
			<Calendar onChange={setValue} value={value} />
		</div>
	);
};

export default CustomCalendar;
