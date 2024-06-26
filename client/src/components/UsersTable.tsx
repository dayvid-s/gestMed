import { CustomProvider, SelectPicker, DatePicker, Calendar, } from 'rsuite';
import pt_BR from 'rsuite/locales/pt_BR';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaRegPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import { api } from '../services/axiosClient';
import { Table, Button, Pagination } from 'rsuite';
import { MdDeleteOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

import { CiEdit } from "react-icons/ci";
import ActiveItem from './ActiveItem';


const { Column, HeaderCell, Cell } = Table;

interface User {
  id: number;
  name: string;
  creationDate: string; // ou Date, dependendo do tipo retornado pelo backend
  department: string;
}

async function getData() {
  try {
    const response = await api.get('/users');

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const defaultData = [
    {
      id: 1,
      firstName: 'Molecule Man',
      age: 29,
      postcode: 29,
      gender: 'Dansdsdsssssssssssss Jukes',
      email: 'Dan Jukes',
      lastName: 'Turning tiny',
    },
    {
      id: 2,
      firstName: 'Madame Uppercut',
      age: 39,
      postcode: 39,
      gender: 'Jane Wilson',
      email: 'Jane Wilson',
      lastName: 'Damage resistance',
    }, {
      id: 2,
      firstName: 'Madame Uppercut',
      age: 39,
      postcode: 39,
      gender: 'Jane Wilson',
      email: 'Jane Wilson',
      lastName: 'Damage resistance',
    }, {
      id: 2,
      firstName: 'Madame Uppercut',
      age: 39,
      postcode: 39,
      gender: 'Jane Wilson',
      email: 'Jane Wilson',
      lastName: 'Damage resistance',
    }, {
      id: 2,
      firstName: 'Madame akdkadka',
      age: 39,
      postcode: 39,
      gender: 'Jane Wilson',
      email: 'Jane Wilson',
      lastName: 'Damage resistance',
    }, {
      id: 2,
      firstName: 'Madame Uppercut',
      age: 39,
      postcode: 39,
      gender: 'Jane Wilson',
      email: 'Jane Wilson',
      lastName: 'Damage resistance',
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  async function handleDeleteUser(userId: number) {
    try {
      await api.delete(`/users/${userId}`);
      // Atualize a lista de usuários após a exclusão
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  }

  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };
  const data = defaultData.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });
  return (


    <div className='' >
      <ActiveItem />

      <Table
        autoHeight={true}
        data={data}
        bordered={false}
        rowHeight={60}
        onRowClick={rowData => {
          console.log(rowData);
        }}
      >
        <Column resizable width={60} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column resizable width={250}
        >
          <HeaderCell>Nome</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column
          resizable width={350}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column resizable width={200}>
          <HeaderCell>Setor</HeaderCell>
          <Cell dataKey="gender" />
        </Column>

        <Column resizable width={190}>
          <HeaderCell>Permissão</HeaderCell>
          <Cell dataKey="age" />
        </Column>


        <Column resizable width={90} fixed="right">
          <HeaderCell >Ações</HeaderCell>

          <Cell style={{ padding: '6px' }}>
            {rowData => (
              <div className="flex flex-row 	" >
                <MdDeleteOutline style={{ width: '25', height: "25" }} />
                <CiEdit style={{ width: '25', height: "25" }} />
                <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
                </Button>
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
        layout={['total', '-', 'limit', '|', 'pager',]}
        total={defaultData.length}
        limitOptions={[10, 30, 50]}
        limit={limit}
        activePage={page}
        onChangePage={setPage}
        onChangeLimit={handleChangeLimit}
      />
    </div>
  );
}