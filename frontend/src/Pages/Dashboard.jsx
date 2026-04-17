import { useEffect, useMemo, useState } from "react";
import DataTable from "../components/DataTable";
import API from "../api/axios";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "../components/SearchBar";
import AddUser from "../components/AddUser";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function DashBoard() {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [open , setOpen] = useState(false)
   const navigate = useNavigate()

  const debouncedSearch = useDebounce(search, 500);


const fetchUsers = useCallback(async () => {
  setLoading(true);
  try {
    const res = await API.get(
      `/users/getUsers?page=${page + 1}&limit=10&search=${debouncedSearch}`
    );

    const formatted = res.data.users.map((u) => ({
      ...u,
      id: u._id,
    }));

    setUsers(formatted);
    setTotal(res.data.total);
  } catch (error) {
    console.log(error);
  }
  setLoading(false);
}, [page, debouncedSearch]);

useEffect(() => {
  fetchUsers();
}, [fetchUsers]);



  const handleCreate = async(formData)=>{
    try {
      await API.post("/users/createUser",formData)
      setOpen(false)
      fetchUsers()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/deleteUser/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const columns =useMemo(()=> [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "status", headerName: "Status", width: 120 },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="flex justify-center items-center gap-6 p-2 h-[100%]">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded h-[80%] w-[50%] flex justify-center items-center"
            onClick={() => alert("Edit coming next")}
          >
            Edit
          </button>

          <button
            className="bg-red-500 text-white px-2 py-1 rounded h-[80%] w-[50%] flex justify-center items-center"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ],[])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full items-center justify-center m-5">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <button onClick={()=>navigate("/")} className="ml-[70%] border bg-red-500 px-2 py-1 rounded">Log Out</button>
        </div>

      <div className="flex justify-between w-full max-w-4xl items-center">
        <SearchBar value={search} onChange={setSearch} />

        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>

      <AddUser open={open} setOpen={setOpen} onSave={handleCreate}/>
      <DataTable
        rows={users}
        columns={columns}
        page={page}
        loading={loading}
        onPageChange={(newPage) => setPage(newPage)}
        total={total}
      />
    </div>
  );
}
