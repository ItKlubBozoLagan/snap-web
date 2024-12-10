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
            <button onClick={() => setSelectedCategory("all")}>All</button>
            <button onClick={() => setSelectedCategory("university")}>Uni</button>
            <button onClick={() => setSelectedCategory("high")}>High</button>
            <button onClick={() => setSelectedCategory("elementary")}>Elementary</button>
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
                        <td>{it.rank}</td>
                        <td>{it.full_name}</td>
                        <td>{it.category}</td>
                        <td>{it.institution}</td>
                        <td>{it.score["kontestis"] ?? ""}</td>
                        <td>{it.score["testiranje"] ?? ""}</td>
                        <td>{it.score["komunikacija"] ?? ""}</td>
                        <td>{it.score["teta"] ?? ""}</td>
                        <td>{it.score["donald"] ?? ""}</td>
                        <td>{it.score["kvadrati"] ?? ""}</td>
                        <td>{it.score["lozinka"] ?? ""}</td>
                        <td>{it.total}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
