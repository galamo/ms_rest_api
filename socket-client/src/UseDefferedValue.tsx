import { useState, useMemo } from "react";

export default function Products() {
  const [filter, setFilter] = useState("");

  function handler({ target }: { target: HTMLInputElement }) {
    setFilter(target.value);
  }

  return (
    <div>
      <input type="text" value={filter} onChange={handler} />
      <List input={filter} />
    </div>
  );
}

function List({ input }: { input: string }) {
  const size = 30000;
  const list = useMemo(() => {
    const temporaryList = [];
    for (let index = 0; index < size; index++) {
      temporaryList.push(<div key={index}>{input}</div>);
    }
    return temporaryList;
  }, [input]);

  return <div>{list}</div>;
}
