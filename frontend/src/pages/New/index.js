import React, {useState, useMemo} from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg'

import './style.css';

export default function New({ history }){
    
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        }, [thumbnail]
    )

    async function handleSubmit(event){
        event.preventDefault();


        const data = new FormData();

        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard');
    }
    
    return(
        <form onSubmit = {handleSubmit}>

            <label id="thumbnail" 
                   style = {{ backgroundImage: `url(${preview})`}}
                   className={thumbnail ? 'has-thumb' : ''}
            >
                <input type = "file" onChange = {event => setThumbnail(event.target.files[0]) }/>
                <img src= {camera} alt = "select image" />
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                id= "company"
                placeholder="Sua empresa..."
                value= { company }
                onChange = {event => setCompany(event.target.value)}        
            />

            <label htmlFor="techs">TECHS * <span>(separadas por vírgula)</span></label>
            <input
                id= "techs"
                placeholder="Tecnologias..."
                value= { techs }
                onChange = {event => setTechs(event.target.value)}        
            />

            <label htmlFor="price">VAlOR DIÁRIA * <span>(Em branco para GRATUITO)</span></label>
            <input
                id= "price"
                placeholder="Preço..."
                value= { price }
                onChange = {event => setPrice(event.target.value)}        
            />

            <button type = "submit" className = "btn">Confirmar Cadastro</button>

        </form>
    )
}