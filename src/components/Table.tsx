import { useCallback } from 'react';
import DataTable from 'react-data-table-component';

type TableProps = {
    cols: Array<Object>,
    rows: Array<Object>,
    hiddenCols: Array<string>
    sortable: Array<string>,
    onRowClick: ()=>{},
    rowConditionals: any,
    title: string,
    fixedHeader: boolean,
    classes:string,
    theme: string,
    progressPending?: boolean,
    progressComponent?: any,
    selectedRowAction?: any
}

const Table: React.FC<TableProps> = ({ progressComponent, progressPending, cols, rows, theme, hiddenCols, sortable, onRowClick, rowConditionals, fixedHeader, classes, title, selectedRowAction}) => {
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

    const handleRowSelected = useCallback(state => {
        if(selectedRowAction) selectedRowAction(state.selectedRows)
    }, [])

    return (
        <DataTable 
            theme={theme}
            className={`${classes}`}
            title={title}
            columns={columns} 
            data={rows} 
            onRowClicked={onRowClick} 
            fixedHeader={fixedHeader}
            conditionalRowStyles={rowConditionals}
            progressPending={progressPending}
            progressComponent={progressComponent}
            pagination={true}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
        />
    )
}

export default Table;