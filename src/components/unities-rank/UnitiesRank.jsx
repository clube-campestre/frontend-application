import { useEffect, useState } from "react";

const UnitiesRank = () => {
	const [ranking, setRanking] = useState([]);

	useEffect(() => {
		fetch("/api/ranking")
			.then((res) => res.json())
			.then((data) => setRanking(data));
	}, []);

	return (
		<div className="bg-white p-4 rounded-2xl shadow-md w-full max-w-[300px]">
			<h2 className="text-xl font-semibold mb-4 text-[#022C81]">
				Ranking
			</h2>
			<ul className="space-y-2">
				{ranking.map((item, index) => (
					<li
						key={item.id}
						className="flex justify-between items-center"
					>
						<span className="font-medium text-[#000]">
							{item.nome}
						</span>
						<span className="text-[#FCAE2D] font-bold">
							{item.pontos} pts
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default UnitiesRank;
