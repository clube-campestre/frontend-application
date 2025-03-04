import React from "react";
import Header from "../Header/Header";
import '../Section/Section1.css';

const Section1 = () => {
    return (
        
        <div className="section1-container">
            <Header className="header-section1" />
            <div className='text-section1'>
                <h2>
                Ser <strong>Desbravador Campestre</strong> é mais que um título, é um chamado para servir, amar e transformar!
                </h2>
            </div>
        <div className="container-info">
            <div className="container">
            <div className="align-img-text">
            <img src="https://cdn-icons-png.flaticon.com/512/5046/5046859.png" alt="" />
            <h4>QUEM SOMOS</h4>  </div>
            <span className="container-text">O Clube de Desbravadores 
            promove crescimento físico, mental e espiritual por meio de atividades práticas, desafios ao ar livre e aprendizado em equipe.</span>
            
     
            </div>
            <div className="container">
            <div className="align-img-text">
            <img src="https://cdn-icons-png.flaticon.com/512/1208/1208170.png" alt="" />
            <h4>MISSÃO</h4></div>
            <span className="container-text">Inspirar e capacitar jovens a desenvolverem caráter, habilidades e liderança por meio de atividades educativas, recreativas e comunitárias e o compromisso com valores cristãos.</span>
            </div>
         
            <div className="container">
                <div className="align-img-text">
            <img src="https://cdn-icons-png.flaticon.com/512/4592/4592698.png" alt="" />
            <h4>VALORES</h4></div>
            <span className="container-text">Fé, liderança, disciplina, cooperação, aventura e serviço.</span>
            </div>
        </div>

        </div>
    );
}

export default Section1;
