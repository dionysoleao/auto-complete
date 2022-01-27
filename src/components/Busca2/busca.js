import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useIsTyping } from "use-is-typing";

export default function Busca() {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [searchType, setSearchType] = useState("Person");
  const [tags, setTags] = useState([]);
  const [isTyping, register] = useIsTyping();

  useEffect(() => {
    isTyping ? "" : search(searchInputValue);
  }, [searchInputValue, searchType, isTyping]);

  function search(searchInputValue) {
    if (searchInputValue !== "") {
      var myHeaders = new Headers();

      myHeaders.append(
        "Authorization",
        "Basic ZGlvbnlzb2xlYW9AZ21haWwuY29tOjEyMzQ1Ng=="
      );

      console.log(searchInputValue);

      fetch(
        "https://cors-anywhere.herokuapp.com/https://artesanato.plano-b.com/api/1.0/search/" +
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
        .then((data) => setSearchList(data));
    }
  }

  return (
    <>
      <h1>Busca com Tags</h1>
      <a href="./">busca múltipla</a>
      <div className={styles.busca}>
        <input
          className={styles.busca__campo}
          onInput={(e) => setSearchInputValue(e.target.value)}
          type="text"
          ref={register}
        />

        <select
          className={styles.busca__seletorTipo}
          onChange={(e) => {
            setSearchType(e.target.value);
          }}
          defaultValue="Person"
        >
          <option value="Person">Artesãos</option>
          <option value="Neighborhood">Povoados</option>
          <option value="Material">Materiais</option>
        </select>

        <div className={styles.busca__tags}>
          {tags.map((tag) => (
            <div className={styles.busca__tags__tag}>
              {tag}
              <div
                onClick={() => {
                  setTags(tags.filter((t) => t !== tag));
                }}
                className={styles.busca__tags__removeTag}
              >
                -
              </div>
            </div>
          ))}
        </div>

        <div className={styles.busca__resultados}>
          {searchList.map((searchResult) => (
            <div className={styles.busca__resultado}>
              {searchResult["@name"]}
              {searchType !== "Person" ? (
                <div
                  onClick={() => {
                    setTags([...tags, searchResult["@name"]]);
                  }}
                  className={styles.busca__resultado__adicionaTag}
                >
                  +
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
