import  axios  from 'axios';
import React, { useState } from 'react';
import SignInForm from './SignInForm';

const SignUpForm = ()   => {
    const [formSumit, setFormSumit] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async(e)=>{
        e.preventDefault();
        const terms = document.getElementById('terms');
        const pseudoErrorr = document.querySelector('.pseudo.error');
        const emailError = document.querySelector('.email.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        const passwordError = document.querySelector('.password.error');
        const termsError = document.querySelector('.terms.error');

        passwordConfirmError.innerHTML = '';
        termsError.innerHTML = '';
        if(password!== controlPassword|| !terms.checked ){
            if(password!==controlPassword)
                passwordConfirmError.innerHTML = "Les mot de passe ne correspondesnt pas";
            if(!terms.checked)
                termsError.innerHTML = "Veuillez valider les conditions gérales ";
        }else{
            await axios({
                method:'post',
                url:`${process.env.REACT_APP_API_URL}api/user/register`,
                withCredentials:true,
                data:{
                    pseudo,
                    email,
                    password
                }
            })
            .then((res)=>{
                console.log(res)
                if(res.data.errors){
                    pseudoErrorr.innerHTML = res.data.errors.pseudo;
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                }else{
                    setFormSumit(true);
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }

    }
    return (
        <>
        {formSumit?(
            <>
            <SignInForm/>
            <span></span>
            <h4 className='success'>Enregistrement réussi veullez vous connectez</h4>
            </>
            ):(

                <form action='' onSubmit={handleRegister} id="sign-up-form">
                <label htmlFor='pseudo'>Pseudo</label>
                <br/>
                <input type='text' name='pseudo' id='pseudo' 
                onChange={(e)=>setPseudo(e.target.value)} 
                value={pseudo} />
                <div className='pseudo error'></div>
                <br/>
                <label htmlFor='email'>Email</label>
                <br/>
                <input type='text' name='email' id='email' 
                onChange={(e)=>setEmail(e.target.value)} 
                value={email} />
                <div className='email error'></div>
                <br/>
                <br/>
                <label htmlFor='password'>Mot de passe</label>
                <br/>
                <input type='password' name='password' id='password' 
                onChange={(e)=>setPassword(e.target.value)} 
                value={password} />
                <div className='password error'></div>
                <br/>
                <br/>
                <label htmlFor='password-conf'>Confirmer mot de passe</label>
                <br/>
                <input type='password' name='password' id='password-conf' 
                onChange={(e)=>setControlPassword(e.target.value)} 
                value={controlPassword} />
                <div className='password-confirm error'></div>
                <br/>
                <input type='checkbox' id='terms' />
                <label htmlFor='terms'>j'accepte les<a href='/' target='_blank' 
                rel='noopener noreferrer'>conditions générales</a></label>
                <div className='terms error'></div>
                <br/>
                <input type='submit' value='Valider inscription' />
                </form>
                )}
        </>
        );
};

export default SignUpForm;