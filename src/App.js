import './App.css';
import React from 'react';
import $ from "jquery";

function App() {

    const URLAPI = "https://pokeapi.co/api/v2/pokemon/"

    const [pokemon, setPokemon] = React.useState(null)
    const [loading, setLoading] = React.useState(false);

    const onSubmitSearch = (e) =>{
        e.preventDefault()
        setLoading(true);
        let data = new FormData(e.target)
        let value = Object.fromEntries(data)
        getPokemon(value.q)
            .then(res =>{
                console.log(res)
                setPokemon(res)
                stopLoading()
            })
            .catch(err => {
                console.error(err)
                setPokemon(null)
                stopLoading()
            })
    }

    const stopLoading = () =>{
        setTimeout(()=>setLoading(false), 1200)
    }

    const getPokemon = (name) =>{
        return $.ajax({
            url: URLAPI+name,
            type: "GET"
        })
    }

    return (
        <form onSubmit={onSubmitSearch} className='d-flex justify-content-center align-items-center flex-column vh-100 bg-danger'>

            <h1 className='text-warning font-weight-bold'>
                Pokesearch
            </h1>

            <div>
                <input type="search" name="q" className="form-control"  placeholder='Escribe un pokemon' />
            </div>
            
            {
                loading &&
                    <div className="lds-hourglass"></div>
            }

            {
                !loading &&
                    <div className='d-flex justify-content-center align-items-center flex-column'>
                        <button className='btn btn-block btn-info my-3'>
                            Buscar
                        </button>

                        {
                            pokemon !== null &&
                                <>
                                    <img src={pokemon.sprites.front_default} className="img-fluid my-4"/>
                                    <p>{pokemon.name}</p>
                                    <ul>

                                        {
                                            pokemon.abilities.map((value, index)=> {
                                                return <li key={index}>{value.ability.name}</li>
                                            })
                                        }

                                    </ul>
                                </>
                        }
                    </div>
            }


        </form>
    );
}

export default App;
