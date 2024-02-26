import React, { ReactNode } from "react";

interface Props {
  classes?: any;
  header: any;
  data?: any;
  row?: any;
  children?: ReactNode;
  theadClass?: string;
  tbodyClass?: string;
}

const BaseTable: React.FC<Props> = ({
  classes,
  data,
  header,
  row,
  children,
  theadClass,
  tbodyClass,
}) => {
  return (
    <>
      <table
        className={`table align-middle text-center overflow-hidden ${classes}`}
      >
        <thead className={`${theadClass}`}>
          <tr>
            {header &&
              header.map((head: any, i: number) => <th key={i}>{head}</th>)}
          </tr>
        </thead>

        <tbody>
          {data
            ? data.map((items: any, i: number) => (
                <tr className={`${tbodyClass}`} key={i}>
                  {row.map((rows: any) => {
                    return <td>{items[rows]}</td>;
                  })}
                </tr>
              ))
            : children}
        </tbody>
      </table>
    </>
  );
};

export default BaseTable;
