import { Button, Column, Input, Logo, Links, Padding } from "../../components";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import Context from "../Context";
import { BASE_URL } from "../../constants/url.js";



export default function Login() {
  const [password, setPassWord] = useState("");
  const [ra, setRa] = useState("");
  const localStorage = window.localStorage;
  const navigate = useNavigate();
  const { setLogin } = useContext(Context);
  const url = `${BASE_URL}/sign-up`
  function login (e) {
    e.preventDefault()
    if(ra.length!==6 ){
      alert("Ra tem que ter 6 dígitos")
      return
    }
    if( password.length < 4){
      alert("Senha tem que ter no mínimo 4 dígitos")
      return
    }
    const promisse = axios.post(url, {
      ra: `${ra}`,
      password: `${password}`,
    })
    promisse.then((dados)=>{
      console.log("sucesso", dados.data)
      console.log(dados)
      setLogin(dados.data.token, "dados aquiii")
      localStorage.setItem('token', dados.data.token);
      navigate("/menu")
    })
    promisse.catch((err)=>{
      console.log(err.response.data)
      alert(err.response.data.message)
    })
  }
  return (
    <Column>
      <Padding size="huge" />
      <Logo width={"180px"} height={"178.38px"} />
      <Padding size="big" />
      <form onSubmit={login}>
      <Input placeholder="ra" 
      type="number" 
      value={ra}
      onChange={(e) => setRa(e.target.value)}
      />
      <Padding />
      <Input 
      placeholder="senha"
       type="password"
       value={password}
        onChange={(e) => setPassWord(e.target.value)}
       />
      <Padding />
      <Button text="Entrar" />
      </form>
      <Padding size="big" />
      <Link to="/registration"> 
     <Links text="Não tem uma conta? Cadastre-se!" />
     </Link>
    </Column>
  );
}