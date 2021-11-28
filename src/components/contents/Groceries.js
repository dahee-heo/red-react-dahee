import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';

function Groceries(props) {
  const { groceriesStore } = props;
  const { itemsStore } = props;
  const { grocery, groceries } = groceriesStore;
  console.log(grocery, groceries);
  useEffect(() => {
    groceriesStore.groceriesRead();
  }, [groceriesStore]);
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
                  <span className="material-icons active">arrow_drop_up</span>
                  <span className="material-icons">arrow_drop_down</span>
                </span>
              </th>
              <th>
                <span className="title-names">
                  Enter
                  <span className="material-icons">arrow_drop_up</span>
                  <span className="material-icons">arrow_drop_down</span>
                </span>
              </th>
              <th>
                <span className="title-names">
                  Expire
                  <span className="material-icons">arrow_drop_up</span>
                  <span className="material-icons">arrow_drop_down</span>
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
