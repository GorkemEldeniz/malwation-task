import styles from './table.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useEffect, useMemo, useState } from 'react';
import { getUserById, deleteUserById, getUsers } from '../../store/features/userSlice';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { UserState } from '../../store/features/userSlice';


function Table() {

  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { users, user } = useAppSelector(state => state.user);
  const pageNumber = Number(searchParams.get('page')) || 1;
  const navigator = useNavigate();
  const [loader, setLoader] = useState(false);
  const [searchList, setSearchList] = useState<UserState[]>([]);
  const [search, setSearch] = useState<string>('');

  const paginationCounter = new Array(users.length / 10 > 0 ? Math.floor(users.length / 10) + 2 : 1).fill('').map((_, i) => {
    if (i == 0) return '<';
    if (i == users.length) return '>';
    return i;
  })

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [])

  const paginateUser = useMemo(() => {
    const pageNumber = Number(searchParams.get('page')) || 1;
    if (users.length / 10 >= pageNumber - 1) {
      if (searchList.length) {
        return searchList.slice(0, 10);
      }
      else if (search) return [];
      return users.slice((pageNumber - 1) * 10, (pageNumber - 1) * 10 + 10);
    }
  }, [searchParams, users, searchList])

  const handleRoute = async (id: string) => {
    await dispatch(getUserById(id))
    localStorage.setItem('selectedUser', JSON.stringify({ ...users.find(user => user.id === id) }));
    navigator(`/user/${id}`)
  }


  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (user.id !== id) {
      setLoader(true)
      await dispatch(deleteUserById(id));
      await dispatch(getUsers());
      setSearch('');
      setSearchList(pre => pre.filter(user => user.id !== id));
      setLoader(false)
    }
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length) {
      setSearchList(users?.filter(user => {
        const values = Object.values(user);
        return values.some(value => value.toString().toLowerCase().includes(search.toLowerCase()))
      }))
    } else setSearchList([]);
  }

  if (loader) return <div className='loader'><Loader /></div>

  return (
    <section className={styles.wrapper}>
      <header>
        <h1>Users</h1>
      </header>

      <form className={styles.filter} onSubmit={handleSearch}>
        <input type="text" name="search" id="" onChange={(e) => setSearch(e.target.value)} />
        <button type='submit'>Filter</button>
      </form>

      <div className={styles['table-wrapper']}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Active</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginateUser?.map((el, i) => {
              return (<tr className={el.name === user.name ? styles['current-user'] : undefined} key={i} onClick={() => handleRoute(el.id)}>
                <td data-cell='Name'>{el.name}</td>
                <td data-cell='Email'>{el.email}</td>
                <td data-cell='Phone'>{el.phone}</td>
                <td data-cell='Role'>{el.role}</td>
                <td data-cell='Active'>{el.active ? '🟢' : '🔴'}</td>
                <td>
                  <button onClick={(e) => handleDelete(e, el.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        {paginationCounter.map(el => {
          return <button key={el}>
            {el == '<' ? <Link to={`/users?page=${pageNumber > 1 ? pageNumber - 1 : 1}`}>{el}</Link> : el == '>' ? <Link to={`/users?page=${pageNumber + 1}`}>{el}</Link> : <Link to={`/users?page=${el}`}>{el}</Link>}
          </button>
        })}
      </div>
    </section>
  )
}

export default Table