import type { ContestTableEntry, EducationCategory } from "../../util/contestResults.ts";
import { type FC, useState } from "react";
import "./table-styles.scss";

type Properties = {
    dataByCategory: Record<EducationCategory | "all", ContestTableEntry[]>;
}

export const TableView: FC<Properties> = ({ dataByCategory }: Properties) => {
    const [ selectedCategory, setSelectedCategory ] = useState<EducationCategory | "all">("all");

    return (
        <div className={"container"}>
            <div className={"buttons"}>
                <button onClick={() => setSelectedCategory("all")}
                        className={selectedCategory === "all" && "active"}>Svi
                </button>
                <button onClick={() => setSelectedCategory("university")}
                        className={selectedCategory === "university" && "active"}>Fakulteti
                </button>
                <button onClick={() => setSelectedCategory("high")}
                        className={selectedCategory === "high" && "active"}>Srednje škole
                </button>
                <button onClick={() => setSelectedCategory("elementary")}
                        className={selectedCategory === "elementary" && "active"}>Osnovne škole
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
                        <th>Kontestis</th>
                        <th>Testiranje</th>
                        <th>Komunikacija</th>
                        <th>Teta</th>
                        <th>Donald</th>
                        <th>Kvadrati</th>
                        <th>Lozinka</th>
                        <th>Ukupno</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataByCategory[selectedCategory].map((it, index) => (
                        <tr key={index.toString()}>
                            <td className={"center"}>{it.rank}</td>
                            <td>{it.full_name}</td>
                            <td>{it.category}</td>
                            <td>{it.institution}</td>
                            <td className={"center"}>{it.score["kontestis"] ?? ""}</td>
                            <td className={"center"}>{it.score["testiranje"] ?? ""}</td>
                            <td className={"center"}>{it.score["komunikacija"] ?? ""}</td>
                            <td className={"center"}>{it.score["teta"] ?? ""}</td>
                            <td className={"center"}>{it.score["donald"] ?? ""}</td>
                            <td className={"center"}>{it.score["kvadrati"] ?? ""}</td>
                            <td className={"center"}>{it.score["lozinka"] ?? ""}</td>
                            <td className={"center"}>{it.total}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
