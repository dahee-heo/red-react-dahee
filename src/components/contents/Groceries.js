import { inject, observer } from 'mobx-react';

function Groceries(props) {
  const { groceriesStore } = props;
  const { grocery } = groceriesStore;
  console.log(grocery);
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
            <tr>
              <td><input type="checkbox" /></td>
              <td>사과</td>
              <td>2021-01-01</td>
              <td className="td-expire"><input type="date" defaultValue="2021-02-02" /></td>
              <td className="td-delete">
                <button className="button-delete"><span className="material-icons">delete</span></button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>바나나</td>
              <td>2021-01-01</td>
              <td className="td-expire"><input type="date" defaultValue="2021-02-02" /></td>
              <td className="td-delete">
                <button className="button-delete"><span className="material-icons">delete</span></button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>딸기</td>
              <td>2021-01-01</td>
              <td className="td-expire"><input type="date" defaultValue="2021-02-02" /></td>
              <td className="td-delete">
                <button className="button-delete"><span className="material-icons">delete</span></button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>키위</td>
              <td>2021-01-01</td>
              <td className="td-expire"><input type="date" defaultValue="2021-02-02" /></td>
              <td className="td-delete">
                <button className="button-delete"><span className="material-icons">delete</span></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  )
}

export default inject('groceriesStore')(observer(Groceries));
