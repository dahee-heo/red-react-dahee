function Groceries(props) {
  console.log(props);
  return (
    <article>
      <form className="form-inputs">
        <input type="text" name="name" />
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
              <td><input type="checkbox" onchange="" /></td>
              <td>사과</td>
              <td>2021-01-01</td>
              <td className="td-expire"><input type="date" value="2021-02-02" onchange="" /></td>
              <td className="td-delete">
                <button className="button-delete" onclick=""><span className="material-icons">delete</span></button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" onchange="" /></td>
              <td>바나나</td>
              <td>2021-01-01</td>
              <td className="td-expire"><input type="date" value="2021-02-02" onchange="" /></td>
              <td className="td-delete">
                <button className="button-delete" onclick=""><span className="material-icons">delete</span></button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" onchange="" /></td>
              <td>딸기</td>
              <td>2021-01-01</td>
              <td className="td-expire"><input type="date" value="2021-02-02" onchange="" /></td>
              <td className="td-delete">
                <button className="button-delete" onclick=""><span className="material-icons">delete</span></button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" onchange="" /></td>
              <td>키위</td>
              <td>2021-01-01</td>
              <td className="td-expire"><input type="date" value="2021-02-02" onchange="" /></td>
              <td className="td-delete">
                <button className="button-delete" onclick=""><span className="material-icons">delete</span></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  )
}

export default Groceries;
