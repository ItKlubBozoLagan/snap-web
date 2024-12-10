import type { EducationCategory } from "../../util/contestResults.ts";
import type { FC } from "react";

type Properties = {
    dataByCategory: Record<EducationCategory | "all", ContestTableEntry[]>;
}

export const TableView: FC<EducationCategory> = ({ dataByCategory }: Properties) => {
    return (
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
            {DataByCategory["all"].map(it => (
                <tr>
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
    );
};
