import { useState } from "react";
import palavras from "./palavras";


import forca0 from './assets/forca0.png'
import forca1 from './assets/forca1.png'
import forca2 from './assets/forca2.png'
import forca3 from './assets/forca3.png'
import forca4 from './assets/forca4.png'
import forca5 from './assets/forca5.png'
import forca6 from './assets/forca6.png'


export default function App() {
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    const [imagemForca, setImagemForca] = useState(forca0)
    const [desabilitaAlfabeto, setDesabilitaAlfabeto] = useState(true)
    const [palavra, setPalavra] = useState([])
    const [qtdErros, setQtdErros] = useState(0)
    const [letrasEscolhidas, setLetrasEscolhidas] = useState([])
    const [qtdPalpites, setQtdPalpites] = useState(0)

    

    function palpitaLetra(letra) {

        let letras = letrasEscolhidas
        letras.push(letra)
        setLetrasEscolhidas(letras)
        desabilitaBotaoLetra(letra)
        verificarPalpite(letra)
    }

    function verificarPalpite(letra){
        let acertou = false
        let erros = qtdErros
        let palpites = qtdPalpites
        palpites += 1
        setQtdPalpites(palpites)

        palavra.forEach((e, index) => {
            if ( removeAcento( e) === removeAcento( letra)) {
                document.querySelector(`span[data-index="${index}"]`).textContent = e
                acertou = true
            }
        })

        if (!acertou){
            erros +=1
            setQtdErros(erros)
            // console.log('qtdErros antes =', erros)
            atualizaImagemForca(erros)
        }

        const passouLimiteErros = jogoFinalizado(erros)
    }

    function jogoFinalizado(erros) {
        return erros === 6
    }

    function atualizaImagemForca(erros) {
        // console.log('qtdErros =', erros)
        switch (erros) {
            case 1: setImagemForca(forca1); break;
            case 2: setImagemForca(forca2); break;
            case 3: setImagemForca(forca3); break;
            case 4: setImagemForca(forca4); break;
            case 5: setImagemForca(forca5); break;
            case 6: setImagemForca(forca6); break;
            default: setImagemForca(forca0); break;
        }
    }



    function removeAcento(text) {
        text = text.toLowerCase();
        text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
        text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
        return text;
    }

    function desabilitaBotaoLetra(letra) {
        document.querySelector(`button[data-index="${letra}"]`).setAttribute('disabled', true)
    }


    function exibeLetraAlfabeto(letra) {

        return (
            <button className="btn-letra" disabled={desabilitaAlfabeto}  data-identifier="letter" data-index={letra} key={letra} onClick={() => palpitaLetra(letra)}>           
                {letra}
            </button>
        )
    }

    function exibirLetras(index) {
        return (
            <span key={index} data-index={index} className="letra">___</span>
        )
    }

    function reiniciaJogo() {
        setDesabilitaAlfabeto(false)
        setQtdErros(0)
        sortearPalavra()
    }

    function sortearPalavra() {
        const index = Math.floor(Math.random() * (palavras.length));        
        console.log('Palavra Sorteada', palavras[index])

        setPalavra(Array.from(palavras[index]))
    }


    return (
        <div className="cenario">
            <div className="area-forca">
                <div className="imagem-forca">
                    <img src={imagemForca} alt="" data-identifier="game-image" />
                </div>

                <div className="area-palavra">
                    <div >
                        <button className="btn-escolher-palavra" onClick={reiniciaJogo}>Escolher Palavra</button>
                    </div>
                    <div>
                        {palavra.map((p, index) => exibirLetras(index))}
                    </div>
                </div>

            </div>
            <div className="area-alfabeto">
                {alfabeto.map((a) => exibeLetraAlfabeto(a))}

            </div>
            <div className="area-input">
                <div>Já sei a palavra!</div>
                <div><input disabled={desabilitaAlfabeto} /></div>
                <div><button className="btn-chutar" disabled={desabilitaAlfabeto}>Chutar</button></div>

            </div>


        </div>
    )


}