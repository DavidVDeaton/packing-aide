export default function Errors(props) {
    return (
      <div>
        <ul className="ul-padding-none">
          {props.errors.map((error) => {
            return <li className="error-warning">{error}</li>;
          })}
        </ul>
      </div>
    );
  }
  