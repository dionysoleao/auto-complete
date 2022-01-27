import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useIsTyping } from "use-is-typing";

export default function Busca() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [personSearchList, setPersonSearchList] = useState([]);
  const [neighborhoodSearchList, setNeighborhoodSearchList] = useState([]);
  const [materialSearchList, setMaterialSearchList] = useState([]);
  const [searchType, setSearchType] = useState("Person");
  const [isSearchingPerson,setIsSearchingPerson] = useState(false)
  const [isSearchingNeighborhood,setIsSearchingNeighborhood] = useState(false)
  const [isSearchingMaterial,setIsSearchingMaterial] = useState(false)
  const [isTyping1, register1] = useIsTyping();
  const [isTyping2, register2] = useIsTyping();
  const [isTyping3, register3] = useIsTyping();

  useEffect(() => {
    isTyping1 || isTyping2 || isTyping3 ? "" : search(searchInputValue,searchType);
  }, [searchInputValue, searchType, isTyping1, isTyping2, isTyping3]);

  function search(searchInputValue, searchType) {
    if (searchInputValue !== "") {
      var myHeaders = new Headers();

      myHeaders.append(
        "api-key",
        "85532ccb-5b93-4484-a9e4-053b791c32e6"
      );

      console.log(searchInputValue);

      fetch(
        "https://artesanato.plano-b.com/api/1.0/search/" +
          searchInputValue +
          "?types=" +
          searchType,
        {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (searchType == "Person"){
            setPersonSearchList(data)
          } else if (searchType == "Neighborhood"){
            setNeighborhoodSearchList(data)
          } else if (searchType == "Material"){
            setMaterialSearchList(data)
          }
        });
    }
  }

  return (
    <>
      <h1>Busca Múltipla</h1>
      <a href="./nova">busca com tags</a>
      <div className={styles.busca__groupContainer}>
        <div className={styles.busca}>
          <input
            placeholder="Artesãos"
            className={styles.busca__campo}
            onInput={(e) => {setSearchInputValue(e.target.value);setSearchType("Person")}}
            type="text"
            ref={register1}
            autoComplete="off"
            onFocus={() => setIsSearchingPerson(true)}
            onBlur={(e) => {setIsSearchingPerson(false); setSearchInputValue(""); e.target.value = ""; setPersonSearchList([])}}
          />

          <div className={styles.busca__resultados}>
            {isSearchingPerson? personSearchList.map((searchResult) => (
              <div className={styles.busca__resultado}>
                {searchResult["@name"]}
              </div>
            )):""}
          </div>
        </div>
        <div className={styles.busca}>
          <input
            placeholder="Povoados"
            className={styles.busca__campo}
            onInput={(e) => {setSearchType("Neighborhood");setSearchInputValue(e.target.value);}}
            type="text"
            ref={register2}
            autoComplete="off"
            onFocus={() => setIsSearchingNeighborhood(true)}
            onBlur={(e) => {setIsSearchingNeighborhood(false); setSearchInputValue(""); e.target.value = ""; setPersonSearchList([])}}
          />

          <div className={styles.busca__resultados}>
            {isSearchingNeighborhood? neighborhoodSearchList.map((searchResult) => (
              <div className={styles.busca__resultado}>
                {searchResult["@name"]}
              </div>
            )):""}
          </div>
        </div>

        <div className={styles.busca}>
          <input
            placeholder="Materiais"
            className={styles.busca__campo}
            onInput={(e) => {setSearchType("Material");setSearchInputValue(e.target.value);}}
            type="text"
            ref={register3}
            autoComplete="off"
            onFocus={() => setIsSearchingMaterial(true)}
            onBlur={(e) => {setIsSearchingMaterial(false); setSearchInputValue(""); e.target.value = ""; setPersonSearchList([])}}
          />

          <div className={styles.busca__resultados}>
            {isSearchingMaterial? materialSearchList.map((searchResult) => (
              <div className={styles.busca__resultado}>
                {searchResult["@name"]}
              </div>
            )):""}
        </div>
          
        </div>
      </div>
      
    </>
  );
}
