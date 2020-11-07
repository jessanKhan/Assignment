import React, { useState } from "react";
import {Formik} from 'formik'
import {TextField, Button} from '@material-ui/core'

const initialValues={
  project:"project",
  description:"description",
  client:"client",
  contractor:'contractor'
}

const Forms = (props) => {



    const [data,setData] =useState();
    // const [description,setDescription]=useState('');
    // const [client,setClient]=useState('');
    // const [contractor,setContractor]=useState('');
    const [step,setStep]=useState(1)

   const  onsubmitfunction=(formData)=>{
       console.log("e.target.value",formData)
       setData(formData)
       setStep(2)

   }


  return (
    <div> 
       {step ==1 && <Formik
       initialValues={initialValues}
       onSubmit={data=>onsubmitfunction(data)}>
{({values,handleChange,handleBlur,handleSubmit})=>(
  <form onSubmit={handleSubmit}>
    <div>
    <TextField name="project" 
    value={values.project} 
    onChange={handleChange} 
    onBlur={handleBlur} />
    </div><div>
    <TextField name="description" 
    value={values.description} 
    onChange={handleChange} 
    onBlur={handleBlur} />
    </div>
    <div>
    <TextField name="client" 
    value={values.client} 
    onChange={handleChange} 
    onBlur={handleBlur} />
    </div>
    <div>
    <TextField name="contractor" 
    value={values.contractor} 
    onChange={handleChange} 
    onBlur={handleBlur} />
    </div>
    <Button type="submit" >Submit</Button>
  </form>
)}


       </Formik>}
        { step ===2 &&
       <div>
         <div>{data.project}</div>
         <div>{data.description}</div>
         <div>{data.client}</div>
         <div>{data.contractor}</div>
       </div>
       }
    </div>
  );
};

export default Forms;
