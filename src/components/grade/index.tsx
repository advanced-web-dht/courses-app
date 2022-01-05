import React from 'react';
import { CSVDownloader } from 'react-papaparse';
import { Root, StyledTableRow } from './style';

const createData = (
  name: string,
  diem1: number,
  diem2: number,
  diem3: number,
  diem4: number,
  diem5: number,
  diem6: number,
  diem7: number,
  diem8: number,
  diem9: number
) => {
  return { name, diem1, diem2, diem3, diem4, diem5, diem6, diem7, diem8, diem9 };
};

// const createData = (name: string, diem: array) => {
//   return { name, diem };
// };

const rows = [
  createData('18120000', 10, 10, 10, 10, 10, 10, 10, 10, 10),
  createData('18120001', 10, 10, 10, 10, 10, 10, 10, 10, 10),
  createData('18120033', 10, 10, 10, 10, 10, 10, 10, 10, 10),
  createData('18120022', 10, 10, 10, 10, 10, 10, 10, 10, 10),
  createData('18120001', 10, 10, 10, 10, 10, 10, 10, 10, 10),
  createData('18120000', 10, 10, 10, 10, 10, 10, 10, 10, 10)
].sort((a, b) => (a.name < b.name ? -1 : 1));

const GradeTable: React.FC = () => {
  return (
    <Root>
      <table aria-label='custom table'>
        <thead>
          <tr>
            <th>Sinh viên</th>
            <th>Điểm 1</th>
            <th>Điểm 2</th>
            <th>Điểm 3</th>
            <th>Điểm 4</th>
            <th>Điểm 5</th>
            <th>Điểm 6</th>
            <th>Điểm 7</th>
            <th>Điểm 8</th>
            <th>Điểm 9</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <td style={{ minWidth: 250 }}>{row.name}</td>
              <td style={{ minWidth: 150 }}>{row.diem1}</td>
              <td style={{ minWidth: 150 }}>{row.diem2}</td>
              <td style={{ minWidth: 150 }}>{row.diem3}</td>
              <td style={{ minWidth: 150 }}>{row.diem4}</td>
              <td style={{ minWidth: 150 }}>{row.diem5}</td>
              <td style={{ minWidth: 150 }}>{row.diem6}</td>
              <td style={{ minWidth: 150 }}>{row.diem7}</td>
              <td style={{ minWidth: 150 }}>{row.diem8}</td>
              <td style={{ minWidth: 150 }}>{row.diem9}</td>
            </StyledTableRow>
          ))}
        </tbody>
      </table>
      <CSVDownloader data={rows}>Download</CSVDownloader>
    </Root>
  );
};
export default GradeTable;
