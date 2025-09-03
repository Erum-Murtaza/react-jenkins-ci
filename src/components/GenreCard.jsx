import "./GenreCard.css";

function GenreCard({ title, items = [], onEdit }) {
  // Split items into alternating columns
  const column1 = items.filter((_, index) => index % 2 === 0);
  const column2 = items.filter((_, index) => index % 2 === 1);

  return (
    <div className="genre-card">
      <div className="card-header">
        <h2>{title}</h2>
        <button onClick={onEdit} className="action-btn edit">
          Edit
        </button>
      </div>
      <div className="two-column-layout">
        <ul className="subgenre-list">
          {column1.map((item, i) => (
            <li key={i} className="subgenre-item">
              {item}
            </li>
          ))}
        </ul>
        <ul className="subgenre-list">
          {column2.map((item, i) => (
            <li key={i + column1.length} className="subgenre-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GenreCard;