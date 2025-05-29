import React, { use } from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import editlogo from "/icons/Edit.mp4"
import eyelogo from "/icons/eye.svg"
import eyecrosslogo from "/icons/eyecross.svg"
import deletelogo from "/icons/Delete.svg"

import copylogo from "/icons/copy.mp4"

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getpasswords = async()=>{
    let req = await fetch ("http://localhost:3000/")
     let passwords = await req.json()
     setPasswordArray(passwords)


  }

  useEffect(() => {
    getpasswords()
    
  }, []);
  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast(" copied to clipboard!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      alert("Failed to copy. Clipboard access may be blocked.");
      console.error(err);
    }
  };

  const eyeref = useRef();
  const passwordref = useRef();
  const showpassword = () => {
    if (eyeref.current.src.includes(eyecrosslogo)) {
      passwordref.current.type = "text";
      eyeref.current.src = eyelogo;
    } else {
      passwordref.current.type = "password";
      eyeref.current.src = eyecrosslogo;
    }
  };
  const savePassword = async() => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length>3){
      toast('saved successfully', {
 position: "top-right",
 autoClose: 5000,
 hideProgressBar: false,
 closeOnClick: false,
 pauseOnHover: true,
 draggable: true,
 progress: undefined,
 theme: "dark",
 });
     

     await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

     setPasswordArray([...passwordArray, {...form, id:uuidv4()}]);


     let res = await fetch("http://localhost:3000/", {method:'POST',
      headers: {
          'Content-Type': 'application/json'
        },

         body: JSON.stringify({...form, id: uuidv4()})
         
     }
      )

      setForm({site:"", username:"", password:""})
      const result = await res.text()
      console.log (result)

    }

    else{
        toast('error:password not saved',{
          theme:"dark"
        })

    }
  };
  const Deletepassword = async (id) => {
    let c = confirm("do you want to delete it?");
    if (c) {
      toast(" Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      //   localStorage.setItem(
        //     "passwords",
        //     JSON.stringify(passwordArray.filter((item) => item.id != id))
        //   );
        
        
        setPasswordArray(passwordArray.filter(item => item.id !== id));
        let res = await fetch("http://localhost:3000/", {method:'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          
          body: JSON.stringify({id})
          
        }
      )
    }
    console.log("deleting password with id =>", id);
  };

  const Editpassword = (id) => {
    setForm({...passwordArray.filter(i => i.id === id)[0], id:id});
    setPasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="container mx-auto bg-slate-50 max-w-2xl mt-1 flex flex-col">
        <h1 className="text-2xl font-bold text-center">
          <span className="text-green-300"> &lt;</span>
          Pass
          <span className="text-green-300 ml-1">OP /&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password manager
        </p>

        <div className="text-white flex flex-col p-4">
          <input
            placeholder="Enter your Url"
            value={form.site}
            onChange={handlechange}
            className="pl-2 rounded-full text-black border border-green-500 w-full"
            type="text"
            name="site"
            id=""
          />
        </div>
        <div className="text-white flex gap-1 p-4 relative">
          <input
            placeholder="Enter your Username"
            value={form.username}
            onChange={handlechange}
            className=" pl-2 rounded-full text-black border border-green-500 w-full"
            type="text"
            name="username"
            id=""
          />

          <input
            ref={passwordref}
            placeholder="Enter your Password"
            value={form.password}
            onChange={handlechange}
            className="pl-2 rounded-full text-black border border-green-500 w-[45%]"
            type="password"
            name="password"
            id=""
          />
          <span
            className="text-red-500 absolute right-5 cursor-pointer"
            onClick={showpassword}
          >
            <img ref={eyeref} src={eyelogo} alt="" />
          </span>
        </div>

        <button
          onClick={savePassword}
          className="mx-auto rounded-full hover:bg-slate-300 w-auto p-2 flex items-center"
        >
          <lord-icon
            src="https://cdn.lordicon.com/efxgwrkc.json"
            trigger="loop"
            delay="0"
            state="loop"
          ></lord-icon>
          Add Password
        </button>

        <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
        {passwordArray.length === 0 && <div> No password to show </div>}
        {passwordArray.length != 0 && (
          <table className="table-auto bg-green-50 w-full rounded-md overflow-hidden">
            <thead className="bg-green-200">
              <tr>
                <th>Site</th>
                <th>Username</th>
                <th>Passwords</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwordArray.map((item, index) => {
                return (
                  <tr className="" key={index}>
                    <td className="flex justify-center items-center gap-4 mb-4">
                      <a href={item.site} target="_blank">
                        {item.site}
                      </a>
                      <img
                        className="w-8 cursor-pointer"
                        onClick={() => copyText(item.site)}
                        src= {copylogo}
                        alt=""
                      />
                    </td>
                    <td className="">
                      <div className="flex justify-center items-center gap-2">
                        {item.username}

                        <img
                          className="w-8 cursor-pointer"
                          onClick={() => copyText(item.username)}
                          src={copylogo}
                          alt=""
                        />
                      </div>
                    </td>
                    <td className="flex justify-center items-center gap-2">
                      {item.password}
                      <img
                        className="w-8 cursor-pointer"
                        onClick={() => copyText(item.password)}
                        src={copylogo}
                        alt=""
                      />
                    </td>
                    <td className="">
                      <div className="flex gap-2 justify-center items-center">
                        <span
                          className="cursor-pointer"
                          onClick={() => Deletepassword(item.id)}
                        >
                          <img className="w-6" src={deletelogo} alt="" />
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => Editpassword(item.id)}
                        >
                          <img className="w-8 " src={editlogo} alt="" />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;
