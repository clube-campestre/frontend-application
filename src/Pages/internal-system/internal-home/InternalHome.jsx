import GoalChart from "../../../components/charts/GoalChart";
import CustomCalendar from "../../../components/calendars/Calendar";
import RankingList from "../../../components/unities-rank/UnitiesRank";

const InternalHome = () => {
	return (
		// <div className="flex flex-row gap-10 w-full h-full p-6 bg-[#F8F8F8]">
		// 	<div className="flex flex-wrap gap-6 flex-col">
		// 		<GoalChart />
		// 		<CustomCalendar />
		// 	</div>
		// 	<div>
		// 		<RankingList />
		// 	</div>
		// </div>
		<div>
			<GoalChart />
		</div>
	);
};

export default InternalHome;
