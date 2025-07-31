export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "",
  };
  return (
    <button onClick={props.hold} style={styles} className="die-button">
      {props.value}
    </button>
  );
}
