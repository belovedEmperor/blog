export default function Header() {
  const EDIT_URL = import.meta.env.VITE_EDIT_URL;

  return (
    <div id="header">
      <nav>
        <a href="/">Home</a>
        {EDIT_URL && <a href={EDIT_URL}>Editor</a>}
      </nav>
    </div>
  );
}
