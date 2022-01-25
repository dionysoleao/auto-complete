import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete , { createFilterOptions } from "@material-ui/lab/Autocomplete";
import styles from './styles.module.css'



export default function Busca() {

  const [inputValue1, setInputValue1] = useState("");
  const [artesaos, setArtesaos] = useState([]);
  const [searchType,setSearchType] = useState("Person")

  function search(inputValue1){

    if(inputValue1 !== ""){
    var myHeaders = new Headers();
    
    myHeaders.append("Authorization", "Basic ZGlvbnlzb2xlYW9AZ21haWwuY29tOjEyMzQ1Ng==");
    console.log(inputValue1)
    fetch("https://cors-anywhere.herokuapp.com/https://artesanato.plano-b.com/api/1.0/search/"+inputValue1+"?types="+searchType, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      })
    .then(response => response.json())
    .then(data => setArtesaos(data))
  }}
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    limit:6
  });


  return (
    <>
    <div className={styles.container}>
     <Autocomplete
        className={styles.autoFill}
        inputValue={inputValue1}
        onInputChange={(e) => {setInputValue1(event.target.value);search(event.target.value) }}
        open={inputValue1.length >= 1}
        options={artesaos}
        getOptionLabel={(option) => option['@name']}
        style={{ width: 300 }}
        filterOptions={filterOptions}
        renderInput={(params) => (
          <TextField {...params} label="Busca" variant="standard" />
        )}
      />

         
      <select value={searchType} onChange={ e => {setSearchType(e.target.value);search(inputValue1)}}>
        <option value="Person">Artesãos</option>
        <option value="Neighborhood">Povoados</option>
        <option value="Material">Materiais</option>
      </select>
      
      </div>
      <div className={styles.getBack}><h1>inputValue1: {inputValue1}</h1></div>
      </>


  );
}