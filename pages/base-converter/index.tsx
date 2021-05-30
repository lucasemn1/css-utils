// React
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";

// Components
import CopyableInput from "../../components/copyable-input";

// Styles
import styles from "./style.module.scss";

function BaseConverter() {
  const [values, setValues] = useState([null, null, null, null]);
  const [resultIndex, setResultIndex] = useState(3);
  const [result, setResult] = useState(null);

  useEffect(findInputResult, [values]);

  useEffect(() => {
    const totalFilledFields = values.filter((value) => value).length;

    if (totalFilledFields >= 3) {
      calculate();
    }
  }, [resultIndex, values]);

  function findInputResult() {
    const totalFilledFields = values.filter((value) => value).length;

    if (totalFilledFields === 3) {
      values.forEach((value, index) => {
        if (!value) {
          setResultIndex(index);
        }
      });
    }
  }

  function calculate() {
    const [a, b, c, d] = values;

    const equations = [
      () => (b * c) / d,
      () => (a * d) / c,
      () => (a * d) / b,
      () => (b * c) / a,
    ];

    setResult(equations[resultIndex]());
  }

  function formatCopyableValue(value: number, index: number) {
    return `${(index === resultIndex ? result : value) ?? ""}${
      index % 2 === 0 ? "px" : "rem"
    }`;
  }

  function renderInputs() {
    const valuesCopy = [...values];

    return valuesCopy.map((value, inputIndex) => (
      <CopyableInput
        key={inputIndex}
        type="number"
        value={(inputIndex === resultIndex ? result : value) ?? ""}
        copyableValue={formatCopyableValue(value, inputIndex)}
        placeholder={inputIndex === resultIndex ? "X" : ""}
        onChange={(e) => {
          const value = Number(e.target.value);
          valuesCopy[inputIndex] = value !== 0 ? value : null;
          setValues(valuesCopy);
        }}
        style={
          inputIndex === resultIndex
            ? {
                color: "#14ea6a",
              }
            : {}
        }
      />
    ));
  }

  return (
    <div className={`page ${styles.page}`}>
      <header className={styles.titleArea}>
        <h1>CSS Utils</h1>
        <h1>Conversor de bases</h1>
      </header>

      <main>
        <form className={styles.form}>
          <h3>PX</h3>
          <h3>REM</h3>

          {renderInputs()}
        </form>
      </main>

      <footer className={styles.footer}>
        <h2>Developed by</h2>

        <a target="_blank" href="https://github.com/lucasemn1">
          <img src="/assets/icons/github.svg" alt="Ícone do Github." />
          <h2>lucasemn1</h2>
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps<any> = async () => {
  return {
    props: {},
    revalidate: 1440,
  };
};

export default BaseConverter;
