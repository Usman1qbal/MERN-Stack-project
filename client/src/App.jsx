import React from "react";
import MaterialDatatable from "material-datatable";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      pageNumber: 1,
      data: [
        {
          id: "239",
          first_name: "Garry",
          last_name: "Collelton",
          email: "gcollelton6m@state.gov",
          gender: "Male"
        }
      ]
    };
  }
  callApi(limit) {
    this.setState({ limit: limit });
    limit = parseInt(this.state.pageNumber, 10) * parseInt(limit, 10);
    let count = (parseInt(this.state.pageNumber, 10) - 1) * parseInt(limit, 10);
    fetch(`http://localhost:9000/api/emps?limit=${limit}&skip=${count}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ data: res });
      });
  }

  componentWillMount() {
    this.callApi(this.state.limit);
  }

  render() {
    const columns = [
      { name: "ID", field: "id" },
      { name: "First Name", field: "first_name" },
      { name: "Last Name", field: "last_name" },
      { name: "Email", field: "email" },
      { name: "Gender", field: "gender" }
    ];

    const options = {
      filter: false,
      download: false,
      viewColumns: true,
      filterType: "textField",
      sort: true,
      print: true,
      search: false,
      pagination: false,
      responsive: "scroll",
      rowsPerPage: this.state.limit
    };

    return (
      <div style={{ overFlow: "scroll", marginLeft: "8px" }}>

        {/* --------- DataTable for data showing  ---------*/}
        <MaterialDatatable
          title={"TEST DATA OF EMPLOYEES"}
          data={this.state.data}
          columns={columns}
          options={options}
        />

        {/* --------- Row per page limit Drop down  ---------*/}
        <span className="dropDown">
          Row per Page:
          <select
            style={{ border: "none" }}
            onChange={e => {
              this.callApi(e.target.value);
            }}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="50">50</option>
          </select>
        </span>
        
        {/* --------- Page Number counter  ---------*/}
        <span
          style={{
            left: "78%",
            position: "relative",
            fontSize: "13px",
            top: "0.3rem"
          }}
        >
          <lable className="pageCounter">Page Number:</lable>
          <ArrowLeftIcon
            onClick={() => {
              this.setState({ pageNumber: this.state.pageNumber - 1 });
              this.callApi(this.state.limit);
            }}
          />
          <label
            style={{
              position: "relative",
              top: "-5px"
            }}
          >
            {" "}
            {this.state.pageNumber}{" "}
          </label>
          <ArrowRightIcon
            onClick={() => {
              this.setState({ pageNumber: this.state.pageNumber + 1 });
              this.callApi(this.state.limit);
            }}
          />
        </span>
      </div>
    );
  }
}

export default App;
