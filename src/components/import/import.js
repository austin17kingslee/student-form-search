import React from 'react';
import './import.css';
import LogoImage from '../../assets/logo.svg';
import axios from "axios";

class ImportFile extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedFile: "",
      responseArray: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      selectedFile: event.target.files,
      responseArray:[]
    });
  }

  onSubmit() {
    if (!this.state.selectedFile) {
      alert("Please select a file!");
      return false;
    }
    const data = new FormData();

    for (let i = 0; i < this.state.selectedFile.length; i++) {
      data.append("file[]", this.state.selectedFile[i]);
    }

    let url = "http://127.0.0.1:8000/upload.php";

    axios
      .post(url, data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        this.setState({ responseArray: res.data });
        this.resetFile();
      },error=>{
        alert(error);
      });
  }

  resetFile() {
    // Reset file input control
    document.getElementsByName("file")[0].value = null;
  }

  render(){
    return (
      <section className='ImportFile'>
        <img src={LogoImage}></img>
        <div className="row">
        <div className="col-md-12">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Click to import file: </label>
              <input
                type="file"
                className="form-control"
                multiple
                name="file"
                onChange={this.handleInputChange}
                placeholder ="Click to import"
              />
            </div>
          </div>
          <br />
          <div className="form-row">
            <div className="col-md-6">
              <button
                type="submit"
                className="btn btn-success"
                onClick={() => this.onSubmit()}
              >
                Import
              </button>
            </div>
          </div>
          <br />
          {this.state.responseArray.map((res, i) => (
            <div key={i}>
                <div  className={'img-alert alert alert-'+res.status}>
                  <div>{res.message} : {res.url}</div>
                  <img src={res.base64} />
                </div>
            </div>
          ))}
        </div>
      </div>
      </section>
    )
  }
}

export default ImportFile