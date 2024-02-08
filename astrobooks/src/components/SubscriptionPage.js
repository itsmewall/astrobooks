import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from './firebase'; // Certifique-se de que este é o caminho correto para seu arquivo de configuração do Firebase
import { doc, setDoc } from 'firebase/firestore';
import { AuthContext } from './AuthContext'; // Caminho para o seu contexto de autenticação
import '../styles/SubscriptionPage.css';

const SubscriptionPage = () => {
  const [coupon, setCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext); // Usando o contexto para acessar o usuário atual

  const validateCoupon = () => {
    const validCoupons = ['ASTROBOOKS', 'MANGO']; // Cupons válidos como exemplo

    if (validCoupons.includes(coupon.toUpperCase())) {
      setCouponMessage('Cupom válido! Acesso liberado.');
      // Assumindo que o usuário está logado, atualizamos o status da assinatura
      if (currentUser) {
        updateSubscriptionStatus(currentUser.uid, true);
      } else {
        console.error("Usuário não está logado.");
      }
    } else {
      setCouponMessage('Cupom inválido. Por favor, tente novamente.');
    }
  };

  const handleSubscription = async (plan) => {
    // Simulando o processo de assinatura bem-sucedido
    if (currentUser) {
      updateSubscriptionStatus(currentUser.uid, true);
    } else {
      console.error("Usuário não está logado.");
    }
  };

  // Atualiza o status da assinatura no Firestore
  const updateSubscriptionStatus = async (userId, status) => {
    try {
      await setDoc(doc(firestore, "users", userId), { assinaturaAtiva: status }, { merge: true });
      console.log("Status da assinatura atualizado com sucesso no Firestore.");
      navigate('/'); // Redireciona para a página inicial se a atualização for bem-sucedida
    } catch (error) {
      console.error("Erro ao atualizar o status da assinatura:", error);
    }
  };

  return (
    <>
      <div className="subscription-container">
        <h1 className="subscription-title">Assine Agora</h1>
        <p className="subscription-description">Desbloqueie acesso ilimitado a conteúdo premium com nossos planos de assinatura.</p>
        
        <div className="plans-container">
          <div className="plan" onClick={() => handleSubscription('basic')}>
            <h2>Plano Básico</h2>
            <ul>
              <li>Acesso a artigos selecionados</li>
              <li>Suporte via e-mail</li>
            </ul>
            <button className="btn">Assinar por R$4,99/mês</button>
          </div>

          <div className="plan premium" onClick={() => handleSubscription('premium')}>
            <h2>Plano Premium</h2>
            <ul>
              <li>Acesso ilimitado a todos os artigos</li>
              <li>Suporte prioritário via e-mail</li>
              <li>Acesso a vídeos exclusivos</li>
            </ul>
            <button className="btn">Assinar por R$9,99/mês</button>
          </div>
        </div>
      </div>

      <div className="coupon-container">
          <input
              type="text"
              placeholder="Insira seu cupom aqui"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="coupon-input"
          />
          <button onClick={validateCoupon} className="btn coupon-btn">Validar Cupom</button>
          {couponMessage && <p className="coupon-message">{couponMessage}</p>}
      </div>
    </>
  );
};

export default SubscriptionPage;
