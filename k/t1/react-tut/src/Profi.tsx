const user = {
  name: 'Germo Tael',
  email: "ge****a@tlu.ee",
  hobbys: ["Gaming", "Reading", "Anime"],
};

export default function Profi() {
  return (
    <>
      <div className="flex justify-center content-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl">{user.name}</h1>
          <p>email: {user.email}</p>
          <ul className="list-disc">
            {user.hobbys.map(hobby => <li key={hobby}>{hobby}</li>)}
          </ul>
          <input type="text" className="text-black" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Learn More
          </button>
        </div>
      </div>
    </>
  );
}
