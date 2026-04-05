export default function LoginForm(){
    return (
        <>

        <form className="flex flex-col border-2 border-amber-50 rounded-2xl mt-32">

            <label className="text-white">username: </label>
              <input type="text" className="border-b-2 border-amber-950"></input>

            <label className="text-white">password: </label>
            <input type="password" className="border-b-2 border-amber-950"></input>
        </form>



        <button className="text-black bg-white w-full rounded-3xl  py-6 cursor-pointer mt-11">Login</button>
    </>
    )
}