import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';

const WhatsAppContact = ({ lead }) => {
  if (!lead || !lead.phone) return null;

  const handleWhatsAppClick = () => {
    const phoneNumber = lead.phone.replace(/\D/g, '');
    const message = `Hi ${lead.name}, I'm reaching out regarding your property interest. Let's discuss this opportunity.`;
    const encodedMessage = encodeURIComponent(message);
    
    // Standard WhatsApp URL format
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button className="whatsapp-btn" onClick={handleWhatsAppClick} title="Contact via WhatsApp">
      <FiMessageSquare size={18} />
      <span>WhatsApp</span>
    </button>
  );
};

export default WhatsAppContact;
