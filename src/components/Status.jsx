export default function Status({ title, message }) {
  return (
    <div className="status">
      <div className="status__title">{title}</div>
      {message ? <div className="status__msg">{message}</div> : null}
    </div>
  )
}
