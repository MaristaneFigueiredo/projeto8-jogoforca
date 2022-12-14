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
    const [chute, setChute] = useState('')



    function palpitaLetra(letra) {

        let letras = letrasEscolhidas
        letras.push(letra)
        setLetrasEscolhidas(letras)
        desabilitaBotaoLetra(letra)
        verificarPalpite(letra)
    }

    function reiniciaJogo() {
        setDesabilitaAlfabeto(false)
        setQtdErros(0)
        sortearPalavra()
        setQtdPalpites(0)
        setImagemForca(forca0)
        apagaResposta()
        setLetrasEscolhidas([])
        setChute("")
        
    }

    function verificarPalpite(letra) {
        let acertou = false
        let erros = qtdErros
        let palpites = qtdPalpites
        palpites += 1
        setQtdPalpites(palpites)

        palavra.forEach((e, index) => {
            if (removeAcento(e) === removeAcento(letra)) {
                document.querySelector(`span[data-index="${index}"]`).textContent = e
                acertou = true
            }
        })

        if (!acertou) {
            erros += 1
            setQtdErros(erros)
            // console.log('qtdErros antes =', erros)
            atualizaImagemForca(erros)
        }

        const passouLimiteErros = jogoFinalizado(erros)
        const usuarioGanhou = usuarioVenceu()
        const fimdeJogo = passouLimiteErros || usuarioGanhou

        setDesabilitaAlfabeto(fimdeJogo)

        if (fimdeJogo && usuarioGanhou) {
            exibePalavraVerde()
        }
        else if (fimdeJogo && !usuarioGanhou) {
            exibePalavraVermelho()
        }
    }

    function usuarioVenceu() {
        const palpites = letrasEscolhidas
        const palavraSemAcento = removeAcento(palavra.join(''))
        const palpitesCertos = palpites.filter((p) => {
            if (palavraSemAcento.indexOf(removeAcento(p)) !== -1)
                return p
        })

        const letrasPalavra = new Set(palavraSemAcento)
        return palpitesCertos.length === letrasPalavra.size
    }

    function jogoFinalizado(erros) {
        return erros === 6
    }

    
    
    function apagaResposta() {
        document.querySelector('.letra-verde').classList.add('escondido')
        document.querySelector('.letra-vermelha').classList.add('escondido')
        exibirPalavraEscondida()
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
        text = text.replace(new RegExp('[????????]', 'gi'), 'a');
        text = text.replace(new RegExp('[??????]', 'gi'), 'e');
        text = text.replace(new RegExp('[??????]', 'gi'), 'i');
        text = text.replace(new RegExp('[????????]', 'gi'), 'o');
        text = text.replace(new RegExp('[??????]', 'gi'), 'u');
        text = text.replace(new RegExp('[??]', 'gi'), 'c');
        return text;
    }

    function desabilitaBotaoLetra(letra) {
        document.querySelector(`button[data-index="${letra}"]`).setAttribute('disabled', true)
    }


    function exibeLetraAlfabeto(letra) {

        return (
            <button className="btn-letra" disabled={desabilitaAlfabeto} data-identifier="letter" data-index={letra} key={letra} onClick={() => palpitaLetra(letra)}>
                {letra}
            </button>
        )
    }




   
    function chutarPalavra() {
        let palavraNew = removeAcento(palavra.join(''))
        palavraNew = palavraNew.toUpperCase()
        const acertouChute = palavraNew === removeAcento(chute).toUpperCase()
        setDesabilitaAlfabeto(true)

        if (acertouChute) {
            exibePalavraVerde()
        }
        else {
            exibePalavraVermelho()
            atualizaImagemForca(6)
        }

    }

    function exibePalavraVerde() {
        document.querySelectorAll('.letra').forEach(e => e.classList.add('escondido'))
        document.querySelector('.letra-verde').classList.remove('escondido')
        document.querySelector('.letra-vermelha').classList.add('escondido')
    }

    function exibePalavraVermelho() {
        document.querySelector('.letra-verde').classList.add('escondido')
        document.querySelector('.letra-vermelha').classList.remove('escondido')
        document.querySelectorAll('.letra').forEach(e => e.classList.add('escondido'))
    }

    function exibirPalavraEscondida() {
        document.querySelectorAll('.letra').forEach(e => {
            e.classList.remove('escondido')
            e.innerText = '__'
        })
    }

    function exibirLetras(index) {
        return (
            <span key={index} data-index={index} className="letra">___</span>
        )
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
                        <button data-identifier="choose-word" className="btn-escolher-palavra" onClick={reiniciaJogo}>Escolher Palavra</button>
                    </div>
                    <div data-identifier="word">
                        {palavra.map((p, index) => exibirLetras(index))}
                    </div>

                    <div className="letra-vermelha escondido">
                        {palavra}
                    </div>
                    <div className="letra-verde escondido">
                        {palavra}
                    </div>
                </div>

            </div>

            <div className="area-alfabeto">
                {alfabeto.map((a) => exibeLetraAlfabeto(a))}

            </div>
            <div className="area-input">
                <div>J?? sei a palavra!</div>
                <div><input disabled={desabilitaAlfabeto} type="text" value={chute} onChange={(e) => setChute(e.target.value)} data-identifier="type-guess" /></div>
                <div><button className="btn-chutar" disabled={desabilitaAlfabeto} onClick={chutarPalavra} data-identifier="guess-button">Chutar</button></div>

            </div>


        </div>
    )


}