export default function Button({ text, type }) {
  return (
    <>
      <button className="btn w-100 my-3 rounded-4 text-white p-2 fw-semibold" style={{
        backgroundColor: "#7126B5",
        borderColor: "#7126B5",
        fontSize: "14px"
      }} type={type}>
        {text}
      </button>
    </>
  )
}