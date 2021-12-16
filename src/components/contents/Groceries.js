// import { orderBy } from 'lodash';
import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Groceries(props) {
  const { groceriesStore } = props;
  const { itemsStore } = props;
  const { grocery, groceries } = groceriesStore;
  const searchParams = new URLSearchParams(props.location.search);
  const orderByName = searchParams.get('orderByName') || 'name';
  const orderByType = searchParams.get('orderByType') || 'asc';
  console.log(grocery, groceries);
  useEffect(() => {
    groceriesStore.groceriesRead(orderByName, orderByType);
  }, [groceriesStore, orderByName, orderByType]);
  const activeClass = function(_orderByName, _orderByType) {
    if (orderByName === _orderByName && orderByType === _orderByType) {
      return ' active';
    } else {
      return '';
    }
  };
  return (
    <article>
      <form className="form-inputs" onSubmit={event => {
        event.preventDefault();
        groceriesStore.groceriesCreate()
      }}>
        <input
          type="text" name="name" value={grocery.name}
          onChange={event => {grocery.name = event.target.value}}
        />
        <button className="button-create"><span className="material-icons">edit</span></button>
      </form>
      <div className="div-table">
        <table>
          <thead>
            <tr>
              <th>Move</th>
              <th>
                <span className="title-names">
                  Name
                  <span className={'material-icons' + activeClass('name', 'asc')}><NavLink to ="?orderByName=name&orderByType=asc">arrow_drop_up</NavLink></span>
                  <span className={'material-icons' + activeClass('name', 'desc')}><NavLink to ="?orderByName=name&orderByType=desc">arrow_drop_down</NavLink></span>
                </span>
              </th>
              <th>
                <span className="title-names">
                  Enter
                  <span className={'material-icons' + activeClass('enter', 'asc')}><NavLink to ="?orderByName=enter&orderByType=asc">arrow_drop_up</NavLink></span>
                  <span className={'material-icons' + activeClass('enter', 'desc')}><NavLink to ="?orderByName=enter&orderByType=desc">arrow_drop_down</NavLink></span>
                </span>
              </th>
              <th>
                <span className="title-names">
                  Expire
                  <span className={'material-icons' + activeClass('expire', 'asc')}><NavLink to ="?orderByName=expire&orderByType=asc">arrow_drop_up</NavLink></span>
                  <span className={'material-icons' + activeClass('expire', 'desc')}><NavLink to ="?orderByName=expire&orderByType=desc">arrow_drop_down</NavLink></span>
                </span>
              </th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
          {groceries.map((grocery, index) => (
            <tr key={index}>
              <td><input type="checkbox" 
                checked={grocery.hasItem}
                onChange={event => {
                  if (event.target.checked) {
                    itemsStore.itemsUpdate(grocery)
                  } else {
                    itemsStore.itemsDelete(grocery)
                  }
                }}
              /></td>
              <td>{grocery.name}</td>
              <td>{grocery.enter}</td>
              <td className="td-expire">
                <input type="date" defaultValue={grocery.expire}
                  onChange={event => {
                    grocery.expire = event.target.value;
                    groceriesStore.groceriesUpdate(grocery);
                  }}
                />
              </td>
              <td className="td-delete">
                <button className="button-delete"
                  onClick={() => groceriesStore.groceriesDelete(grocery.key)}
                ><span className="material-icons">delete</span></button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}

export default inject('groceriesStore', 'itemsStore')(observer(Groceries));
