// import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
// import { useEffect, useState } from "react";

// const GoalChart = () => {
// 	// const [data, setData] = useState([]);

// 	// useEffect(() => {
// 	// 	fetch("/api/meta-barracas")
// 	// 		.then((res) => res.json())
// 	// 		.then((data) => setData(data));
// 	// }, []);

// 	const data = [
// 		{ name: "Arrecadado", value: 400 },
// 		{ name: "Restante", value: 300 }
// 	];

// 	return (
// 		<div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-[600px] h-[300px]">
// 			<h2 className="text-xl font-semibold mb-4 text-[#022C81]">
// 				Meta das Barracas
// 			</h2>
// 			<ResponsiveContainer width="100%" height="80%">
// 				<PieChart>
// 					<Tooltip />
// 					<Pie data={data} dataKey="value" fill="#FCAE2D" />
// 				</PieChart>
// 			</ResponsiveContainer>
// 		</div>
// 	);
// };

// export default GoalChart;

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Calendar from "../calendars/Calendar"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

// Team logos
// import team1Logo from "../../assets/images/teams/team1.png";
// import team2Logo from "../../assets/images/teams/team2.png";
// import team3Logo from "../../assets/images/teams/team3.png";
// import team4Logo from "../../assets/images/teams/team4.png";
// import team5Logo from "../../assets/images/teams/team5.png";
// import team6Logo from "../../assets/images/teams/team6.png";
// import team7Logo from "../../assets/images/teams/team7.png";
// import team8Logo from "../../assets/images/teams/team8.png";

const Dashboard = () => {
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [selectedDay, setSelectedDay] = useState(new Date().getDate());

	const goalAmount = 10000;
	const collectedAmount = 8325.6;
	const remainingAmount = goalAmount - collectedAmount;

	const chartData = {
		datasets: [
			{
				data: [collectedAmount, remainingAmount],
				backgroundColor: ["#FCAE2D", "#808080"],
				borderWidth: 0,
				cutout: "75%",
			},
		],
	};

	// Ranking data
	const rankingData = [
		{ id: 1, logo: null, points: 120 },
		{ id: 2, logo: null, points: 115 },
		{ id: 3, logo: null, points: 98 },
		{ id: 4, logo: null, points: 87 },
		{ id: 5, logo: null, points: 76 },
		{ id: 6, logo: null, points: 65 },
		{ id: 7, logo: null, points: 54 },
		{ id: 8, logo: null, points: 42 },
	];

	// Calendar functions
	const getDaysInMonth = (year, month) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (year, month) => {
		return new Date(year, month, 1).getDay();
	};

	const generateCalendarDays = () => {
		const daysInMonth = getDaysInMonth(currentYear, currentMonth);
		const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

		// Adjust for Sunday as first day (0)
		const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

		const days = [];

		// Previous month days
		const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1);
		for (let i = adjustedFirstDay - 1; i >= 0; i--) {
			days.push({
				day: prevMonthDays - i,
				currentMonth: false,
				nextMonth: false,
			});
		}

		// Current month days
		for (let i = 1; i <= daysInMonth; i++) {
			days.push({
				day: i,
				currentMonth: true,
				nextMonth: false,
			});
		}

		// Next month days
		const remainingDays = 42 - days.length; // 6 rows of 7 days
		for (let i = 1; i <= remainingDays; i++) {
			days.push({
				day: i,
				currentMonth: false,
				nextMonth: true,
			});
		}

		return days;
	};

	const handlePrevMonth = () => {
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear(currentYear - 1);
		} else {
			setCurrentMonth(currentMonth - 1);
		}
		setSelectedDay(null);
	};

	const handleNextMonth = () => {
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear(currentYear + 1);
		} else {
			setCurrentMonth(currentMonth + 1);
		}
		setSelectedDay(null);
	};

	const monthNames = [
		"JANEIRO",
		"FEVEREIRO",
		"MARÇO",
		"ABRIL",
		"MAIO",
		"JUNHO",
		"JULHO",
		"AGOSTO",
		"SETEMBRO",
		"OUTUBRO",
		"NOVEMBRO",
		"DEZEMBRO",
	];

	const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			{/* Meta da Barraca Section */}
			<div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
				<h2 className="text-xl font-semibold text-gray-800 mb-6">
					Meta da Barraca
				</h2>

				<div className="relative w-48 h-48">
					<Doughnut
						data={chartData}
						options={{
							responsive: true,
							maintainAspectRatio: false,
						}}
					/>
					<div className="absolute inset-0 flex flex-col items-center justify-center">
						<span className="text-xs text-gray-500">R$</span>
						<span className="text-2xl font-bold">
							{collectedAmount.toFixed(2)}
						</span>
						<span className="text-xs text-gray-500">
							valor total
						</span>
					</div>
				</div>

				<div className="flex items-center mt-4 text-sm">
					<div className="flex items-center mr-4">
						<div className="w-3 h-3 rounded-full bg-[#FCAE2D] mr-1"></div>
						<span>valor arrecadado</span>
					</div>
					<div className="flex items-center">
						<div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
						<span>valor restante</span>
					</div>
				</div>
			</div>

			{/* Ranking Section */}
			<div className="bg-gray-100 rounded-lg p-6">
				<h2 className="text-xl font-semibold text-gray-800 mb-4">
					Ranking
				</h2>

				<div className="overflow-hidden rounded-md">
					<div className="grid grid-cols-2 bg-gray-500 text-white font-medium">
						<div className="py-3 px-4 text-center">Unidade</div>
						<div className="py-3 px-4 text-center">Pontos</div>
					</div>

					{rankingData.map((team) => (
						<div
							key={team.id}
							className="grid grid-cols-2 border-b border-gray-200 bg-white"
						>
							<div className="py-3 px-4 flex justify-center items-center">
								{/* <img
									src={team.logo || "/placeholder.svg"}
									alt={`Team ${team.id}`}
									className="h-8"
								/> */}
							</div>
							<div className="py-3 px-4 text-center">
								{team.points}
							</div>
						</div>
					))}
				</div>
			</div>

			<div>
				<Calendar />
			</div>
			{/* Calendar Section */}
			{/* <div className="bg-gray-100 rounded-lg p-6 md:col-span-2">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold text-gray-800">
						{monthNames[currentMonth]} {currentYear}
					</h2>
					<div className="flex space-x-2">
						<button
							onClick={handlePrevMonth}
							className="p-2 rounded-full hover:bg-gray-200"
						>
							<FaChevronLeft />
						</button>
						<button
							onClick={handleNextMonth}
							className="p-2 rounded-full hover:bg-gray-200"
						>
							<FaChevronRight />
						</button>
					</div>
				</div>

				<div className="grid grid-cols-7 gap-1">
					{weekDays.map((day, index) => (
						<div
							key={index}
							className="text-center font-medium text-sm py-2"
						>
							{day}
						</div>
					))}

					{generateCalendarDays()
						.slice(0, 35)
						.map((day, index) => (
							<div
								key={index}
								onClick={() =>
									day.currentMonth && setSelectedDay(day.day)
								}
								className={`
                text-center py-2 rounded-full cursor-pointer
                ${!day.currentMonth ? "text-gray-400" : "text-gray-800"}
                ${
					day.currentMonth && day.day === selectedDay
						? "bg-[#FCAE2D] text-white"
						: ""
				}
                ${
					day.currentMonth && day.day !== selectedDay
						? "hover:bg-gray-200"
						: ""
				}
				`}
							>
								{day.day}
							</div>
						))}
				</div>
			</div> */}
		</div>
	);
};

export default Dashboard;
