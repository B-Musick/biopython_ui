import DataTable from 'react-data-table-component';

type TableProps = {
    cols: Array<Object>,
    rows: Array<Object>,
    hiddenCols: Array<string>
    sortable: Array<string>,
    onRowClick: ()=>{},
    rowConditionals: any,
    title: string,
    fixedHeader: boolean
}

const Table: React.FC<TableProps> = ({ cols, rows, hiddenCols, sortable, onRowClick, rowConditionals, fixedHeader, classes, title}) => {
    let columns = cols.map((col)=>{
        return {
            ...col,
            name: col.name.toString(),
            selector: row => row[col.name],
            omit: hiddenCols.includes(col.name),
            sortable: sortable.includes(col.name),
            style: col.style,
            wrap:true,
        }
    })

    return (
        <DataTable 
            className={`${classes}`}
            title={title}
            columns={columns} 
            data={rows} 
            onRowClicked={onRowClick} 
            fixedHeader={fixedHeader}
            conditionalRowStyles={rowConditionals}
        />
    )
}

export default Table;