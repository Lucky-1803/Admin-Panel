import { DataGrid } from "@mui/x-data-grid"
import React from "react";

 function DataTable({
  rows,
  columns,
  loading,
  page,
  onPageChange,
  total
}) {
  return (
    <div className="w-[60%] h-[500px]">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[10, 20, 50]}
        paginationMode="server"
        rowCount={total}
        loading={loading}

        paginationModel={{ page, pageSize: 10 }}
        onPaginationModelChange={(model) => {
          onPageChange(model.page)
        }}
      />
    </div>
  )
}

export default React.memo(DataTable)