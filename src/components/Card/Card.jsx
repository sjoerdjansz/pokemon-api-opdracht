import "./Card.css";

export function Card({ title, image, moves, weight, abilities }) {
  return (
    <article className="card">
      <div className="card-header">
        <h3>{title}</h3>
        <img src={image} alt={`Image of pokemon ${title}`} />
      </div>
      <div className="card-main">
        <p>
          Moves: <span>{moves}</span>
        </p>
        <p>
          Weight: <span>{weight}</span>
        </p>
      </div>
      <div className="card-footer">
        <p>Abilities</p>
        <ul className="abilities">
          {abilities.map((ability) => {
            return <li key={Math.random()}>{ability.ability.name}</li>;
          })}
        </ul>
      </div>
    </article>
  );
}
