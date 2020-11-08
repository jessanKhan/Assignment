import React, { useState } from "react";
import { Formik } from "formik";
import { TextField, Button } from "@material-ui/core";
import Papa, { CSVReader } from 'papaparse';
import * as XLSX from "xlsx";
import { csv } from "d3";
import file from '../file/input_values.csv';
import './form.css';

const initialValuesStep1 = {
  project: "project",
  description: "description",
  client: "client",
  contractor: "contractor",
};

const initialValuesStep2 = {
  max_X: "",
  min_X: "",
  max_Y: "",
  min_Y: "",
  max_Z: "",
  min_Z: "",
}

const Forms = (props) => {
  const [items, setItems] = useState([]);
  const [values, setValues] = useState({ max_X: '', min_x: '', max_Y: '', min_y: '', max_Z: '', min_z: '' })
  const [data, setData] = useState();
  // const [description,setDescription]=useState('');
  // const [client,setClient]=useState('');
  // const [contractor,setContractor]=useState('');
  const [step, setStep] = useState(1);

  const onsubmitfunction = (formData) => {
    console.log("e.target.value", formData);
    setData(formData);
    setStep(2);
  };
  const onsubmitfunction2 = (formData) => {
    console.log("e.target.value min max", formData);
    // setData(formData);
    // setStep(3);
  };

  // const readExcel = (file) => {
  //   console.log(file)
  //   const promise = new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsArrayBuffer(file[0]);

  //     fileReader.onload = async (e) => {

  //       const bufferArray = e.target.result;

  //       const wb = XLSX.read(bufferArray, { type: "buffer" });

  //       const wsname = wb.SheetNames[0];

  //       const ws = wb.Sheets[wsname];

  //       const data = XLSX.utils.sheet_to_json(ws);
  //       console.log("onload file",ws)
  //       resolve(data);
  //     };

  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });

  //   promise.then((d) => {
  //     setItems(d);
  //     console.log("shoe",d)
  //   });
  // };


  const showFile = async (e) => {
    const localUrl = URL.createObjectURL(e.target.files[0]);
    csv(localUrl)
      .then(data => { setItems(data); calculateMinMax(data) })
      .catch(er => console.log(er));



    // const parsed =Papa.parse(e.target.files[0])
    // e.preventDefault()
    // const reader = new FileReader()
    // reader.onload = async (e) => { 
    //   const text = (e.target.result)

    //   const datas= JSON.stringify(text)
    //   console.log(datas)
    //   alert(datas)

    // };
    // reader.readAsText(e.target.files[0])
    // console.log(e.target.files)
    // // Papa.parse(e.target.files)
    // console.log(parsed)
  }

  function calculateMinMax(arr) {

    const max_X = Math.max(...arr.map(a => a.X));
    const min_x = Math.min(...arr.map(a => a.X));

    const max_Y = Math.max(...arr.map(a => a.Y));
    const min_y = Math.min(...arr.map(a => a.Y));

    const max_Z = Math.max(...arr.map(a => a.Z));
    const min_z = Math.min(...arr.map(a => a.Z));

    setValues({ max_X, min_x, max_Y, min_y, max_Z, min_z })
    // return {
    //   max_X, min_x, max_Y, min_y, max_Z, min_z
    // }
  }

  function handleChange(e) {
    setValues({ [e.target.name]: e.target.value })
  }

  function handleSubmit() {
  }


  console.log(values);

  return (
    <div>
      {step === 1 && (
        <Formik
          initialValues={initialValuesStep1}
          onSubmit={(data) => onsubmitfunction(data)}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="input">
                <TextField
                required
                label="project"
                  name="project"
                  value={values.project}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                />
              </div>
              <div className="input">
                <TextField
                required
                  label="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                />
              </div>
              <div className="input">
                <TextField
                required
                  label="client"
                  name="client"
                  value={values.client}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                />
              </div>
              <div className="input">
                <TextField
                required
                  label="contractor"
                  name="contractor"
                  value={values.contractor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          )}
        </Formik>
      )}
      {step === 2 && (
        <div>
          <div>{data.project}</div>
          <div>{data.description}</div>
          <div>{data.client}</div>
          <div>{data.contractor}</div>


          <div>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" onChange={
                showFile
              } style={{ display: "none" }} />
            </Button>
          </div>


          <Formik
            initialValues={initialValuesStep2}
            onSubmit={(data) => onsubmitfunction2(data)}
          >
            {/* {({ values, handleChange, handleBlur, handleSubmit }) => ( */}
            <form onSubmit={handleSubmit}>
              <div className="input">
                <TextField
                  label="max_X"
                  name="max_X"
                  value={values.max_X}
                  onChange={handleChange}
                  variant="outlined"
                // onBlur={handleBlur}
                />
              </div>
              <div className="input">
                <TextField
                  label="min_x"
                  name="min_x"
                  value={values.min_x}
                  onChange={handleChange}
                  variant="outlined"
                // onBlur={handleBlur}
                />
              </div>
              <div className="input">
                <TextField
                  label="max_Y"
                  name="max_Y"
                  value={values.max_Y}
                  onChange={handleChange}
                  variant="outlined"
                // onBlur={handleBlur}
                />
              </div>
              <div className="input">
                <TextField
                  label="min_y"
                  name="min_y"
                  value={values.min_y}
                  onChange={handleChange}
                  variant="outlined"
                // onBlur={handleBlur}
                />
              </div>
              <div className="input">
                <TextField
                  label="max_Z"
                  name="max_Z"
                  value={values.max_Z}
                  onChange={handleChange}
                  variant="outlined"
                // onBlur={handleBlur}
                />
              </div>
              <div className="input">
                <TextField
                  label="min_z"
                  name="min_z"
                  value={values.min_z}
                  onChange={handleChange}
                  variant="outlined"
                // onBlur={handleBlur}  
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
            {/* )} */}
          </Formik>


          {/* {
            items.map((item, i) => <div>
            <h6 key={i}>{item.KP}</h6>
            <h6 key={i}>{item.X}</h6>
            <h6 key={i}>{item.Y}</h6>
            <h6 key={i}>{item.Z}</h6>
            </div>
            )
          } */}
        </div>
      )}
    </div>
  );
};

export default Forms;
