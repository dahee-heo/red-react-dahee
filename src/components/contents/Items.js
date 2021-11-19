import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';

function Items(props) {
  const { itemsStore } = props;
  const { items } = itemsStore;
  useEffect(() => {
    itemsStore.itemsRead();
  }, [itemsStore]);
  console.log(props);
  return (
    <article>
      <form className="form-inputs">
        <input type="text" name="q" />
        <button className="button-search"><span className="material-icons">search</span></button>
      </form>
      <div className="div-table">
        <table>
          <thead>
            <tr>
              <th>No</th>
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
              <th>Edit</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.enter}</td>
              <td>{item.expire}</td>
              <td className="td-update">
                {/* <button className="button-update" onClick="modalToggle();"><span className="material-icons">edit_note</span></button> */}
              </td>
              <td className="td-delete">
                <button className="button-delete" 
                  onClick={() => itemsStore.itemsDelete(item)}
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

export default inject('itemsStore')(observer(Items));
