import { InputHTMLAttributes } from "react";
import styles from "./style.module.scss";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  copyableValue?: string;
}

function CopyableInput({ copyableValue, ...props }: IProps) {
  const serializatedCopyableValue = String(copyableValue ?? props.value);

  function copyToClipboard() {
    navigator.clipboard.writeText(serializatedCopyableValue).then(() => {
      alert(`"${copyableValue}" copiado para a área de transferência!`);
    });
  }

  return (
    <input
      {...props}
      className={styles.input}
      onDoubleClick={copyToClipboard}
    />
  );
}

export default CopyableInput;
