import type { ContestTableEntry, EducationCategory } from "../../util/contestResults.ts";
import { type FC, useEffect, useMemo, useState } from "react";
import "./table-styles.scss";

type OneContestData = {
    problems: string[];
    data: Record<EducationCategory | "all", ContestTableEntry[]>;
    color?: boolean;
    finalCall?: Record<EducationCategory, number>
};

type Properties = {
    dataByContests: Record<string, OneContestData>;
};

export const ContestsView: FC<Properties> = ({ dataByContests }: Properties) => {
    const [selectedContest, setSelectedContest] = useState<string>(() => {
        const keys = Object.keys(dataByContests);
        return keys[keys.length - 1];
    });

    const contestData = useMemo(() => dataByContests[selectedContest], [selectedContest]);

    return (
        <div className={"container"}>
            <div className={"buttons buttons-contest"}>
                {Object.keys(dataByContests).map((contest) => (
                    <button
                        key={contest}
                        onClick={() => setSelectedContest(contest)}
                        className={selectedContest === contest ? "active" : ""}
                    >
                        {contest}
                    </button>
                ))}
            </div>
            <TableView data={contestData} />
        </div>
    );
};

const TableView: FC<{ data: OneContestData }> = ({ data: { problems, data, color, finalCall } }) => {
    const [selectedCategory, setSelectedCategory] = useState<EducationCategory | "all">("all");

    useEffect(() => {
        setSelectedCategory("all");
    }, [problems]);

    return (
        <div className={"container"}>
            <div className={"buttons"}>
                <button
                    onClick={() => setSelectedCategory("all")}
                    className={selectedCategory === "all" ? "active" : ""}
                >
                    Svi
                </button>
                <button
                    onClick={() => setSelectedCategory("university")}
                    className={selectedCategory === "university" ? "active" : ""}
                >
                    Fakulteti
                </button>
                <button
                    onClick={() => setSelectedCategory("high")}
                    className={selectedCategory === "high" ? "active" : ""}
                >
                    Srednje škole
                </button>
                <button
                    onClick={() => setSelectedCategory("elementary")}
                    className={selectedCategory === "elementary" ? "active" : ""}
                >
                    Osnovne škole
                </button>
            </div>
            <div className={"table-container"}>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ime i prezime</th>
                            <th>Kategorija</th>
                            <th>Institucija</th>
                            {problems.map((problem) => (
                                <th key={problem}>{problem}</th>
                            ))}
                            <th>Ukupno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data[selectedCategory].map((it, index) => (
                            <tr key={index.toString()} style={{
                                ...(finalCall && index == finalCall[selectedCategory] ? { borderTop: `2px solid black` } : undefined),
                                ...(finalCall && index < finalCall[selectedCategory] ? { backgroundColor: "#00ff0011" } : undefined)
                            }}>
                                <td className={"center"}>{it.rank}</td>
                                <td>{it.full_name}</td>
                                <td>{it.category}</td>
                                <td>{it.institution}</td>
                                {problems.map((problem) => (
                                    <td
                                        key={problem}
                                        className={"center"}
                                        style={
                                            color &&
                                            (it.score[problem] === null
                                                ? { backgroundColor: "#ff000022" }
                                                : { backgroundColor: "#00ff0022" })
                                        }
                                    >
                                        {it.score[problem] === null
                                            ? "X"
                                            : (it.score[problem] ?? "")}
                                    </td>
                                ))}

                                <td className={"center"}>{it.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
