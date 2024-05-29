import DataTable from 'react-data-table-component';

type TableProps = {
    cols: Array<Object>,
    rows: Array<Object>,
    hiddenCols: Array<string>
    sortable: Array<string>,
    onRowClick: ()=>{},
    rowConditionals: any
}

const Table: React.FC<TableProps> = ({ cols, rows, hiddenCols, sortable, onRowClick, rowConditionals, fixedHeader, classes }) => {
    let columns = cols.map((col)=>{
        return {
            name: col.name.toString(),
            selector: row => row[col.name],
            omit: hiddenCols.includes(col.name),
            sortable: sortable.includes(col.name),
            style: col.style
        }
    })

    return (
        <DataTable 
            className={`${classes}`}
            title={fixedHeader}
            columns={columns} 
            data={rows} 
            onRowClicked={onRowClick} 
            fixedHeader={false}
            conditionalRowStyles={rowConditionals}
        />
    )
}

export default Table;