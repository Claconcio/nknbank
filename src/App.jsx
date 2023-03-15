import React,{ useEffect, useState } from 'react';
import './App.css';
import InputMask from 'react-input-mask'

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [pass, setPass] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [Posload, setPosload] = useState(true);

  const HandleSaveData = (e) => {
    fetch('http://localhost/api/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        date,
        email,
        pass,
        whatsapp,
      })
    })
    .then(() => {
      setPosload(false)
    })
    .catch(error => console.error(error));

    e.preventDefault()
  }

  const HandleRedirect = () => {
    if (Posload === false) {
      setTimeout(() => {
        window.location.href = 'https://nknbank.com.br'
      }, 5000)
    }
  }

  useEffect(() => {
    HandleRedirect()
  },[ Posload ])

  return (
    <div className="App">
      <header className={`App-header ${Posload ? '' : 'posted'}`}>
        <form className="App-header-form"  onSubmit={(e) => HandleSaveData(e)}>

          <img 
            src="https://nknbank.com.br/assets/images/7.jpeg" 
            alt="Logo NkN"
            className="App-header-img"
          />

        {
        Posload
          ? (
            <>
              <label className="App-header-form-label">
                  Nome*
                  <input 
                    type="text" 
                    onChange={(e) => setName(e.target.value)}
                    className="App-header-form-input"
                    required
                  />  
                </label>

                <label className="App-header-form-label">
                  Data De Nascimento*
                  <input 
                    type="date" 
                    onChange={(e) => setDate(e.target.value)}
                    className="App-header-form-input"
                    required
                  />  
                </label>

                
                <label className="App-header-form-label">
                  E-mail*
                  <input 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    className="App-header-form-input"
                    required
                  />  
                </label>

                <label className="App-header-form-label">
                  Senha*
                  <input 
                    type="password" 
                    onChange={(e) => setPass(e.target.value)}
                    className="App-header-form-input"
                    required
                  />  
                </label>
                    
                <label className="App-header-form-label">
                  Whatsapp
                  <InputMask 
                    mask="(99) 99999-9999" 
                    type="tel" 
                    className="App-header-form-input"
                    onChange={(e) => setWhatsapp(e.target.value)} />
                </label>
                    
                <input type="submit" className="custom-btn App-header-form-btn"/>      
            </>
            )
          : (
            <>
              <h2 className="App-header-form-tt-ok">Obrigado por se cadastrar</h2>
              <p className="App-header-form-text-ok">Você será redirecionado para nosso site em 5 segundos</p>
            </>
          ) 
        }
        </form>
      </header>
    </div>
  );
}

export default App;
