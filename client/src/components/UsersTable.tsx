import { UserData } from "@/@types/userTypes";
import { deleteUser, fetchUsers } from "@/features/userSlice";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Pagination, Table } from "rsuite";
import { AppDispatch } from "../store";
import ActiveItem from "./ActiveItem";

const { Column, HeaderCell, Cell } = Table;

export default function UsersTable() {
  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const action = await dispatch(fetchUsers());
        if (fetchUsers.fulfilled.match(action)) {
          setUsers(action.payload);
        } else {
          if (fetchUsers.rejected.match(action)) {
            setError(action.payload || "Erro ao buscar usuários");
          }
        }
      } catch (err) {
        setError("Erro ao buscar usuários");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  const handleChangeLimit = (dataKey: number | "Todos") => {
    setPage(1);
    if (dataKey === "Todos") {
      setLimit(users.length);
    } else {
      setLimit(dataKey);
    }
  };

  // @ts-expect-error because u
  const data = limit === "Todos" ? users : users.slice((page - 1) * limit, page * limit);

  return (
    <div className=''>
      <ActiveItem />

      <Table
        autoHeight={true}
        data={data}
        bordered={false}
        rowHeight={60}
        onRowClick={rowData => {
          console.log(rowData);
        }}
        loading={loading}
      >
        <Column resizable width={60} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column resizable width={250}>
          <HeaderCell>Nome</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column resizable width={350}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="email" />
        </Column>

        <Column resizable width={200}>
          <HeaderCell>Permissão</HeaderCell>
          <Cell dataKey="role" />
        </Column>

        <Column resizable width={200}>
          <HeaderCell>Especialização</HeaderCell>
          <Cell dataKey="specialization" />
        </Column>

        <Column resizable width={90} fixed="right">
          <HeaderCell>Ações</HeaderCell>
          <Cell style={{ padding: "6px" }}>
            {rowData => (
              <div className="flex flex-row ">
                <MdDeleteOutline
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
                  onClick={() => handleDeleteUser(rowData.id)}
                />
                <CiEdit
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
                />
              </div>
            )}
          </Cell>
        </Column>
      </Table>

      <Pagination
        style={{ marginTop: "20px", marginLeft: "30px", marginRight: "30px" }}
        prev
        next
        ellipsis
        boundaryLinks
        maxButtons={5}
        size="xs"
        layout={["total", "-", "limit", "|", "pager"]}
        total={users.length}
        // @ts-ignore
        limitOptions={[10, 30, 50, "Todos"]}
        limit={limit}
        activePage={page}
        onChangePage={setPage}
        onChangeLimit={handleChangeLimit}
      />
    </div>
  );
}