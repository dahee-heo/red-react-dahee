import { inject, observer } from 'mobx-react';
import { useEffect } from 'react';

function Items(props) {
  const { itemsStore } = props;
  const { items, item } = itemsStore;
  useEffect(() => {
    itemsStore.itemsRead();
  }, [itemsStore]);
  const modalToggle = function(_item) {
    document.body.classList.toggle('o-hidden');
    document.getElementsByClassName('modal-background')[0].classList.toggle('active');
    if (!_item) return;
    item.name = _item.name;
    item.enter = _item.enter;
    item.expire = _item.expire;
    item.key = _item.key;
  };
  const itemsUpdate = function() {
    const cb = function() {
      modalToggle();
      itemsStore.itemsRead();
    };
    itemsStore.itemsUpdate(item, cb);
  };
  console.log(props);
  return (
    <>
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
                  <button className="button-update" onClick={() => modalToggle(item)}><span className="material-icons">edit_note</span></button>
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
      <div className="modal-background" onClick={() => modalToggle()}>
        <form className="modal" 
          onClick={(event) => {event.stopPropagation()}}
          onSubmit={(event) => {event.preventDefault()}}
        >
          <h3 className="modal-header">Edit</h3>
          <table className="modal-table">
            <tbody>
              <tr>
                <th>
                  <span>Name</span>
                </th>
                <td><input type="text" name="item-name" placeholder="Name"
                  onKeyDown={(event) => {if (event.key === 'Enter') event.preventDefault()}}
                  value={item.name}
                  onChange={event => {item.name = event.target.value}}
                /></td>
              </tr>
              <tr>
                <th>
                  <span>Enter</span>
                </th>
                <td><input type="date" name="item-enter" placeholder="YYYY-MM-DD" 
                  onKeyDown={(event) => {if (event.key === 'Enter') event.preventDefault()}}
                  value={item.enter}
                  onChange={event => {item.enter = event.target.value}}
                /></td>
              </tr>
              <tr>
                <th>
                  <span>Expire</span>
                </th>
                <td><input type="date" name="item-expire" placeholder="YYYY-MM-DD" 
                  onKeyDown={(event) => {if (event.key === 'Enter') event.preventDefault()}}
                  value={item.expire}
                  onChange={event => {item.expire = event.target.value}}
                /></td>
              </tr>
            </tbody>
          </table>
          <div className="modal-footer">
            <button className="button-close" onClick={() => modalToggle()}><span className="material-icons">close</span></button>
            <button className="button-update" onClick={() => itemsUpdate()}><span className="material-icons">edit_note</span></button>
          </div>
        </form>
      </div>
    </>
  )
}

export default inject('itemsStore')(observer(Items));
