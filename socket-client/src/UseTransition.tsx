import { useState, useMemo, useTransition } from "react";
const generateNumbers = () => {
  const size = 30000;

  const temporaryList = [];
  const first3Numbers = Math.ceil(Math.random() * 999);
  for (let index = 0; index < size; index++) {
    temporaryList.push(`${first3Numbers}${Math.ceil(Math.random() * 99999)}`);
  }
  return temporaryList;
};
export default function ProductsTransition() {
  const [numbersList, setNumbersList] = useState(generateNumbers());
  const [filter, setFilter] = useState("");
  const [isPending, startTransition] = useTransition();

  function handler({ target }: { target: HTMLInputElement }) {
    startTransition(() => {
      setFilter(target.value);
    });
  }
  const filteredNumbers = filter
    ? numbersList.filter((n) => n.includes(filter))
    : numbersList;
  return (
    <div>
      <input type="text" value={filter} onChange={handler} />
      <div style={{ margin: "10px", minHeight: "20px" }}>
        {isPending && "UPDATING UI..."}
      </div>
      {filteredNumbers.map((num, index) => {
        return <div key={num + index}>{num}</div>;
      })}
    </div>
  );
}
