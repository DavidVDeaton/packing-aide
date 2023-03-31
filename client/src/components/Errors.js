export default function Errors(props) {
    return (
      <div>
        <ul>
          {props.errors.map((error) => {
            return <li>{error}</li>;
          })}
        </ul>
      </div>
    );
  }
  